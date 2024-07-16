const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {
  create,
  readAll,
  readOneById,
  update,
  destroy,
} = require("../../../controllers/userActions");

// Route to add a new user
router.post("/", create);
// Route to get a list of users
router.get("/", readAll);
// Route to get a specific user by ID
router.get("/:id", readOneById);
// Route to update a specific user by ID
router.put("/:id", update);
// Route to delete a specific user by ID
router.delete("/:id", destroy);
/* ************************************************************************* */

module.exports = router;
