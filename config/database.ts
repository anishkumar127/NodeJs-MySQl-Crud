import { Sequelize } from 'sequelize';
import { Customer } from "../src/models/Customer";
import dotenv from 'dotenv';

dotenv.config();

// Database Configuration.
const db_Name = process.env.db_Name;
const db_User = process.env.db_User;
const db_Password = process.env.db_Password;

// Database Server
const sequelize = new Sequelize(db_Name, db_User, db_Password, {
    host: "localhost",
    port: 3306,
    dialect: "mysql"
});

// Create Object of database for export.
const db = {
    Sequelize,
    sequelize,
    customers: null
};

// Models-Tables.
db.customers = Customer(sequelize, Sequelize);

export { db }