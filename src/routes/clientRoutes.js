const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.post('/create', clientController.createClient);
router.get('/', clientController.getClients);

module.exports = router;
