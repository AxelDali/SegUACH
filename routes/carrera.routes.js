const fs = require('fs');
const express = require("express");

const router = express.Router();

const carreraController = require('../controllers/carreras.controller')

router.get('/index', carreraController.getHomePage);
router.get('/add', carreraController.addCarreraPage);
router.get('/edit/:id', carreraController.editCarreraPage);
router.get('/delete/:id', carreraController.deleteCarrera);

router.post('/add', carreraController.addCarrera);
router.post('/edit/:id', carreraController.editCarrera);

module.exports = router;
