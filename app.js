import express from 'express';
import path from 'path';
import { getAll, getOne, createOne, deleteOne } from './database.js';
const app = express();

app.use(express.json());

app.use(express.static(path.join(path.resolve(), 'public')));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/get', async (req, res) => {
  const result = await getAll();
  res.send(result);
});

app.get('/get/:id', async (req, res) => {
  const id = req.params.id;
  const result = await getOne(id);
  res.send(result);
});

app.post('/', async (req, res) => {
  const { rno, sname, sage, sdept, stotal } = req.body;
  const result = await createOne(rno, sname, sage, sdept, stotal);
  console.log('done');
  res.send('inserted');
});

app.get('/del/:id', async (req, res) => {
  const id = req.params.id;
  const result = await deleteOne(id);
  res.send('Deleted');
});

app.listen(3000, () => {
  console.log('Running');
});
