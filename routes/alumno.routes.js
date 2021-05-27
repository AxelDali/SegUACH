const fs = require('fs');
const express = require("express");

const router = express.Router();

const alumnoController = require('../controllers/alumnos.controller')

router.get('/index', alumnoController.getHomePage);
router.get('/add', alumnoController.addAlumnoPage);
router.get('/edit/:id', alumnoController.editAlumnoPage);
router.get('/delete/:id', alumnoController.deleteAlumno);

router.post('/add', alumnoController.addAlumno);
router.post('/edit/:id', alumnoController.editAlumno);

module.exports = router;
