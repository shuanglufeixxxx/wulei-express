import Sequelize, { DataTypes, Model, Optional } from "sequelize";

export interface post_likeAttributes {
    id: number;
    account_id?: number;
    create_date?: string;
    post_id?: number;
}

export type post_likePk = "id";
export type post_likeId = post_like[post_likePk];
export type post_likeCreationAttributes = Optional<
    post_likeAttributes,
    post_likePk
>;

export class post_like
    extends Model<post_likeAttributes, post_likeCreationAttributes>
    implements post_likeAttributes {
    id!: number;
    account_id?: number;
    create_date?: string;
    post_id?: number;

    static initModel(sequelize: Sequelize.Sequelize): typeof post_like {
        post_like.init(
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    primaryKey: true,
                },
                account_id: {
                    type: DataTypes.BIGINT,
                    allowNull: true,
                },
                create_date: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                post_id: {
                    type: DataTypes.BIGINT,
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: "post_like",
                timestamps: false,
                indexes: [
                    {
                        name: "PRIMARY",
                        unique: true,
                        using: "BTREE",
                        fields: [{ name: "id" }],
                    },
                    {
                        name: "post_like_unique_post_id_account_id_ZN",
                        unique: true,
                        using: "BTREE",
                        fields: [{ name: "post_id" }, { name: "account_id" }],
                    },
                ],
            }
        );
        return post_like;
    }
}
