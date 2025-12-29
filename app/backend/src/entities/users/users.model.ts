import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

export interface UsersModelCreate extends Omit<UsersModel, keyof Model | 'id'> {}

@Table({ tableName: 'users' })
export class UsersModel extends Model<UsersModel, UsersModelCreate> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare username: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;
}
