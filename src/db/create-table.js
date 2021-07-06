const db = require('./connection');

const sqlString = `
CREATE TABLE produk (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama_produk VARCHAR(100) NOT NULL,
  keterangan VARCHAR(255),
  harga INT,
  jumlah INT
);
`;

db.createDBConnection()
  .then(connection => {
    connection.query(sqlString, (err, results, fields) => {
      if (err) throw err;
      console.log(results);
    });
    db.endDBConnection(connection);
  })
  .catch(err => {
    throw err;
  });
