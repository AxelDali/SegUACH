CREATE TABLE IF NOT EXISTS `facultades` (
	`facultad_id` int(5) NOT NULL AUTO_INCREMENT,
    `facultad_nombre` varchar(20) NOT NULL,
	`decripcion` varchar(20) NOT NULL,
	PRIMARY KEY (`facultad_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `carrera` (
	`facultad_id` int(5) NOT NULL,
    `carrera_id` int(5) NOT NULL AUTO_INCREMENT,
	`carrera_nombre` varchar(20) NOT NULL,
	`descripcion` varchar(20) NULL,
	PRIMARY KEY (`carrera_id`),
	FOREIGN KEY R_13 (`facultad_id`) REFERENCES `facultades` (`facultad_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `materias` (
	`carrera` varchar(20) NOT NULL,
	`professor_id` int(5) NOT NULL,
	`descripcion` varchar(20) NOT NULL,
    `materia_id` int(5) NOT NULL AUTO_INCREMENT,
	`materia_nombre` varchar(20) NOT NULL,
	PRIMARY KEY (`materia_id`),
    FOREIGN KEY R_15 (`professor_id`) REFERENCES `profesores` (`professor_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `grupos` (
	`grupo_id` int(5) NOT NULL AUTO_INCREMENT,
	`materia_id` int(5) NOT NULL,
	PRIMARY KEY (`grupo_id`),
	FOREIGN KEY R_6 (`materia_id`) REFERENCES `materias` (`materia_id`)
);

CREATE TABLE IF NOT EXISTS `profesores`(
	`professor_name` varchar(20) NOT NULL,
	`professor_lname` varchar(20) NOT NULL,
	`professor_email` varchar(20) NOT NULL,
	`professor_id` integer(5) NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (`professor_id`)
)ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `horario`(
	`materia_id` int(5) NOT NULL,
	`grupo_id` int(5) NOT NULL,
	`lapso` date NOT NULL,
	PRIMARY KEY (`lapso`),
	FOREIGN KEY R_9 (`grupo_id`) REFERENCES `grupos` (`grupo_id`),
    FOREIGN KEY R_17 (`materia_id`) REFERENCES `materias` (`materia_id`)
)ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `alumnos`(
	`alumno_nombre` varchar(20) NOT NULL,
	`alumno_apellido` varchar(20) NOT NULL,
	`alumno_email` varchar(20) NOT NULL,
	`alumno_id` int(5) NOT NULL AUTO_INCREMENT,
	`carrera_ID` int(5) NOT NULL,
	PRIMARY KEY (`alumno_id`),
	FOREIGN KEY R_11 (`carrera_id`) REFERENCES `carrera` (`carrera_id`)
)ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `calificaciones`(
	`calificacion` int(2) NOT NULL,
	`materia_id` int(5) NOT NULL,
	`alumno_id` int(5) NOT NULL,
	PRIMARY KEY (`calificacion`),
	FOREIGN KEY R_3 (`alumno_id`) REFERENCES `alumnos` (`alumno_id`),
	FOREIGN KEY R_5 (`materia_id`) REFERENCES `materias` (`materia_id`)
)ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `kardex`(
	`calificacion` int(2) NOT NULL,
	`materia` varchar(20) NOT NULL,
	`descripcion` varchar(20) NOT NULL,
	PRIMARY KEY (`descripcion`),
	FOREIGN KEY R_1 (`calificacion`) REFERENCES `calificaciones` (`calificacion`)
)ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;
