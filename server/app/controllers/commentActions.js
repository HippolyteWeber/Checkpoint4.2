// TO DO controllers for the commentActions using the same logic as the subjectActions
// REMEMBER Comment action is a table that take subject and user as foreing key
// REMEMBER to use the CommentRepository to interact with the database

const tables = require("../../database/tables");

const create = async (req, res, next) => {
  const comment = req.body;
  try {
    const insertId = await tables.comment.create(comment);
    res.status(201).json({ insertId, message: "Commentaire créé" });
  } catch (e) {
    next(e);
  }
};

const readAll = async (req, res, next) => {
  try {
    const comment = await tables.comment.readAll();
    res.json(comment);
  } catch (e) {
    next(e);
  }
};

const readOneById = async (req, res, next) => {
  try {
    const comment = await tables.comment.readOneById(req.params.id);
    if (comment == null) {
      res.sendStatus(404);
    } else {
      res.json(comment);
    }
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  const comment = req.body;
  try {
    const updated = await tables.comment.update(req.params.id, comment);
    if (updated) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
};

const destroy = async (req, res, next) => {
  try {
    const destroyed = await tables.comment.destroy(req.params.id);
    if (destroyed) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  create,
  readAll,
  readOneById,
  update,
  destroy,
};
