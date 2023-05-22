"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TblAppointment extends Model {
    static associate(_models) {}
  }
  TblAppointment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      store_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      animal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      tel: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      action: {
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
      tableName: "tblAppointment",
    }
  );
  return TblAppointment;
};
