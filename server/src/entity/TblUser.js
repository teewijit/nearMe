"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TbUser extends Model {
    static associate(_models) {}
  }
  TbUser.init(
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
      tel: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      email: {
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
      }
    },
    {
      sequelize,
      timestamps: false,
      tableName: "tblUser",
    }
  );
  return TbUser;
};
