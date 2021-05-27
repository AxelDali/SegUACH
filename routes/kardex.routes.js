const fs = require('fs');
const express = require("express");

const router = express.Router();

const kardexController = require('../controllers/kardex.controller')

router.get('/index', kardexController.getHomePage);
router.get('/add', kardexController.addKardexPage);
router.get('/edit/:id', kardexController.editKardexPage);
router.get('/delete/:id', kardexController.deleteKardex);

router.post('/add', kardexController.addKardex);
router.post('/edit/:id', kardexController.editKardex);

module.exports = router;
