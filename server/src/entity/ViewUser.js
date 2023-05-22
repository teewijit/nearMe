"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ViewUser extends Model {
    static associate(_models) {}
  }
  ViewUser.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      password: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      first_name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      last_name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      brithday: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      sex: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      role_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      approve: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      create_by: {
        type: DataTypes.INTEGER,
        references: { model: "TblUser", key: "id" },
      },
      create_by_name: {
        type: DataTypes.INTEGER,
        references: { model: "TblUser", key: "id" },
      },
      create_date: {
        type: DataTypes.DATE,
      },
      update_by: {
        type: DataTypes.INTEGER,
      },
      update_by_name: {
        type: DataTypes.INTEGER,
        references: { model: "TblUser", key: "id" },
      },
      update_date: {
        type: DataTypes.DATE,
      },
      delete_by: {
        type: DataTypes.INTEGER,
      },
      delete_by_name: {
        type: DataTypes.INTEGER,
        references: { model: "TblUser", key: "id" },
      },
      delete_date: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "view_user",
    }
  );
  return ViewUser;
};
