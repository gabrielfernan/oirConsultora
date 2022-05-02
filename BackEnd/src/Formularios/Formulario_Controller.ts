import { Request, Response } from 'express';
import FormularioModel, { IFormulario } from './Formularios_Model';
import { obtenerUsuarioPorId } from '../Usuarios/Usuario_Controller';

exports.ListarFormularios = (req: Request, res: Response) => {
	try {
		FormularioModel.find({})
			.then((formularios: any[]) => {
				if (formularios.length) {
					res.status(200).json(formularios);
				} else {
					res.status(200).send([]);
				}
			})
			.catch((error) => {
				console.log(error);
				res.status(500).send({ message: 'Error interno del servidor' });
			});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: 'Error interno del servidor' });
	}
};

exports.AltaFormulario = (req: Request, res: Response) => {
	try {
		let datosBody = req.body;
		if (!req.body.usuarioId) {
			res.status(400).send({ message: 'No se ingresaron datos' });
		} else {
			const Usuario = obtenerUsuarioPorId(req.body.usuarioId);
			Usuario.then((usuario: any) => {
				if (usuario) {
					const nuevoFormulario: IFormulario = new FormularioModel(datosBody);

					nuevoFormulario.save().then((resultado: any) => {
						if (resultado) {
							res.status(200).send(resultado);
						} else {
							console.error(resultado);
							res
								.status(500)
								.send({ message: 'Error al insertar el formulario' });
						}
					});
				} else {
					res.status(404).send({ message: 'Usuario no encontrado' });
				}
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: 'Error interno del servidor' });
	}
};

exports.ObtenerFormulario = (req: Request, res: Response) => {
	try {
		if (!req.body.formularioId) {
			res.status(400).send({ message: 'No se ingresaron datos' });
		} else {
			FormularioModel.findById(req.body.formularioId)
				.then((doc: any) => {
					if (doc) {
						res.status(200).send(doc);
					} else {
						res.status(404).send({ message: 'Formulario no encontrado' });
					}
				})
				.catch((error) => {
					console.error(error);
					res
						.status(500)
						.send({ message: 'Error al intentar obtener el formulario' });
				});
		}
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: 'Error interno del servidor' });
	}
};
exports.ObtenerFormularioParaVotacion = (req: Request, res: Response) => {
	try {
		if (!req.body.formularioId) {
			res.status(400).send({ message: 'No se ingresaron datos' });
		} else {
			FormularioModel.findById(req.body.formularioId)
				.then((formularioParaVotacion: any) => {
					if (formularioParaVotacion) {
						if (
							!formularioParaVotacion.publicado ||
							formularioParaVotacion.estado !== 'habilitado'
						) {
							res.status(404).send({ message: 'Formulario no disponible' });
						} else {
							switch (formularioParaVotacion.condicion) {
								case 'fecha':
									if (!formularioParaVotacion.valorCondicion) {
										res
											.status(404)
											.send({ message: 'formulario sin valor de vigencia' });
									} else {
										const fechaFin = new Date(
											formularioParaVotacion.valorCondicion
										);
										const fechaDeHoy = new Date();
										fechaDeHoy.setDate(fechaDeHoy.getDate() - 1);

										if (fechaDeHoy.getTime() > fechaFin.getTime()) {
											formularioParaVotacion.estado = 'deshabilitado';
											formularioParaVotacion
												.save()
												.then(() => {
													res
														.status(403)
														.send({ message: 'Encuesta expirada' });
												})
												.catch((error: any) => {
													console.log(error);
													res
														.status(403)
														.send({ message: 'Encuesta expirada' });
												});
										} else {
											res.status(200).send(formularioParaVotacion);
										}
									}
									break;
								case 'cupo':
									if (!formularioParaVotacion.valorCondicion) {
										res
											.status(400)
											.send({ message: 'formulario sin valor de vigencia' });
									} else {
										if (
											parseInt(formularioParaVotacion.valorCondicion) <=
											formularioParaVotacion.cantidadDeVotos
										) {
											formularioParaVotacion.estado = 'deshabilitado';
											formularioParaVotacion
												.save()
												.then(() => {
													res
														.status(403)
														.send({ message: 'La encuesta supero el cupo' });
												})
												.catch((error: any) => {
													console.log(error);
													res
														.status(403)
														.send({ message: 'La encuesta supero el cupo' });
												});
										} else {
											res.status(200).send(formularioParaVotacion);
										}
									}
									break;
								case 'manual':
									res.status(200).send(formularioParaVotacion);
									break;
								default:
									res
										.status(400)
										.send({ message: 'No se encontro condicion de vigencia' });
									break;
							}
						}
					} else {
						res.status(404).send({ message: 'Formulario no encontrado' });
					}
				})
				.catch((error) => {
					console.error(error);
					res
						.status(500)
						.send({ message: 'Error al intentar obtener el formulario' });
				});
		}
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: 'Error interno del servidor' });
	}
};

exports.ModificarFormulario = (req: Request, res: Response) => {
	try {
		let datosBody = req.body;
		if (!req.body.formularioId) {
			res.status(400).send({ message: 'No se ingresaron datos' });
		} else {
			FormularioModel.findById(req.body.formularioId)
				.then((form: any) => {
					if (form) {
						form.updateOne(datosBody).then((resultado: any) => {
							if (resultado) {
								res.status(200).send({
									message: 'Formulario actualizado',
								});
							} else {
								console.error(resultado);
								res
									.status(500)
									.send({ message: 'Error a al actualizar el formulario' });
							}
						});
					} else {
						res.status(404).send({ message: 'Formulario no encontrado' });
					}
				})
				.catch((error: any) => {
					console.error(error);
					res.status(500).send({ message: 'Error interno del servidor' });
				});
		}
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: 'Error interno del servidor' });
	}
};
exports.ConfigurarFormulario = (req: Request, res: Response) => {
	try {
		let datosBody = req.body;
		if (!req.body.formularioId) {
			res.status(400).send({ message: 'No se ingresaron datos' });
		} else {
			FormularioModel.findById(req.body.formularioId)
				.then((form: any) => {
					if (form) {
						datosBody.publicado = true;
						form.updateOne(datosBody).then((resultado: any) => {
							if (resultado) {
								res.status(200).send({
									message: 'Formulario actualizado',
								});
							} else {
								console.error(resultado);
								res
									.status(500)
									.send({ message: 'Error a al actualizar el formulario' });
							}
						});
					} else {
						res.status(404).send({ message: 'Formulario no encontrado' });
					}
				})
				.catch((error: any) => {
					console.error(error);
					res.status(500).send({ message: 'Error interno del servidor' });
				});
		}
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: 'Error interno del servidor' });
	}
};

exports.EliminarFormulario = (req: Request, res: Response) => {
	try {
		if (!req.body.formularioId) {
			res.status(400).send({ message: 'No se ingresaron datos' });
		} else {
			FormularioModel.findByIdAndDelete(req.body.formularioId)
				.then((form: any) => {
					if (form) {
						res
							.status(200)
							.send({ message: 'Formulario eliminado', formEliminado: form });
					} else {
						res
							.status(404)
							.send({ message: 'El formulario no existe en la base de datos' });
					}
				})
				.catch((error: any) => {
					console.error(error);
					res.status(500).send({ message: 'Error interno del servidor' });
				});
		}
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: 'Error interno del servidor' });
	}
};

export const obtenerFormularioPorId = (id: any) => {
	return FormularioModel.findById(id).populate('usuarioId');
};
