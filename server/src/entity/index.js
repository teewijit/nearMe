"use strict";

const config = require("../../config/sequelizeConfig");
const { logger } = require("../utils");
const Sequelize = require("sequelize");
const TblUser = require("./TblUser");
const TblUserSession = require("./TblUserSession");
const TblComment = require("./TblComment");
const TblRating = require("./TblRating");
const TblRole = require("./TblRole");
const TblStore = require("./TblStore");
const TblAnimal = require("./TblAnimal")
const TblAnimalOwner = require("./TblAnimalOwner")
const TblType = require('./TblType')
const TblAppointment = require('./TblAppointment')

const ViewStore = require("./ViewStore");
const ViewUser = require("./ViewUser");
const ViewVetCard = require("./ViewVetCard")
const ViewAppointment = require("./ViewAppointment")

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

sequelize
  .authenticate()
  .then(() => {
    logger.info(`Successful, connect to database ${config.host}`);
  })
  .catch(() => {
    logger.error(`Failed, connect to database ${config.host}`);
    process.exit();
  });

const entity = {
  TblUser: TblUser(sequelize, Sequelize.DataTypes),
  TblUserSession: TblUserSession(sequelize, Sequelize.DataTypes),
  TblComment: TblComment(sequelize, Sequelize.DataTypes),
  TblRating: TblRating(sequelize, Sequelize.DataTypes),
  TblRole: TblRole(sequelize, Sequelize.DataTypes),
  TblAnimalOwner: TblAnimalOwner(sequelize, Sequelize.DataTypes),
  TblStore: TblStore(sequelize, Sequelize.DataTypes),
  TblAnimal: TblAnimal(sequelize, Sequelize.DataTypes),
  TblType: TblType(sequelize, Sequelize.DataTypes),
  TblAppointment: TblAppointment(sequelize, Sequelize.DataTypes),

  ViewStore: ViewStore(sequelize, Sequelize.DataTypes),
  ViewUser: ViewUser(sequelize, Sequelize.DataTypes),
  ViewVetCard: ViewVetCard(sequelize, Sequelize.DataTypes),
  ViewAppointment: ViewAppointment(sequelize, Sequelize.DataTypes),
  sequelize: sequelize,
  Sequelize: Sequelize,
};

module.exports = entity;
