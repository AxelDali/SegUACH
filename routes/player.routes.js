const fs = require('fs');
const express = require("express");

const router = express.Router();

const profesorController = require('../controllers/players.controller')

router.get('/index', profesorController.getHomePage);
router.get('/add', profesorController.addProfesorPage);
router.get('/edit/:id', profesorController.editProfesorPage);
router.get('/delete/:id', profesorController.deleteProfesor);

router.post('/add', profesorController.addProfesor);
router.post('/edit/:id', profesorController.editProfesor);

module.exports = router;
