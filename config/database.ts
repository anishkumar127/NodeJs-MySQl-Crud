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
    host: process.env.db_HOST,
    port: 3306,
    dialect: "mysql"
});

// Add error handling for the database connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
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