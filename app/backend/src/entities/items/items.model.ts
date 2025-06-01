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

interface ItemModelCreate extends Omit<ItemsModel, keyof Model | 'id' | 'content' | 'comments'> {
  content?: string;
}

@Table({ tableName: 'items' })
export class ItemsModel extends Model<ItemsModel, ItemModelCreate> {
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

  @Column(DataType.STRING)
  declare time_ago: string;

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

  @HasMany(() => ItemsModel, { as: 'comments', foreignKey: 'parent_id' })
  declare comments: Array<InferAttributes<ItemsModel>>;

  @Default(0)
  @Column(DataType.INTEGER)
  declare comments_count: number;

  @Column(DataType.STRING)
  declare url?: string;

  @Column(DataType.STRING)
  declare domain?: string;

  @ForeignKey(() => ItemsModel)
  @Column(DataType.INTEGER)
  declare parent_id?: number;

  @BelongsTo(() => ItemsModel, { as: 'parent', foreignKey: 'parent_id' })
  declare parent?: ItemsModel;

  toJSON() {
    const attributes = { ...this.get(), level: undefined };

    if (!attributes.url?.length) {
      delete attributes.url;
    }

    if (!attributes.domain?.length) {
      delete attributes.domain;
    }

    if (attributes.parent_id === null) {
      delete attributes.parent_id;
    }

    if (attributes.type === 'link') {
      delete attributes.deleted;
      delete attributes.dead;
    }

    if (attributes.type === 'comment') {
      delete attributes.title;
      delete attributes.points;
      delete attributes.parent_id;

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
      time_ago: attributes.time_ago,
      type: attributes.type,
      content: attributes.content,
      deleted: attributes.deleted,
      dead: attributes.dead,
      comments: attributes.comments,
      comments_count: attributes.comments_count,
      level: attributes.level,
      url: attributes.url,
      domain: attributes.domain,
      parent_id: attributes.parent_id,
    };
  }
}
