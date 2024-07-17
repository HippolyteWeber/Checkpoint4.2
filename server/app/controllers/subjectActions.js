const tables = require("../../database/tables");

const create = async (req, res, next) => {
  const subject = req.body;
  try {
    const insertId = await tables.subject.create(subject);
    res.status(201).json({ insertId, message: "Sujet créé" });
  } catch (e) {
    next(e);
  }
};

const readAll = async (req, res, next) => {
  try {
    const subject = await tables.subject.readAll();
    res.json(subject);
  } catch (e) {
    next(e);
  }
};

const readOneById = async (req, res, next) => {
  try {
    const subject = await tables.subject.readOneById(req.params.id);
    if (subject == null) {
      res.sendStatus(404);
    } else {
      res.json(subject);
    }
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  const subject = req.body;
  try {
    const updated = await tables.subject.update(req.params.id, subject);
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
    const destroyed = await tables.subject.destroy(req.params.id);
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
