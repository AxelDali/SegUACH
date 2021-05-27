const fs = require('fs');
const express = require("express");

const router = express.Router();

const calificacionController = require('../controllers/calificaciones.controller')

router.get('/index', calificacionController.getHomePage);
router.get('/add', calificacionController.addCalificacionPage);
router.get('/edit/:id', calificacionController.editCalificacionPage);
router.get('/delete/:id', calificacionController.deleteCalificacion);

router.post('/add', calificacionController.addCalificacion);
router.post('/edit/:id', calificacionController.editCalificacion);

module.exports = router;
