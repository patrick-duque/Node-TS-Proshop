import { UserInterface } from '../models/interface';
import bcrypt from 'bcryptjs';

const users: UserInterface[] = [
	{
		name: 'Admin User',
		email: 'test@test.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true
	},
	{
		name: 'John Doe',
		email: 'john@doe.com',
		password: bcrypt.hashSync('123456', 10)
	}
];

export default users;
