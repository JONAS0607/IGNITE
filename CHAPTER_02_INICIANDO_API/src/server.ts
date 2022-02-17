import express from 'express';
import { createCurse } from './routes';

const app = express();

app.get('/', createCurse);
// app.get('/', (req, res) => {
// 	return res.json({ message: 'Hello World!' });
// });
app.listen(3333);
