class CitizenService {
  constructor(pool) {
    this.pool = pool;
  }

  async registerCitizen(input) {
    const { firstName, surname, dateOfBirth, idNumber, photoBase64 } = input;

    const result = await this.pool.query(
      `INSERT INTO citizens (first_name, surname, date_of_birth, id_number, photo_base64)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, first_name, surname, date_of_birth, id_number, photo_base64, created_at`,
      [firstName, surname, dateOfBirth, idNumber, photoBase64 || null]
    );

    return this.toCitizenDto(result.rows[0]);
  }

  async getCitizenById(id) {
    const result = await this.pool.query(
      `SELECT id, first_name, surname, date_of_birth, id_number, photo_base64, created_at
       FROM citizens WHERE id = $1`,
      [id]
    );

    return result.rows[0] ? this.toCitizenDto(result.rows[0]) : null;
  }

  toCitizenDto(row) {
    return {
      id: row.id,
      firstName: row.first_name,
      surname: row.surname,
      dateOfBirth: row.date_of_birth,
      idNumber: row.id_number,
      hasPhoto: Boolean(row.photo_base64),
      createdAt: row.created_at
    };
  }
}

module.exports = CitizenService;
