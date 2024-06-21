import type { Request, Response } from "express";
import User from "../models/Paciente.model";
import Consulta from "../models/Consulta.model";
import Paciente from "../models/Paciente.model";


export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
		try {
			console.log("Creando paciente con", req.body);

            const user_exists = await User.findOne({ where: { Rut: req.body.rut } });
			console.log("Resultado Busqueda", user_exists);

            if (!user_exists) {
				console.log("Creando nuevo paciente");
				const user = new User();
				user.Telefono = req.body.numero;
				user.Nombre = req.body.nombre;
                user.Rut = req.body.rut;
                user.Dirección = req.body.direccion;
				await Promise.allSettled([user.save()]);
			}

            const user = await User.findOne({ where: { Rut: req.body.rut } });
			console.log("Resultado de Persona", user.Nombre, user.Rut, user.Telefono, user.Dirección);

			if (user_exists) {
				const error = new Error("Este rut ya se encuentra registrado");
				return res.status(409).json({ error: error.message });
			}
			res.send("Operacion exitosa");
        }
        catch (error) {
			console.log(error);
			res.status(500).json({ error: "Hubo un error" });
		}
    };


    static createConsulta = async (req: Request, res: Response) => {
		try {
			console.log("Creando consulta con", req.body);

            const consulta_exists = await Consulta.findOne({ where: { Id: req.body.id } });
			console.log("Resultado Busqueda", consulta_exists);

            if (!consulta_exists) {
				console.log("Creando nueva consulta");
				const consulta = new Consulta();
				consulta.Id = req.body.id;
				consulta.fechaConsulta = req.body.fechaConsulta;
                consulta.horaConsulta = req.body.horaConsulta;
                consulta.medico_tratante = req.body.medico_tratante;
                consulta.nro_clinica = req.body.nro_clinica;
                consulta.Paciente_Rut = req.body.paciente_rut;
				await Promise.allSettled([consulta.save()]);
			}

            const consulta = await Consulta.findOne({ where: { Id: req.body.id } });
			console.log("Resultado de Consulta", consulta.Id, consulta.fechaConsulta, consulta.horaConsulta, consulta.medico_tratante);


			if (consulta_exists) {
				const error = new Error("Este Id ya se encuentra registrado");
				return res.status(409).json({ error: error.message });
			}
			res.send("Operacion exitosa");

        }
        catch (error) {
			console.log(error);
			res.status(500).json({ error: "Hubo un error" });
		}
	};


		static editarPaciente = async (req: Request, res: Response) => {
			try {
				console.log("Paciente a editar", req.body.rut);
	
				const user_exists = await User.findOne({ where: { Rut: req.body.rut } });
				console.log("Resultado Busqueda", user_exists);
	
				if (user_exists) {
					console.log("Editando nuevo paciente");
					const user = await User.findOne({ where: { Rut: req.body.rut } });
					user.Telefono = req.body.numero;
					user.Nombre = req.body.nombre;
					user.Rut = req.body.rut;
					user.Dirección = req.body.direccion;
					await user.save().then(() => {
						console.log("Usuario editado correctamente");
						res.status(201).json({ message: "Usuario editado con éxito" });})
				}
	
				const user = await User.findOne({ where: { Rut: req.body.rut } });
				console.log("Resultado de Persona", user.Nombre, user.Rut, user.Telefono, user.Dirección);
	
				if (!user_exists) {
					const error = new Error("Usuario no encontrado");
					return res.status(409).json({ error: error.message });
				}

			}
			catch (error) {
				console.log(error);
				res.status(500).json({ error: "Hubo un error" });
			}
    };

	static editarConsulta = async (req: Request, res: Response) => {
		try {
			console.log("Consulta a editar", req.body.id, req.body.fechaConsulta);

			const user_exists = await Consulta.findOne({ where: { Id: req.body.id } });
			console.log("Resultado Busqueda", user_exists);

			if (user_exists) {
				console.log("Editand consulta");
				const consulta = await Consulta.findOne({ where: { Id: req.body.id } });
				consulta.fechaConsulta = req.body.fechaConsulta;
                consulta.horaConsulta = req.body.horaConsulta;
                consulta.medico_tratante = req.body.medico_tratante;
                consulta.nro_clinica = req.body.nro_clinica;
                consulta.Paciente_Rut = req.body.paciente_rut;
				console.log("guardar", consulta.fechaConsulta, consulta.medico_tratante);
				await consulta.save();
			}

			const consulta = await Consulta.findOne({ where: { Id: req.body.id } });
			console.log("Resultado de Consulta", consulta.Id, consulta.fechaConsulta, consulta.horaConsulta, consulta.medico_tratante);

			if (!user_exists) {
				const error = new Error("Consulta no encontrado");
				return res.status(409).json({ error: error.message });
			}

		}
		catch (error) {
			console.log(error);
			res.status(500).json({ error: "Hubo un error" });
		}
	};

	static deleteAccount = async (req: Request, res: Response) => {
		try {
			console.log("paciente a eliminar", req.body.rut);

			const user_exists = await User.findOne({ where: { Rut: req.body.rut } });
			const consulta_exists = await Consulta.findOne({ where: { Paciente_Rut: req.body.rut } });
			console.log("Resultado Busqueda", user_exists);
			

			if (user_exists) {
				console.log("Eliminando paciente");
				const user = await User.findOne({ where: { Rut: req.body.rut } });
				await Consulta.destroy({ where: { Paciente_Rut: req.body.rut } });
				await user.destroy();
			}

			if (!user_exists) {
				const error = new Error("paciente no encontrado");
				return res.status(409).json({ error: error.message });
			}
			res.send("Operacion exitosa");

		}
		catch (error) {
			console.log(error);
			res.status(500).json({ error: "Hubo un error" });
		}
	};

	static deleteConsulta = async (req: Request, res: Response) => {
		try {
			console.log("Consulta a eliminar", req.body.id);

			const consulta_exists = await Consulta.findOne({ where: { Id: req.body.id } });
			console.log("Resultado Busqueda", consulta_exists);
			

			if (consulta_exists) {
				console.log("Eliminando consultas");
				const consulta = await Consulta.findOne(req.body.id);
				await consulta.destroy();
			}

			if (!consulta_exists) {
				const error = new Error("Consulta no encontrada");
				return res.status(409).json({ error: error.message });
			}
			res.send("Operacion exitosa");

		}
		catch (error) {
			console.log(error);
			res.status(500).json({ error: "Hubo un error" });
		}
	};

	static getConsulta = async (req: Request, res: Response) => {
		try {
			const id = parseInt(req.query.id as string, 10);
			const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
			console.log("URL completa de la solicitud:", fullUrl);
			console.log("Consulta a buscar", req.query.id);
			console.log(`ID received: ${id}`);

			const consulta_exists = await Consulta.findOne({ where: { Id: req.query.id } });
			console.log("Resultado Busqueda", consulta_exists.dataValues);
			await res.json(consulta_exists.dataValues);

			if (!consulta_exists) {
				const error = new Error("Consulta no encontrada");
				return res.status(409).json({ error: error.message });
			}

		}
		catch (error) {
			console.log(error);
			res.status(500).json({ error: "Hubo un error" });
		}
	};

	static getPaciente = async (req: Request, res: Response) => {
		try {
			console.log("Paciente a consultar",req.query.id as string);
			const rut = req.query.id as string;

			const Paciente_exists = await Paciente.findOne({ where: { Rut: rut} });
			console.log("Resultado Busqueda", Paciente_exists.dataValues);
			await res.json(Paciente_exists.dataValues);
			

			if (!Paciente_exists) {
				const error = new Error("Paciente no encontrada");
				return res.status(409).json({ error: error.message });
			}


		}
		catch (error) {
			console.log(error);
			res.status(500).json({ error: "Hubo un error" });
		}
	};

	static getPacienteList = async (req: Request, res: Response) => {
		try {

			const Paciente_exists = await Paciente.findAll();
			console.log("Resultado Busqueda", Paciente_exists);
			

			if (!Paciente_exists) {
				const error = new Error("No existen pacientes");
				return res.status(409).json({ error: error.message });
			}
			res.send("Operacion exitosa");

		}
		catch (error) {
			console.log(error);
			res.status(500).json({ error: "Hubo un error" });
		}
	};

	static getConsultaList = async (req: Request, res: Response) => {
		try {

			const Consulta_exists = await Consulta.findAll();
			console.log("Resultado Busqueda", Consulta_exists);
			

			if (!Consulta_exists) {
				const error = new Error("No existen pacientes");
				return res.status(409).json({ error: error.message });
			}
			res.send("Operacion exitosa");

		}
		catch (error) {
			console.log(error);
			res.status(500).json({ error: "Hubo un error" });
		}
	};
}