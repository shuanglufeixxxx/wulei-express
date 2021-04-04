import Sequelize, { DataTypes, Model, Optional } from "sequelize";

export interface accountAttributes {
    id: number;
    password?: string;
    username?: string;
}

export type accountPk = "id";
export type accountId = account[accountPk];
export type accountCreationAttributes = Optional<accountAttributes, accountPk>;

export class account
    extends Model<accountAttributes, accountCreationAttributes>
    implements accountAttributes {
    id!: number;
    password?: string;
    username?: string;

    static initModel(sequelize: Sequelize.Sequelize): typeof account {
        account.init(
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    primaryKey: true,
                },
                password: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                username: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                    unique: "UK_gex1lmaqpg0ir5g1f5eftyaa1",
                },
            },
            {
                sequelize,
                tableName: "account",
                timestamps: false,
                indexes: [
                    {
                        name: "PRIMARY",
                        unique: true,
                        using: "BTREE",
                        fields: [{ name: "id" }],
                    },
                    {
                        name: "UK_gex1lmaqpg0ir5g1f5eftyaa1",
                        unique: true,
                        using: "BTREE",
                        fields: [{ name: "username" }],
                    },
                ],
            }
        );
        return account;
    }
}
