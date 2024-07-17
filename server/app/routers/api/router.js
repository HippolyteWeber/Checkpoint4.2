const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */
const userRouter = require("./user/router");

router.use("/user", userRouter);

/* ************************************************************************* */
// Import Subject Router
/* ************************************************************************* */
const subjectRouter = require("./subject/router");

router.use("/subject", subjectRouter);

/* ************************************************************************* */
// Import Auth Router
/* ************************************************************************* */
const authRouter = require("./auth/router");

router.use("/auth", authRouter);

module.exports = router;
