const express = require('express');
const router = express.Router()
const { obtenerQR } = require('../controllers/web')

router.use('/qr', obtenerQR)

module.exports = router