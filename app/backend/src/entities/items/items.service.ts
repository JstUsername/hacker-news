import { MAX_COMMENT_LEVEL, MAX_COMMENT_PER_NEWS, MAX_COMMENT_REPLIES, NEWS_COUNT } from './items.const';
import { ItemsModel } from './items.model';
import { GenerateComment, GenerateNews, GenerateReplies } from './items.types';
import { faker } from '@faker-js/faker';
import { styleText } from 'node:util';
import { InferAttributes } from 'sequelize';
import { ForbiddenError, NotFoundError } from '~/constants';
import { COOKIE_NAME } from '~/entities/auth/auth.const';
import { AuthService } from '~/entities/auth/auth.service';
import { TOKEN_TYPES } from '~/entities/tokens';

const authService = new AuthService();

export class ItemsService {
  async getNewestNews() {
    return ItemsModel.findAll({ where: { type: 'link', deleted: false }, order: [['time', 'DESC']] });
  }

  async loadCommentsTree(parentId: number, level = 0): Promise<Array<InferAttributes<ItemsModel>>> {
    const comments = await ItemsModel.findAll({
      where: { parentId },
      order: [['time', 'DESC']],
      include: [
        {
          model: ItemsModel,
          as: 'comments',
        },
      ],
    });

    return await Promise.all(
      comments.map(async (comment) => {
        const plainComment = comment.get({ plain: true });
        const children = await this.loadCommentsTree(plainComment.id, level + 1);
        return { ...plainComment, level, comments: children };
      }),
    );
  }

  async getItemById(id: number) {
    const item = await ItemsModel.findOne({ where: { id, deleted: false } });
    if (!item) throw new NotFoundError('No item with the given ID could be found');
    item.setDataValue('comments', await this.loadCommentsTree(item.id));
    return item;
  }

  async generateItems({ force }: { force?: boolean } = {}) {
    try {
      if (!force) {
        try {
          if ((await ItemsModel.count()) > 0) {
            console.info(styleText('yellow', 'The database already contains data. Skipping seeding.'));
            return;
          }
        } catch (err) {
          console.info(styleText('yellow', 'No data was found in the database. Starting seeding.'));
        }
      }

      await ItemsModel.destroy({ truncate: true, cascade: true });

      for (let i = 0; i < NEWS_COUNT; i++) {
        const newsTime = faker.date.recent({ days: 7 }).getTime();
        const timestamp = Math.floor(newsTime / 1000);
        const url = faker.internet.url();
        const commentsCount = faker.number.int({ min: 0, max: MAX_COMMENT_PER_NEWS });
        const news = await this.generateNews({ timestamp, commentsCount, url });

        for (let i = 0; i < commentsCount; i++) {
          const commentRepliesCount = faker.number.int({ min: 0, max: MAX_COMMENT_REPLIES });
          const commentTime = faker.date.between({ from: newsTime, to: new Date() }).getTime();
          const comment = await this.generateComment({ commentTime, commentRepliesCount, parentId: news.id });
          comment.url = `item?id=${comment.id}`;
          await comment.save();

          await this.generateReplies({
            parentComment: comment,
            commentRepliesCount,
            level: 1,
            maxLevel: MAX_COMMENT_LEVEL,
            baseTime: commentTime,
            maxCommentsReplies: MAX_COMMENT_REPLIES,
          });
        }
      }

      console.info(styleText('green', 'The database has been successfully filled with test data.'));
    } catch (err) {
      console.error(styleText('red', 'Error when filling the database with test data.'), err);
    }
  }

  async addComment({
    parentId,
    content,
    cookies,
  }: {
    parentId: number;
    content: string;
    cookies: Record<string, string>;
  }) {
    const parentItem = await ItemsModel.findByPk(parentId);
    if (!parentItem) throw new NotFoundError('No item with the given ID could be found');
    const { [COOKIE_NAME[TOKEN_TYPES.Access]]: accessToken } = cookies;
    const { username } = authService.validateAccessToken(accessToken);
    const commentTime = Date.now();
    const commentTimestamp = Math.floor(commentTime / 1000);

    const comment = await ItemsModel.create({
      user: username,
      time: commentTimestamp,
      type: 'comment',
      content,
      commentsCount: 0,
      parentId: parentItem.id,
    });

    comment.url = `item?id=${comment.id}`;
    await comment.save();
    parentItem.commentsCount += 1;
    await parentItem.save();
    return comment;
  }

  async deleteComment({ id, cookies }: { id: number; cookies: Record<string, string> }) {
    const comment = await ItemsModel.findByPk(id);

    if (!comment || comment.type !== 'comment' || comment.deleted) {
      throw new NotFoundError('No comment with the given ID could be found');
    }

    const { [COOKIE_NAME[TOKEN_TYPES.Access]]: accessToken } = cookies;
    const { username } = authService.validateAccessToken(accessToken);

    if (comment.user !== username) {
      throw new ForbiddenError('You do not have permission to delete this comment');
    }

    comment.deleted = true;
    await comment.save();

    if (comment.parentId) {
      const parentItem = await ItemsModel.findByPk(comment.parentId);

      if (parentItem && parentItem.commentsCount > 0) {
        parentItem.commentsCount -= 1;
        await parentItem.save();
      }
    }
  }

  private async generateNews({ timestamp, commentsCount, url }: GenerateNews) {
    return await ItemsModel.create({
      title: faker.hacker.phrase().replace('!', ''),
      points: faker.number.int({ min: 1, max: 100 }),
      user: faker.internet.username(),
      time: timestamp,
      type: 'link',
      commentsCount: commentsCount,
      url,
      domain: new URL(url).hostname,
    });
  }

  private async generateComment({ commentTime, commentRepliesCount, parentId }: GenerateComment) {
    const commentTimestamp = Math.floor(commentTime / 1000);

    return await ItemsModel.create({
      user: faker.internet.username(),
      time: commentTimestamp,
      type: 'comment',
      content: faker.lorem.paragraphs({ min: 1, max: 3 }),
      commentsCount: commentRepliesCount,
      parentId: parentId,
    });
  }

  private async generateReplies({
    parentComment,
    commentRepliesCount,
    level,
    maxLevel,
    baseTime,
    maxCommentsReplies,
  }: GenerateReplies) {
    if (level >= maxLevel) return;

    for (let i = 0; i < commentRepliesCount; i++) {
      const replyTime = faker.date.between({ from: baseTime, to: new Date() }).getTime();
      const commentRepliesCount = faker.number.int({ min: 0, max: maxCommentsReplies });

      const reply = await this.generateComment({
        commentTime: replyTime,
        commentRepliesCount: 0,
        parentId: parentComment.id,
      });

      reply.url = `item?id=${reply.id}`;
      await reply.save();

      await this.generateReplies({
        parentComment: reply,
        commentRepliesCount,
        level: level + 1,
        maxLevel,
        baseTime: replyTime,
        maxCommentsReplies,
      });
    }
  }
}
