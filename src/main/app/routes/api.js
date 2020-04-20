const express = require("express");
const router = express.Router();
const checkAuthToken = require("../middlewares/checkAuthToken");
const hasRole = require("../middlewares/hasRole");
const isAuthorized = require("../middlewares/isAuthorized");
const AuthController = require("../controllers/auth");
const ReasonController = require("../controllers/reason");
const UserController = require("../controllers/user");

router.post("/auth/google", AuthController.googleAuth);
router.post("/auth/facebook", AuthController.farebookAuth);
router.get("/reasons", ReasonController.getReasons);
router.get("/reasons/:id/photos", ReasonController.getReasonPhotos);

// Authenticated routes goes here below
router.use(checkAuthToken);
router.get("/users/:id", isAuthorized, UserController.getUser);

router.post(
  "/users/:id/reasons",
  UserController.submitResonseValidators(),
  UserController.submitReasons
);

router.post("/reasons", hasRole([role.ADMIN]), ReasonController.createReason);

module.exports = {
  prefix: "/api/v1/",
  router,
};
