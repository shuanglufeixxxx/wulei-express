import Sequelize, { DataTypes, Model, Optional } from 'sequelize';

export interface ip_loggingAttributes {
  id: number;
  visit_date?: string;
  ip: string;
  path?: string;
}

export type ip_loggingPk = "id";
export type ip_loggingId = ip_logging[ip_loggingPk];
export type ip_loggingCreationAttributes = Optional<ip_loggingAttributes, ip_loggingPk>;

export class ip_logging extends Model<ip_loggingAttributes, ip_loggingCreationAttributes> implements ip_loggingAttributes {
  id!: number;
  visit_date?: string;
  ip!: string;
  path?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof ip_logging {
    ip_logging.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    visit_date: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ip: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    path: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ip_logging',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return ip_logging;
  }
}
