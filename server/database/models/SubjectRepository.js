const AbstractRepository = require("./AbstractRepository");

class SubjectRepository extends AbstractRepository {
  constructor() {
    super({ table: "subject" });
  }

  async create(subject) {
    const { title, description, text, userId } = subject;
    const [result] = await this.database.query(
      `INSERT INTO ${this.table}(title, description, text, user_id) values (?, ?, ?, ?)`,
      [title, description, text, userId]
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await this.database.query(
      `SELECT s.title, s.description, u.pseudo, s.created_at, s.updated_at, s.subject_id FROM ${this.table} AS s JOIN user AS u ON s.user_id = u.user_id ORDER BY s.created_at DESC`
    );
    return rows;
  }

  async readOneById(id) {
    const [subjectRows] = await this.database.query(
      `SELECT s.title, s.description, s.text, s.created_at AS subject_created_at, s.updated_at AS subject_updated_at, s.subject_id, u.pseudo AS subject_user_pseudo 
      FROM ${this.table} AS s 
      JOIN user AS u ON s.user_id = u.user_id 
      WHERE s.subject_id = ?`,
      [id]
    );

    const [commentRows] = await this.database.query(
      `SELECT c.comment_id, c.text AS comment_text, c.created_at AS comment_created_at, c.updated_at AS comment_updated_at, u.pseudo AS comment_user_pseudo 
      FROM comment AS c 
      JOIN user AS u ON c.user_id = u.user_id 
      WHERE c.subject_id = ?  ORDER BY c.created_at ASC`,
      [id]
    );

    const subject = subjectRows[0] || null;

    return { ...subject, comments: commentRows };
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
