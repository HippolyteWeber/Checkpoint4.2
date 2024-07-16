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
  uploadProfilPicture,
} = require("../../../controllers/userActions");

const validateUserSchema = require("../../../../middleware/validateUserSchema");
const hashPassword = require("../../../services/hashpassword");
const uploadPicture = require("../../../../middleware/uploadPicture");

// Route to add a new user
router.post("/", validateUserSchema, hashPassword, create);
// Route to get a list of users
router.get("/", readAll);
// Route to get a specific user by ID
router.get("/:id", readOneById);
// Route to update a specific user by ID
router.put("/:id", validateUserSchema, hashPassword, update);
// Route to delete a specific user by ID
router.delete("/:id", destroy);
// Route to upload a picture from the user profile
router.post("/upload", uploadPicture, uploadProfilPicture);
/* ************************************************************************* */

module.exports = router;
