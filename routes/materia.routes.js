const fs = require('fs');
const express = require("express");

const router = express.Router();

const materiaController = require('../controllers/materias.controller')

router.get('/index', materiaController.getHomePage);
router.get('/add', materiaController.addMateriaPage);
router.get('/edit/:id', materiaController.editMateriaPage);
router.get('/delete/:id', materiaController.deleteMateria);

router.post('/add', materiaController.addMateria);
router.post('/edit/:id', materiaController.editMateria);

module.exports = router;
