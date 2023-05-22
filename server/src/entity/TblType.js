"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TblType extends Model {
    static associate(_models) {}
  }
  TblType.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      create_by: {
        type: DataTypes.INTEGER,
      },
      create_date: {
        type: DataTypes.DATE,
      },
      update_by: {
        type: DataTypes.INTEGER,
      },
      update_date: {
        type: DataTypes.DATE,
      },
      delete_by: {
        type: DataTypes.INTEGER,
      },
      delete_date: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "tblType",
    }
  );
  return TblType;
};
