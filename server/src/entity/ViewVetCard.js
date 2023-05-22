"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ViewVetCard extends Model {
    static associate(_models) {}
  }
  ViewVetCard.init(
    {
      first_name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      last_name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      user_id: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      animal_id: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      Hn: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      animal_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type_id: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      animal_sex: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      remark: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      tel: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      create_by: {
        type: DataTypes.INTEGER,
        references: { model: "TblUser", key: "id" },
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
      tableName: "view_vet_card",
    }
  );
  return ViewVetCard;
};
