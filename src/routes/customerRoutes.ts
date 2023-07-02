import express from "express";
const router = express.Router();
import { createCustomer, findAllCustomers, findCustomerByEmail, updateCustomer, deleteCustomer } from '../controllers/customerController'

// CREATE CUSTOMERS
router.post("/create", createCustomer);

// FETCH ALL CUSTOMERS
router.get("/allcustomers", findAllCustomers);

// RETRIEVE A SINGLE CUSTOMER BY ID || EMAIL ID
router.get("/customer/:email", findCustomerByEmail);

// UPDATE CUSTOM
router.put("/update", updateCustomer);

// DELETE A CUSTOM BY ID || EMAIL ID
router.delete("/delete/:email", deleteCustomer);
export default router;