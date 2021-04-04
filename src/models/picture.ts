import Sequelize, { DataTypes, Model, Optional } from "sequelize";

export interface pictureAttributes {
    id: number;
    bytes?: any;
    preview?: any;
}

export type picturePk = "id";
export type pictureId = picture[picturePk];
export type pictureCreationAttributes = Optional<pictureAttributes, picturePk>;

export class picture
    extends Model<pictureAttributes, pictureCreationAttributes>
    implements pictureAttributes {
    id!: number;
    bytes?: any;
    preview?: any;

    static initModel(sequelize: Sequelize.Sequelize): typeof picture {
        picture.init(
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    primaryKey: true,
                },
                bytes: {
                    type: DataTypes.BLOB,
                    allowNull: true,
                },
                preview: {
                    type: DataTypes.BLOB,
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: "picture",
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
        return picture;
    }
}
