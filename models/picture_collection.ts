import Sequelize, { DataTypes, Model, Optional } from 'sequelize';

export interface picture_collectionAttributes {
  id: number;
}

export type picture_collectionPk = "id";
export type picture_collectionId = picture_collection[picture_collectionPk];
export type picture_collectionCreationAttributes = Optional<picture_collectionAttributes, picture_collectionPk>;

export class picture_collection extends Model<picture_collectionAttributes, picture_collectionCreationAttributes> implements picture_collectionAttributes {
  id!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof picture_collection {
    picture_collection.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'picture_collection',
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
  return picture_collection;
  }
}
