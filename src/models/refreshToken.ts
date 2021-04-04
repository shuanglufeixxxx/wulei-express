import Sequelize, { DataTypes, Model, Optional } from "sequelize";

export interface refreshTokenAttributes {
    id: number;
    create_time?: string;
    last_used_time?: string;
    refreshToken_value: string;
    username?: string;
}

export type refreshTokenPk = "id";
export type refreshTokenId = refreshToken[refreshTokenPk];
export type refreshTokenCreationAttributes = Optional<
    refreshTokenAttributes,
    refreshTokenPk
>;

export class refreshToken
    extends Model<refreshTokenAttributes, refreshTokenCreationAttributes>
    implements refreshTokenAttributes {
    id!: number;
    create_time?: string;
    last_used_time?: string;
    refreshToken_value!: string;
    username?: string;

    static initModel(sequelize: Sequelize.Sequelize): typeof refreshToken {
        refreshToken.init(
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    primaryKey: true,
                },
                create_time: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                last_used_time: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                refreshToken_value: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                username: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: "refreshToken",
                timestamps: false,
                indexes: [
                    {
                        name: "PRIMARY",
                        unique: true,
                        using: "BTREE",
                        fields: [{ name: "id" }],
                    },
                ],
            }
        );
        return refreshToken;
    }
}
