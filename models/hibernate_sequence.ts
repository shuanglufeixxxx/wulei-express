import Sequelize, { DataTypes, Model, Optional } from 'sequelize';

export interface hibernate_sequenceAttributes {
  next_val?: number;
}

export type hibernate_sequenceCreationAttributes = hibernate_sequenceAttributes;

export class hibernate_sequence extends Model<hibernate_sequenceAttributes, hibernate_sequenceCreationAttributes> implements hibernate_sequenceAttributes {
  next_val?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof hibernate_sequence {
    hibernate_sequence.init({
    next_val: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'hibernate_sequence',
    timestamps: false
  });
  return hibernate_sequence;
  }
}
