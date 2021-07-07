const db = require('./connection');

const sqlInserString = `
INSERT INTO produk (nama_produk, keterangan, harga, jumlah)
VALUES (?, ?, ?, ?);
`;

const sqlUpdateString = `
UPDATE produk SET nama_produk = ?, keterangan = ?, harga = ?, jumlah = ?
WHERE id = ?;
`;

const sqlDeleteString = `
DELETE FROM produk WHERE id = ?;
`;

const sqlGetAllString = `
SELECT * FROM produk;
`;

const sqlGetSingleString = `
SELECT * FROM produk WHERE id = ?;
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

const updateItem = ({name, description, price, qty}, id) => {
  db.createDBConnection()
    .then(connection => {
      connection.query(sqlUpdateString, [name, description, price, qty, id], (err, results, fields) => {
        if (err) throw err;
      });
      db.endDBConnection(connection);
    })
    .catch(err => {
      throw err;
    });
}

const deleteItem = (id) => {
  db.createDBConnection()
    .then(connection => {
      connection.query(sqlDeleteString, [id], (err, results, fields) => {
        if (err) throw err;
      });
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

const getSingleItem = (id) => {
  return new Promise((resolve, reject) => {
    db.createDBConnection()
      .then(connection => {
        connection.query(sqlGetSingleString, [id], (err, results, fields) => {
          if (err) reject(err);
          resolve(results);
        });
      db.endDBConnection(connection);
    })
    .catch(err => {
      reject(err);
    });
  });

}

module.exports = {
  insertItem,
  updateItem,
  deleteItem,
  getAllItem,
  getSingleItem
}
