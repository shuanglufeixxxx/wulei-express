import Sequelize, { DataTypes, Model, Optional } from "sequelize";

export interface featured_pictureAttributes {
    id: number;
    picture_id?: number;
    place?: string;
}

export type featured_picturePk = "id";
export type featured_pictureId = featured_picture[featured_picturePk];
export type featured_pictureCreationAttributes = Optional<
    featured_pictureAttributes,
    featured_picturePk
>;

export class featured_picture
    extends Model<
        featured_pictureAttributes,
        featured_pictureCreationAttributes
    >
    implements featured_pictureAttributes {
    id!: number;
    picture_id?: number;
    place?: string;

    static initModel(sequelize: Sequelize.Sequelize): typeof featured_picture {
        featured_picture.init(
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    primaryKey: true,
                },
                picture_id: {
                    type: DataTypes.BIGINT,
                    allowNull: true,
                },
                place: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: "featured_picture",
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
        return featured_picture;
    }
}
