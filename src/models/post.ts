import Sequelize, { DataTypes, Model, Optional } from "sequelize";

export interface postAttributes {
    id: number;
    classify?: string;
    create_date?: string;
    essay?: string;
    picture_collection_id?: number;
    playbill_id?: number;
    preview_picture_collection_id?: number;
    preview_style?: string;
    title?: string;
}

export type postPk = "id";
export type postId = post[postPk];
export type postCreationAttributes = Optional<postAttributes, postPk>;

export class post
    extends Model<postAttributes, postCreationAttributes>
    implements postAttributes {
    id!: number;
    classify?: string;
    create_date?: string;
    essay?: string;
    picture_collection_id?: number;
    playbill_id?: number;
    preview_picture_collection_id?: number;
    preview_style?: string;
    title?: string;

    static initModel(sequelize: Sequelize.Sequelize): typeof post {
        post.init(
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    primaryKey: true,
                },
                classify: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                create_date: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                essay: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                picture_collection_id: {
                    type: DataTypes.BIGINT,
                    allowNull: true,
                },
                playbill_id: {
                    type: DataTypes.BIGINT,
                    allowNull: true,
                },
                preview_picture_collection_id: {
                    type: DataTypes.BIGINT,
                    allowNull: true,
                },
                preview_style: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                title: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: "post",
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
        return post;
    }
}
