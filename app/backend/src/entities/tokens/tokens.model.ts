import { AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { UsersModel } from '~/entities/users';

export interface TokensModelCreate extends Omit<TokensModel, keyof Model | 'id'> {}

@Table({ tableName: 'tokens', paranoid: false })
export class TokensModel extends Model<TokensModel, TokensModelCreate> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare sessionId: string;

  @ForeignKey(() => UsersModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare refreshToken: string;

  @Column({ type: DataType.DATE, allowNull: false })
  declare expiresAt: Date;
}
