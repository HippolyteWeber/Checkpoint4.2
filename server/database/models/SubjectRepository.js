const AbstractRepository = require("./AbstractRepository");

class SubjectRepository extends AbstractRepository {
  constructor() {
    super({ table: "subject" });
  }

  async create(subject) {
    const { title, description, userId } = subject;
    const [result] = await this.database.query(
      `INSERT INTO ${this.table}(title, description, user_id) values (?, ?, ?)`,
      [title, description, userId]
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await this.database.query(
      `SELECT s.title, s.description, u.pseudo, s.created_at, s.updated_at, s.subject_id FROM ${this.table} AS s JOIN user AS u ON s.user_id = u.user_id`
    );
    return rows;
  }

  async readOneById(id) {
    const [rows] = await this.database.query(
      `SELECT s.title, s.description, u.pseudo, s.created_at, s.updated_at, s.subject_id FROM ${this.table} AS s JOIN user AS u ON s.user_id = u.user_id WHERE s.subject_id = ?`,
      [id]
    );
    return rows[0];
  }

  async update(id, subject) {
    const { title, description } = subject;
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title = ?, description = ? WHERE subject_id = ?`,
      [title, description, id]
    );

    return result.affectedRows > 0;
  }

  async destroy(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE subject_id = ?`,
      [id]
    );
    return result.affectedRows > 0;
  }
}
module.exports = SubjectRepository;
