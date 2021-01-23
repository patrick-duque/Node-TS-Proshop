import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import products from './routes/products';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(json());
app.use(cors());

app.use('/products', products);

app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} listening in port ${port}`));
