const AbstractRepository = require("./AbstractRepository");

class CommentRepository extends AbstractRepository {
  constructor() {
    super({ table: "comment" });
  }

  async create(comment) {
    const { text, userId, subjectId } = comment;
    const [result] = await this.database.query(
      `INSERT INTO ${this.table}(text, user_id, subject_id) values (?, ?, ?)`,
      [text, userId, subjectId]
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await this.database.query(
      `SELECT c.text, u.pseudo, c.created_at, c.updated_at, c.comment_id FROM ${this.table} AS c JOIN user AS u ON c.user_id = u.user_id `
    );
    return rows;
  }

  async readOneById(id) {
    const [rows] = await this.database.query(
      `SELECT c.text, u.pseudo, c.created_at, c.updated_at, c.comment_id, s.subject_idFROM ${this.table} AS c JOIN user AS u ON c.user_id = u.user_id JOIN subject as s on c.subject_id = s.subject_id WHERE c.comment_id = ?`,
      [id]
    );
    return rows[0];
  }

  async update(id, comment) {
    const { text } = comment;
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET text = ? WHERE comment_id = ?`,
      [text, id]
    );

    return result.affectedRows > 0;
  }

  async destroy(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE comment_id = ?`,
      [id]
    );
    return result.affectedRows > 0;
  }
}
module.exports = CommentRepository;
