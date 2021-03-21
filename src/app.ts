import path from 'path';
import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import connectDB from './config/db';
import products from './routes/products';
import users from './routes/users';
import orders from './routes/orders';
import uploads from './routes/uploads';
import { UserType } from './models/user';
import { getAllProducts } from './controllers/products';

dotenv.config();

connectDB();

declare global {
	namespace Express {
		interface Request {
			user: UserType;
		}
	}
}

const app = express();
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

const port = process.env.PORT || 5000;

app.use(json());
app.use(cors());

app.use('/uploads', express.static('uploads'));

app.use('/api/products', products);
app.get('/api/paths', getAllProducts);
app.use('/api/users', users);
app.use('/api/orders', orders);
app.use('/api/uploads', uploads);

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

app.use((req, res, next) => {
	const error = new Error(`Not found - ${req.originalUrl}`);
	res.status(404);
	next(error);
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === 'production' ? null : err.stack
	});
});

app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} listening in port ${port}`));
