import { Request, Response } from 'express';
import { db } from '../../config/database';

const Customer = db.customers;

export const createCustomer = async (req: Request, res: Response) => {
    console.log(req.body)
    try {
        const { name, email, age } = req.body;
        if (!name || !email || !age) {
            return res.status(400).send({
                message: "Bad Data"
            });
        }
        const customersModel = {
            name,
            email,
            age
        };
        const data = await Customer.create(customersModel);
        if (data) {
            res.status(201).send({
                message: "Customer created successfully"
            });
        }
    } catch (error) {
        console.error("Error creating customer:", error);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
};


export const findAllCustomers = async (req: Request, res: Response) => {

    try {
        const users = await Customer.findAll();
        if (users) {
            return res.status(200).send({
                message: users
            })
        }
    } catch (error) {
        res.status(404).send({
            message: "NOT FOUND!"
        })
    }
};

export const findCustomerByEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        // const customer = await Customer.findByPk(email);
        const customer = await Customer.findOne({ where: { email } }); // Email is primary Key.
        if (customer) {
            return res.status(200).send({
                message: customer
            })
        }
        return res.status(404).send({
            message: "NOT FOUND!"
        })
    } catch (error) {
        res.status(404).send({
            message: error
        })
    }
};

export const updateCustomer = async (req: Request, res: Response) => {
    try {
        const { name, email, age } = req.body;
        const newModels = {
            name,
            email,
            age
        };

        const [affectedRows] = await Customer.update(newModels, {
            where: {
                email
            }
        });

        const message = affectedRows === 0 ? "Customer not found or all fields required!" : "Customer updated successfully!";

        return res.status(affectedRows === 0 ? 500 : 201).send({
            message
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Internal Server Error!"
        });
    }
};


export const deleteCustomer = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        console.log(email);
        const deletedCustomer = await Customer.destroy({
            where: { email }
        })

        const message = deletedCustomer === 0 ? "Customer not found!" : "Customer deleted successfully!";

        return res.status(deletedCustomer === 0 ? 500 : 200).send({ message });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Internal Server Error!"
        });
    }
};
