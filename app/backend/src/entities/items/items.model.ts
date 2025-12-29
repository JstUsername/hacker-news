import { InferAttributes } from 'sequelize';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { timestampToAgo } from '~/utils';

interface ItemsModelCreate extends Omit<ItemsModel, keyof Model | 'id' | 'timeAgo' | 'content' | 'comments'> {
  content?: string;
}

@Table({ tableName: 'items' })
export class ItemsModel extends Model<ItemsModel, ItemsModelCreate> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.STRING)
  declare title?: string;

  @Default(0)
  @Column(DataType.INTEGER)
  declare points?: number | null;

  @Column(DataType.STRING)
  declare user?: string | null;

  @Column(DataType.INTEGER)
  declare time: number;

  @Column({
    type: DataType.VIRTUAL,
    get(this: ItemsModel): string {
      const time = this.getDataValue('time');
      return timestampToAgo(time);
    },
  })
  declare timeAgo: string;

  @Column(DataType.STRING)
  declare type: 'link' | 'comment';

  @Default('')
  @Column(DataType.TEXT)
  declare content: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  declare deleted?: boolean;

  @Default(false)
  @Column(DataType.BOOLEAN)
  declare dead?: boolean;

  @HasMany(() => ItemsModel, { as: 'comments', foreignKey: 'parentId' })
  declare comments: Array<InferAttributes<ItemsModel>>;

  @Default(0)
  @Column(DataType.INTEGER)
  declare commentsCount: number;

  @Column(DataType.STRING)
  declare url?: string;

  @Column(DataType.STRING)
  declare domain?: string;

  @ForeignKey(() => ItemsModel)
  @Column(DataType.INTEGER)
  declare parentId?: number;

  @BelongsTo(() => ItemsModel, { as: 'parent', foreignKey: 'parentId' })
  declare parent?: ItemsModel;

  toJSON() {
    const attributes = { ...this.get(), level: undefined };

    if (!attributes.url?.length) {
      delete attributes.url;
    }

    if (!attributes.domain?.length) {
      delete attributes.domain;
    }

    if (attributes.parentId === null) {
      delete attributes.parentId;
    }

    if (attributes.type === 'link') {
      delete attributes.deleted;
      delete attributes.dead;
    }

    if (attributes.type === 'comment') {
      delete attributes.title;
      delete attributes.points;
      delete attributes.parentId;

      if (!attributes.deleted) {
        delete attributes.deleted;
      }

      if (!attributes.dead) {
        delete attributes.dead;
      }
    }

    if (!attributes.level) delete attributes.level;
    delete attributes.createdAt;
    delete attributes.updatedAt;

    return {
      id: attributes.id,
      title: attributes.title,
      points: attributes.points,
      user: attributes.user,
      time: attributes.time,
      timeAgo: attributes.timeAgo,
      type: attributes.type,
      content: attributes.content,
      deleted: attributes.deleted,
      dead: attributes.dead,
      comments: attributes.comments,
      commentsCount: attributes.commentsCount,
      level: attributes.level,
      url: attributes.url,
      domain: attributes.domain,
      parentId: attributes.parentId,
    };
  }
}
