"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./data/users"));
const products_1 = __importDefault(require("./data/products"));
const user_1 = __importDefault(require("./models/user"));
const product_1 = __importDefault(require("./models/product"));
const order_1 = __importDefault(require("./models/order"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
db_1.default();
const importData = async () => {
    try {
        await order_1.default.deleteMany();
        await product_1.default.deleteMany();
        await user_1.default.deleteMany();
        const createdUser = await user_1.default.insertMany(users_1.default);
        const adminUser = createdUser[0]._id;
        const sampleProducts = products_1.default.map(p => ({ ...p, user: adminUser }));
        await product_1.default.insertMany(sampleProducts);
        console.log(`Data imported!`);
        process.exit();
    }
    catch (error) {
        console.error(error);
    }
};
const destroyData = async () => {
    try {
        await order_1.default.deleteMany();
        await product_1.default.deleteMany();
        await user_1.default.deleteMany();
        console.log(`Data destroyed!`);
        process.exit();
    }
    catch (error) {
        console.error(error);
    }
};
if (process.argv[2] === '-d') {
    destroyData();
}
else {
    importData();
}
