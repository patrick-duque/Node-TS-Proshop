import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db';
import products from './routes/products';

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 8080;

app.use(json());
app.use(cors());

app.use('/api/products', products);

app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} listening in port ${port}`));
