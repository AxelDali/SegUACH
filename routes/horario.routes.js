const fs = require('fs');
const express = require("express");

const router = express.Router();

const horarioController = require('../controllers/horario.controller')

router.get('/index', horarioController.getHomePage);
router.get('/add', horarioController.addHorarioPage);
router.get('/edit/:id', horarioController.editHorarioPage);
router.get('/delete/:id', horarioController.deleteHorario);

router.post('/add', horarioController.addHorario);
router.post('/edit/:id', horarioController.editHorario);

module.exports = router;
