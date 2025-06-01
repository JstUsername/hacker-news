import { faker } from '@faker-js/faker';
import { styleText } from 'node:util';
import { ItemsModel } from '~/entities/items';
import { generateComment, generateNews, generateReplies } from '~/utils';

const NEWS_COUNT = parseInt(process.env.NEWS_COUNT || '100');
const MAX_COMMENT_PER_NEWS = parseInt(process.env.MAX_COMMENT_PER_NEWS || '5');
const MAX_COMMENT_REPLIES = parseInt(process.env.MAX_COMMENT_REPLIES || '5');
const MAX_COMMENT_LEVEL = parseInt(process.env.MAX_COMMENT_LEVEL || '5');

export const seedDatabase = async ({ force }: { force?: boolean } = {}) => {
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
      const news = await generateNews({ timestamp, commentsCount, url });

      for (let i = 0; i < commentsCount; i++) {
        const commentRepliesCount = faker.number.int({ min: 0, max: MAX_COMMENT_REPLIES });
        const commentTime = faker.date.between({ from: newsTime, to: new Date() }).getTime();
        const comment = await generateComment({ commentTime, commentRepliesCount, parentId: news.id });
        comment.url = `item?id=${comment.id}`;
        await comment.save();

        await generateReplies({
          parentComment: comment,
          commentRepliesCount,
          level: 1,
          maxLevel: MAX_COMMENT_LEVEL,
          baseTime: commentTime,
        });
      }
    }

    console.info(styleText('green', 'The database has been successfully filled with test data.'));
  } catch (error) {
    console.error(styleText('red', 'Error when filling the database with test data.'), error);
  }
};
