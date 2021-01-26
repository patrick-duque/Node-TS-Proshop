import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users';
import products from './data/products';
import User from './models/user';
import Product from './models/product';
import Order from './models/order';
import connectDB from './config/db';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUser = await User.insertMany(users);

    const adminUser = createdUser[0]._id;

    const sampleProducts = products.map(p => ({ ...p, user: adminUser }));

    await Product.insertMany(sampleProducts);

    console.log(`Data imported!`);
    process.exit();
  } catch (error) {
    console.error(error as Error);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log(`Data destroyed!`);
    process.exit();
  } catch (error) {
    console.error(error as Error);
  }
};

if(process.argv[2] === '-d') {
	destroyData()
} else {
	importData()
}
