const express = require('express');
const router = express.Router();
const courtesyController = require('../controllers/CourtesyController');

router.post('/create', courtesyController.createCourtesy);

module.exports = router;