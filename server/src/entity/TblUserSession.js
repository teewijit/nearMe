'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class TbUserSession extends Model {
    static associate(_models) {}
  }
  TbUserSession.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      ac_uid: {
        type: DataTypes.TEXT
      },
      rf_uid: {
        type: DataTypes.TEXT
      },
      update_date: {
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      timestamps: false,
      tableName: 'tb_user_session'
    }
  )
  return TbUserSession
}
