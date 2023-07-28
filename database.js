import mysql from 'mysql2';

const pool = mysql
  .createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'sai123',
    database: 'student',
  })
  .promise();

export async function getAll() {
  const [row] = await pool.query('SELECT * FROM stu');
  return row;
}

export async function getOne(rno) {
  const [row] = await pool.query(`SELECT * FROM stu WHERE rno = ?`, [rno]);
  return row[0];
}

export async function createOne(rno, sname, sage, sdept, stotal) {
  const [res] = await pool.query(`INSERT INTO stu VALUES (?,?,?,?,?)`, [
    rno,
    sname,
    sage,
    sdept,
    stotal,
  ]);
  const id = res.insertId;
  return id;
}

export async function deleteOne(id) {
  const [res] = await pool.query('DELETE FROM stu WHERE rno = ?', [id]);
  return res[0];
}
