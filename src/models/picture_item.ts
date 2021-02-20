import Sequelize, { DataTypes, Model, Optional } from 'sequelize';

export interface picture_itemAttributes {
  id: number;
  picture_collection_id?: number;
  picture_id?: number;
}

export type picture_itemPk = "id";
export type picture_itemId = picture_item[picture_itemPk];
export type picture_itemCreationAttributes = Optional<picture_itemAttributes, picture_itemPk>;

export class picture_item extends Model<picture_itemAttributes, picture_itemCreationAttributes> implements picture_itemAttributes {
  id!: number;
  picture_collection_id?: number;
  picture_id?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof picture_item {
    picture_item.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    picture_collection_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    picture_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'picture_item',
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
  return picture_item;
  }
}
