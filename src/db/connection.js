require('dotenv').config();

const mysql = require('mysql');

const createDBConnection = () => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'arkademy'
    });

    connection.connect(err => {
      if (err) reject(err);
      resolve(connection);
    });
  });
}

const endDBConnection = (connection) => {
  connection.end();
}

module.exports = {
  createDBConnection,
  endDBConnection
}
