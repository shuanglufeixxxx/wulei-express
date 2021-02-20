import Sequelize, { DataTypes, Model, Optional } from 'sequelize';

export interface featured_postAttributes {
  id: number;
  post_id?: number;
}

export type featured_postPk = "id";
export type featured_postId = featured_post[featured_postPk];
export type featured_postCreationAttributes = Optional<featured_postAttributes, featured_postPk>;

export class featured_post extends Model<featured_postAttributes, featured_postCreationAttributes> implements featured_postAttributes {
  id!: number;
  post_id?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof featured_post {
    featured_post.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    post_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'featured_post',
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
  return featured_post;
  }
}
