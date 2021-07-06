const express = require('express');
const db = require('./db');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const items = await db.getAllItem();
  console.log(items);
  res.render('pages/index', { data: items });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
