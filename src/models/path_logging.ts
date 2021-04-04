import Sequelize, { DataTypes, Model, Optional } from "sequelize";

export interface path_loggingAttributes {
    id: number;
    path: string;
    date: string;
    count?: number;
}

export type path_loggingPk = "id";
export type path_loggingId = path_logging[path_loggingPk];
export type path_loggingCreationAttributes = Optional<
    path_loggingAttributes,
    path_loggingPk
>;

export class path_logging
    extends Model<path_loggingAttributes, path_loggingCreationAttributes>
    implements path_loggingAttributes {
    id!: number;
    path!: string;
    date!: string;
    count?: number;

    static initModel(sequelize: Sequelize.Sequelize): typeof path_logging {
        path_logging.init(
            {
                id: {
                    autoIncrement: true,
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    primaryKey: true,
                },
                path: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                date: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                count: {
                    type: DataTypes.BIGINT,
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: "path_logging",
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
        return path_logging;
    }
}
