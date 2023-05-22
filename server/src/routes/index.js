const express = require("express");
const router = express.Router();

const AuthMiddleware = require("../middleware/AuthMiddleware");
const AuthValidator = require("../validator/AuthValidator");

const AuthController = require("../controllers/AuthController");
const UserController = require("../controllers/UserController");

const UserRoutes = require("./UserRoutes");
const StoreRoutes = require("./StoreRoutes");
const RoleRoutes = require("./RoleRoutes");
const RatingRoutes = require("./RatingRoutes");
const CommentRoutes = require("./CommentRoutes");
const TypeRoutes = require("./TypeRoutes");
const AnimalRoutes = require("./AnimalRoutes")
const AppointmentRoutes = require("./AppointmentRoutes")

router.get(
  "/user/profile",
  AuthMiddleware.checkAuth,
  UserController.getProfile
);

router.use("/animal", AuthMiddleware.checkAuth, AnimalRoutes);
router.use("/type", AuthMiddleware.checkAuth, TypeRoutes);
router.use("/user", AuthMiddleware.checkAuth, UserRoutes);
router.use("/store", AuthMiddleware.checkAuth, StoreRoutes);
router.use("/role", AuthMiddleware.checkAuth, RoleRoutes);
router.use("/rating", AuthMiddleware.checkAuth, RatingRoutes);
router.use("/comment", AuthMiddleware.checkAuth, CommentRoutes);
router.use("/app", AuthMiddleware.checkAuth, AppointmentRoutes);

router.post("/register", UserController.Create);
router.post("/auth/sing-in", AuthValidator.SignIn, AuthController.singIn);
router.post("/auth/sing-out", AuthMiddleware.checkAuth, AuthController.singOut);

module.exports = router;
