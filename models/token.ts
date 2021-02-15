import Sequelize, { DataTypes, Model, Optional } from 'sequelize';

export interface tokenAttributes {
  series: string;
  last_used_date?: string;
  token_value?: string;
  username?: string;
}

export type tokenPk = "series";
export type tokenId = token[tokenPk];
export type tokenCreationAttributes = Optional<tokenAttributes, tokenPk>;

export class token extends Model<tokenAttributes, tokenCreationAttributes> implements tokenAttributes {
  series!: string;
  last_used_date?: string;
  token_value?: string;
  username?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof token {
    token.init({
    series: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    last_used_date: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    token_value: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'token',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "series" },
        ]
      },
    ]
  });
  return token;
  }
}
