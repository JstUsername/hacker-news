import { timestampToAgo } from './dates';
import { faker } from '@faker-js/faker';
import { ItemsModel } from '~/entities/items';

interface GenerateNews {
  timestamp: number;
  commentsCount: number;
  url: string;
}

interface GenerateComment {
  commentTime: number;
  commentRepliesCount: number;
  parentId: number;
}

interface GenerateReplies {
  parentComment: ItemsModel;
  commentRepliesCount: number;
  level: number;
  maxLevel: number;
  baseTime: number;
}

const MAX_COMMENT_REPLIES = parseInt(process.env.MAX_COMMENT_REPLIES || '5');

export const generateNews = async ({ timestamp, commentsCount, url }: GenerateNews) => {
  return await ItemsModel.create({
    title: faker.hacker.phrase().replace('!', ''),
    points: faker.number.int({ min: 1, max: 100 }),
    user: faker.internet.username(),
    time: timestamp,
    time_ago: timestampToAgo(timestamp),
    type: 'link',
    comments_count: commentsCount,
    url,
    domain: new URL(url).hostname,
  });
};

export const generateComment = async ({ commentTime, commentRepliesCount, parentId }: GenerateComment) => {
  const commentTimestamp = Math.floor(commentTime / 1000);

  return await ItemsModel.create({
    user: faker.internet.username(),
    time: commentTimestamp,
    time_ago: timestampToAgo(commentTimestamp),
    type: 'comment',
    content: `<p>${faker.lorem.paragraphs({ min: 1, max: 3 }, '</p><p>')}</p>`,
    comments_count: commentRepliesCount,
    parent_id: parentId,
  });
};

export const generateReplies = async ({
  parentComment,
  commentRepliesCount,
  level,
  maxLevel,
  baseTime,
}: GenerateReplies) => {
  if (level >= maxLevel) return;

  for (let i = 0; i < commentRepliesCount; i++) {
    const replyTime = faker.date.between({ from: baseTime, to: new Date() }).getTime();
    const commentRepliesCount = faker.number.int({ min: 0, max: MAX_COMMENT_REPLIES });

    const reply = await generateComment({
      commentTime: replyTime,
      commentRepliesCount: 0,
      parentId: parentComment.id,
    });

    reply.url = `item?id=${reply.id}`;
    await reply.save();
    await generateReplies({
      parentComment: reply,
      commentRepliesCount,
      level: level + 1,
      maxLevel,
      baseTime: replyTime,
    });
  }
};
