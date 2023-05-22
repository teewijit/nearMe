"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TblStore extends Model {
    static associate(_models) {}
  }
  TblStore.init(
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
      isVet: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      create_by: {
        type: DataTypes.INTEGER,
        references: { model: 'TblUser', key: 'id' }
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
      tableName: "tblStore",
    }
  );
  return TblStore;
};
