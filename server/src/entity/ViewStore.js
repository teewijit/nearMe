"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ViewStore extends Model {
    static associate(_models) {}
  }
  ViewStore.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      storeName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      storeImg: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      storeAddress: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      storeTel: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      storeOpen: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      storeClose: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      storeDetail: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      storeLon: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      storeLat: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isVet: {
        type: DataTypes.TEXT,
        allowNull: true,
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
      tableName: "view_store",
    }
  );
  return ViewStore;
};
