const express = require("express");

const router = express.Router();
const {
  login,
  logout,
  checkAuth,
} = require("../../../controllers/AuthActions");
const validateAuth = require("../../../services/validateAuth");

router.post("/login", validateAuth, login);
router.get("/checkauth", checkAuth);
router.get("/logout", logout);

module.exports = router;
