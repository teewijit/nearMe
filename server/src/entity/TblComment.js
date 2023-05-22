"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TblComment extends Model {
    static associate(_models) {}
  }
  TblComment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      storeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      commentDetail: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      ratingId: {
        type: DataTypes.INTEGER,
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
      tableName: "tblComment",
    }
  );
  return TblComment;
};
