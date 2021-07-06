const db = require('./connection');

const sqlString = `
DROP TABLE produk;
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
