const Client = require('../models/Client');

// Obtener todos los clientes
exports.getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).send(clients);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Crear nuevo cliente
exports.createClient = async (req, res) => {
    try {
    const { name, email, phone, address } = req.body;
    const client = new Client({ name, email, phone, address });
        await client.save();
        res.status(201).send(client);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};