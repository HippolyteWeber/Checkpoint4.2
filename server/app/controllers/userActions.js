// Import access to database tables

const tables = require("../../database/tables");

const create = async (req, res, next) => {
  const user = req.body;

  try {
    const insertId = await tables.user.create(user);

    res.status(201).json({ insertId, message: "Bienvenue sur le site" });
  } catch (err) {
    next(err);
  }
};

const readAll = async (req, res, next) => {
  try {
    const user = await tables.user.readAll();

    res.json(user);
  } catch (err) {
    next(err);
  }
};

const readOneById = async (req, res, next) => {
  try {
    const user = await tables.user.readOneById(req.params.id);
    if (user == null) {
      res.sendStatus(404);
      return;
    }

    const profilePicturePath = `uploads/profileImage-${req.params.id}.jpg`;

    res.json({
      ...user,
      profile_picture: profilePicturePath,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const user = req.body;

  try {
    const updated = await tables.user.update(req.params.id, user);
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
    const destroyed = await tables.user.destroy(req.params.id);

    if (destroyed) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
};
// const getProfilePicture = (req, res, next) => {
//   const { userId } = req.params;

//   const profilePicturePath = `uploads/profileImage-${userId}.jpg`;

//   const fullPath = path.resolve(profilePicturePath);
//   if (!fullPath) {
//     return res.status(404).send("Profile picture not found");
//   }

//   // Send the file to the client
//   res.sendFile(fullPath);
// };
const uploadProfilPicture = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send("Aucun fichier n'a été téléchargé.");
    }

    const { userId } = req.body;
    const profilPicture = req.file.path;

    const updated = await tables.user.updateProfilePicture(
      userId,
      profilPicture
    );

    if (updated) {
      return res.status(200).json({
        message: "Votre photo de profil a été mise à jour avec succès.",
        profilPicture,
      });
    }

    return res.status(404).send("l'utilisateur n'existe pas");
  } catch (err) {
    next(err);
    return res.status(500).send("erreur serveur");
  }
};

module.exports = {
  create,
  readAll,
  readOneById,
  update,
  destroy,
  uploadProfilPicture,
};
