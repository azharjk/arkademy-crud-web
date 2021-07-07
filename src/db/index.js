const db = require('./connection');

const sqlInserString = `
INSERT INTO produk (nama_produk, keterangan, harga, jumlah)
VALUES (?, ?, ?, ?);
`;

const sqlGetAllString = `
SELECT * FROM produk;
`;

const insertItem = ({ name, description, price, qty }) => {
  db.createDBConnection()
    .then(connection => {
      connection.query(sqlInserString, [name, description, price, qty], (err, results, fields) => {
        if (err) throw err;
      });
      db.endDBConnection(connection);
    })
    .catch(err => {
      throw err;
    });
}

const getAllItem = () => {
  return new Promise((resolve, reject) => {
    db.createDBConnection()
      .then(connection => {
        connection.query(sqlGetAllString, (err, results, fields) => {
          if (err) reject(err);
          resolve(results);
        });
        db.endDBConnection(connection);
      })
      .catch(err => {
        reject(err);
      })
  });
}

module.exports = {
  insertItem,
  getAllItem
}
