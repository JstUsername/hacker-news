import { ItemsModel } from './items.model';
import { InferAttributes } from 'sequelize';
import { NotFoundError } from '~/const';

export const getNewestNews = async () => {
  return ItemsModel.findAll({ where: { type: 'link' }, order: [['time', 'DESC']] });
};

const loadCommentsTree = async (parentId: number, level = 0): Promise<Array<InferAttributes<ItemsModel>>> => {
  const comments = await ItemsModel.findAll({
    where: { parent_id: parentId },
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
      const children = await loadCommentsTree(plainComment.id, level + 1);
      return { ...plainComment, level, comments: children };
    }),
  );
};

export const getItemById = async (id: number) => {
  const item = await ItemsModel.findOne({ where: { id } });
  if (!item) throw new NotFoundError('No item with the given ID could be found');
  item.setDataValue('comments', await loadCommentsTree(item.id));
  return item;
};
