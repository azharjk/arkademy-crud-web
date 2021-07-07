const express = require('express');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const items = await db.getAllItem();
  res.render('pages/index', { data: items });
});

app.get('/new', (req, res) => {
  res.render('pages/new');
});

app.post('/new', (req, res) => {
  db.insertItem({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    qty: req.body.qty
  });
  res.redirect('back');
});

app.get('/modify/:productId', async (req, res) => {
  const item = await db.getSingleItem(req.params.productId);
  res.render('pages/modify', { item: item[0] });
});

app.post('/modify/:productId', (req, res) => {
  db.updateItem({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    qty: req.body.qty
  }, req.params.productId);
  res.redirect('/');
});

app.get('/delete/:productId', (req, res) => {
  db.deleteItem(req.params.productId);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
