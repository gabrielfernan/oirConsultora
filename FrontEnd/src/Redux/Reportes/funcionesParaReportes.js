import constantes from '../../app/constantes';
export const formatearDatosParaReportes = votaciones => {
  var datos = {};
  var datosEncuenstados = [];
  votaciones.forEach(voto => {
    const departamento = constantes.DEPARTAMENTOS.find(
      departamento => parseInt(voto.datosEncuestado.departamento) === departamento.valor
    );
    datosEncuenstados.push({
      nombre: `${voto.datosEncuestado.nombre} ${voto.datosEncuestado.apellido}`,
      edad: `${voto.datosEncuestado.edad}`,
      departamento: departamento ? departamento.etiqueta : '',
      sexo: voto.datosEncuestado.sexo === 'F' ? 'Femenino' : 'Masculino',
      email: voto.datosEncuestado.email,
      dni: `${voto.datosEncuestado.dni}`,
      telefono: `${voto.datosEncuestado.telefono}`,
    });
    if (!Object.keys(datos).includes('graficoGenero')) {
      datos = {
        ...datos,
        graficoGenero: {
          tipo: 'graficoGenero',
          data: [
            {
              name: 'Hombres',
              value: voto.datosEncuestado.sexo === 'M' ? 1 : 0,
            },
            {
              name: 'Mujeres',
              value: voto.datosEncuestado.sexo === 'F' ? 1 : 0,
            },
          ],
        },
      };
    } else {
      var dataActualizada = [...datos.graficoGenero.data];

      if (voto.datosEncuestado.sexo === 'F') {
        dataActualizada[1].value++;
      } else {
        dataActualizada[0].value++;
      }
      datos = {
        ...datos,
        graficoGenero: {
          tipo: 'graficoGenero',
          data: [...dataActualizada],
        },
      };
    }
    if (!Object.keys(datos).includes('graficoEdad')) {
      datos = {
        ...datos,
        graficoEdad: {
          tipo: 'graficoEdad',
          data: [voto.datosEncuestado.edad],
        },
      };
    } else {
      datos = {
        ...datos,
        graficoEdad: {
          tipo: 'graficoEdad',
          data: [...datos.graficoEdad.data, voto.datosEncuestado.edad],
        },
      };
    }
    if (!Object.keys(datos).includes('graficoDepartamentos')) {
      var datosParaGraficoDepartamento = [];
      constantes.DEPARTAMENTOS.forEach(departamento => {
        if (departamento.etiqueta !== 'departamento') {
          datosParaGraficoDepartamento.push({
            departamento: departamento.etiqueta,
            cantidad: departamento.valor === parseInt(voto.datosEncuestado.departamento) ? 1 : 0,
            id: departamento.valor,
          });
        }
      });
      datos = {
        ...datos,
        graficoDepartamentos: {
          tipo: 'graficoDepartamentos',
          data: [...datosParaGraficoDepartamento],
        },
      };
    } else {
      // console.log(datos.graficoDepartamentos);
      var dataDepartamentosActualizada = [...datos.graficoDepartamentos.data];
      datos = {
        ...datos,
        graficoDepartamentos: {
          tipo: 'graficoDepartamentos',
          data: [
            ...dataDepartamentosActualizada.map(data => {
              if (parseInt(data.id) === parseInt(voto.datosEncuestado.departamento)) {
                return {...data, cantidad: parseInt(data.cantidad) + 1};
              } else {
                return data;
              }
            }),
          ],
        },
      };
    }
    Object.keys(voto.respuestas).forEach(tituloPregunta => {
      const pregunta = {...voto.respuestas[tituloPregunta]};
      if (pregunta.respuesta) {
        switch (pregunta.tipo) {
          case 'radio':
          case 'select':
            //Ya se guardaron los datos de esta pregunta?
            //   console.log('Ya se guardaron los datos de esta pregunta?');
            if (!Object.keys(datos).includes(tituloPregunta)) {
              //No
              //Inicializar datos de pregunta
              // console.log('No');
              // console.log(`Inicializar datos de ${tituloPregunta}`);
              // console.log(pregunta.opciones);
              let opciones = {};

              pregunta.opciones.forEach(opcion => {
                opciones = {...opciones, [pregunta.tipo === 'radio' ? opcion.etiqueta : opcion]: 0};
              });
              datos = {
                ...datos,
                [tituloPregunta]: {
                  tipo: pregunta.tipo,
                  data: {...opciones},
                },
              };
            }
            //Esta cargado en Datos.data su clave:valor?
            if (!Object.keys(datos[tituloPregunta].data).includes(pregunta.respuesta.toString())) {
              // No
              // Crear en el objeto Datos.data su clave:valor e inicializar su valor en 1
              datos = {
                ...datos,
                [tituloPregunta]: {
                  ...datos[tituloPregunta],
                  data: {...datos[tituloPregunta].data, [pregunta.respuesta]: 1},
                },
              };
            } else {
              // Si
              // Sumar en el objeto Datos.data en su clave:valor un voto mas
              datos = {
                ...datos,
                [tituloPregunta]: {
                  ...datos[tituloPregunta],
                  data: {
                    ...datos[tituloPregunta].data,
                    [pregunta.respuesta]: datos[tituloPregunta].data[pregunta.respuesta] + 1,
                  },
                },
              };
            }

            break;
          case 'rating':
            //Ya se guardaron los datos de esta pregunta?
            //   console.log('Ya se guardaron los datos de esta pregunta?');
            if (!Object.keys(datos).includes(tituloPregunta)) {
              //No
              //Inicializar datos de pregunta
              // console.log('No');
              // console.log(`Inicializar datos de ${tituloPregunta}`);

              datos = {
                ...datos,
                [tituloPregunta]: {
                  tipo: pregunta.tipo,
                  data: {},
                },
              };
            }
            //Esta cargado en Datos.data su clave:valor?
            if (!Object.keys(datos[tituloPregunta].data).includes(pregunta.respuesta.toString())) {
              // No
              // Crear en el objeto Datos.data su clave:valor e inicializar su valor en 1
              datos = {
                ...datos,
                [tituloPregunta]: {
                  ...datos[tituloPregunta],
                  data: {...datos[tituloPregunta].data, [pregunta.respuesta]: 1},
                },
              };
            } else {
              // Si
              // Sumar en el objeto Datos.data en su clave:valor un voto mas
              datos = {
                ...datos,
                [tituloPregunta]: {
                  ...datos[tituloPregunta],
                  data: {
                    ...datos[tituloPregunta].data,
                    [pregunta.respuesta]: datos[tituloPregunta].data[pregunta.respuesta] + 1,
                  },
                },
              };
            }

            break;
          case 'checkbox':
            //   console.log('Ya se guardaron los datos de esta pregunta?');
            if (!Object.keys(datos).includes(tituloPregunta)) {
              // console.log('No');
              // console.log(`Inicializar datos de ${tituloPregunta}`);
              let opciones = {};

              pregunta.opciones.forEach(opcion => {
                opciones = {...opciones, [opcion.etiqueta]: 0};
              });
              datos = {
                ...datos,
                [tituloPregunta]: {
                  tipo: pregunta.tipo,
                  data: {...opciones},
                },
              };
            }
            if (pregunta.respuesta) {
              pregunta.respuesta.forEach(resp => {
                if (!Object.keys(datos[tituloPregunta]['data']).includes(resp.toString())) {
                  datos = {
                    ...datos,
                    [tituloPregunta]: {
                      ...datos[tituloPregunta],
                      data: {...datos[tituloPregunta].data, [resp]: 1},
                    },
                  };
                } else {
                  datos = {
                    ...datos,
                    [tituloPregunta]: {
                      ...datos[tituloPregunta],
                      data: {
                        ...datos[tituloPregunta].data,
                        [resp]: datos[tituloPregunta].data[resp] + 1,
                      },
                    },
                  };
                }
              });
            }

            break;
          case 'table':
            //   console.log('Ya se guardaron los datos de esta pregunta?');
            if (!Object.keys(datos).includes(tituloPregunta)) {
              // console.log('No');
              // console.log(`Inicializar datos de ${tituloPregunta}`);
              datos = {
                ...datos,
                [tituloPregunta]: {
                  tipo: pregunta.tipo,
                  data: {columnas: pregunta.columnas},
                },
              };
            }
            Object.keys(pregunta.respuesta).forEach(resp => {
              if (!Object.keys(datos[tituloPregunta]['data']).includes(resp)) {
                datos = {
                  ...datos,
                  [tituloPregunta]: {
                    ...datos[tituloPregunta],
                    data: {
                      ...datos[tituloPregunta].data,
                      [resp]: [
                        {
                          [pregunta.respuesta[resp]]: 1,
                        },
                      ],
                    },
                  },
                };
              } else {
                if (
                  !datos[tituloPregunta]['data'][resp]
                    .map(r => Object.keys(r)[0])
                    .includes(pregunta.respuesta[resp])
                ) {
                  datos = {
                    ...datos,
                    [tituloPregunta]: {
                      ...datos[tituloPregunta],
                      data: {
                        ...datos[tituloPregunta].data,
                        [resp]: [
                          ...datos[tituloPregunta].data[resp],
                          {
                            [pregunta.respuesta[resp]]: 1,
                          },
                        ],
                      },
                    },
                  };
                } else {
                  let index = datos[tituloPregunta]['data'][resp]
                    .map(r => Object.keys(r)[0])
                    .indexOf(pregunta.respuesta[resp]);

                  datos[tituloPregunta]['data'][resp][index][pregunta.respuesta[resp]]++;
                }
              }
            });

            break;
          case 'text':
          case 'textarea':
            //   console.log('Ya se guardaron los datos de esta pregunta?');
            if (!Object.keys(datos).includes(tituloPregunta)) {
              // console.log('No');
              // console.log(`Inicializar datos de ${tituloPregunta}`);
              datos = {
                ...datos,
                [tituloPregunta]: {
                  tipo: pregunta.tipo,
                  data: [],
                },
              };
            }
            datos = {
              ...datos,
              [tituloPregunta]: {
                ...datos[tituloPregunta],
                data: [
                  ...datos[tituloPregunta].data,
                  {
                    respuesta: voto.respuestas[tituloPregunta].respuesta,
                    apellido_nombre:
                      voto.datosEncuestado.apellido + ', ' + voto.datosEncuestado.nombre,
                    sexo: voto.datosEncuestado.sexo,
                    edad: parseInt(voto.datosEncuestado.edad),
                    departamento: voto.datosEncuestado.departamento,
                  },
                ],
              },
            };
            //   datos[tituloPregunta].data.push({
            //     respuesta: voto.respuestas[tituloPregunta].respuesta,
            //     apellido_nombre: voto.datosEncuestado.apellido + ', ' + voto.datosEncuestado.nombre,
            //     sexo: voto.datosEncuestado.sexo,
            //     edad: parseInt(voto.datosEncuestado.edad),
            //     departamento: voto.datosEncuestado.departamento,
            //   });

            break;

          default:
            break;
        }
      }
    });
  });
  return {datos: datos, datosEncuenstados: datosEncuenstados};
};
