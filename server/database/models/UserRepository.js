const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "user" });
  }

  async create(user) {
    const { pseudo, email, password } = user;
    const [result] = await this.database.query(
      `INSERT INTO ${this.table}(pseudo, email, password) values (?, ?, ?)`,
      [pseudo, email, password]
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await this.database.query(
      `SELECT u.pseudo, u.email, u.password, r.role, u.role_id FROM ${this.table} AS u JOIN role AS r ON u.role_id = r.role_id `
    );

    return rows;
  }

  async readOneById(id) {
    const [rows] = await this.database.query(
      ` SELECT u.pseudo, u.email, u.password, r.role FROM ${this.table} AS u JOIN role AS r ON u.role_id = r.role_id WHERE u.user_id = ?`,
      [id]
    );
    return rows[0];
  }

  async update(id, user) {
    const { pseudo, email, password, roleId } = user;
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET pseudo = ?, email = ?, password = ?, role_id = ? WHERE user_id = ?`,
      [pseudo, email, password, roleId, id]
    );

    return result.affectedRows > 0;
  }

  async destroy(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE user_id = ?`,
      [id]
    );
    return result.affectedRows > 0;
  }

  async findUserByEmail(email) {
    const [result] = await this.database.query(
      `SELECT pseudo, password FROM ${this.table} WHERE email = ?`,
      [email]
    );
    return result;
  }
}

module.exports = UserRepository;
