import express from 'express'
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
import customerRouter from './routes/customerRoutes'

// Configuration.
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Database 
import { db } from '../config/database'
db.sequelize.sync(); // create table if not exists.

// Middlewares
app.use(bodyParser.json());

// Routes
app.use("/api/customers", customerRouter);

app.get("/", (req, res) => {
    res.send("running ok!")
})
// Server Listing.
app.listen(PORT, () => {
    console.log(`app is running at port ${PORT}`);
})


export default app;