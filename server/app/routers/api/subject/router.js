const express = require("express");

const router = express.Router();
const {
  create,
  readAll,
  readOneById,
  update,
  destroy,
} = require("../../../controllers/subjectActions");

const validateSubjectSchema = require("../../../../middleware/validateSubjectSchema");

router.post("/", validateSubjectSchema, create);

router.get("/", readAll);

router.get("/:id", readOneById);

router.put("/:id", update);

router.delete("/:id", destroy);

module.exports = router;
