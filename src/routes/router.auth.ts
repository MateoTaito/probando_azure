import { Router } from "express";
import { AuthController } from "../controllers/AuthControllers";
import { body } from "express-validator";
import { param } from "express-validator";
import User from "../models/Paciente.model";
import Consulta from "../models/Consulta.model";

const routerAuth = Router();

routerAuth.post(
	"/crear_Paciente",
	body("rut").notEmpty().withMessage("El rut no puede ir vacio"),
	body("direccion").notEmpty().withMessage("La direccion no puede ir vacia"),
	body("nombre").notEmpty().withMessage("El nombre no puede ir vacio"),
	body("numero").notEmpty().withMessage("El numero no puede ir vacio"),
	AuthController.createAccount
);

routerAuth.post(
	"/crear_Consulta",
	body("id"),
	body("fechaConsulta"),
	body("horaConsulta"),
	body("medico_tratante"),
    body("nro_clinica"),
    body("paciente_rut"),
	AuthController.createConsulta
);

routerAuth.put(
	"/editar_paciente",
	body("rut").notEmpty().withMessage("El rut no puede ir vacio"),
	body("direccion").notEmpty().withMessage("La direccion no puede ir vacia"),
	body("nombre").notEmpty().withMessage("El nombre no puede ir vacio"),
	body("numero").notEmpty().withMessage("El numero no puede ir vacio"),
	AuthController.editarPaciente
);

routerAuth.put(
	"/editar_Consulta",
	body("id"),
	body("fechaConsulta"),
	body("horaConsulta"),
	body("medico_tratante"),
    body("nro_clinica"),
    body("paciente_rut"),
	AuthController.editarConsulta
);

routerAuth.delete(
	"/delete_Paciente",
	body("rut").notEmpty().withMessage("El rut no puede ir vacio"),
	AuthController.deleteAccount
);

routerAuth.delete(
	"/delete_Consulta",
	body("id").notEmpty().withMessage("El id no puede ir vacio"),
	AuthController.deleteConsulta
);

routerAuth.get(
	"/consultar_Consulta",
	AuthController.getConsulta
);

routerAuth.get(
	"/consultar_paciente",
	AuthController.getPaciente
);

routerAuth.get(
	"/consultar_paciente_list",
	AuthController.getPacienteList
);

routerAuth.get(
	"/consultar_Consulta_list",
	AuthController.getConsultaList
);

routerAuth.get(
	"/lista_pacientes", async(req,res) => {
		try{
			const usuarios = await User.findAll();
			res.json(usuarios);
		} catch (error) {
			console.error("Error al obtener usuarios:", error);
			res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
		}
	});

routerAuth.get(
	"/lista_consultas", async(req,res) => {
		try{
			const usuarios = await Consulta.findAll();
			res.json(usuarios);
		} catch (error) {
			console.error("Error al obtener usuarios:", error);
			res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
		}
	});
export default routerAuth;