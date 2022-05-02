import Rex from '../../ModulosExternos/RegEx';

export const validarDatos = (formulario, setFormulario) => {
  var errores = {};
  const ComponenteActualizada = formulario.componentes.map((componente) => {
    componente.errores = null;
    if (componente.required) {
      if (
        ['text', 'textarea', 'number', 'time', 'date', 'daterange'].includes(componente.type) &&
        (componente.value === '' ||
          JSON.stringify(componente.value) === JSON.stringify({}) ||
          componente.value === [] ||
          componente.value === null)
      ) {
        errores = {
          ...errores,
          [componente.pregunta]: 'La respuesta es obligatoria',
        };
        componente.errores = 'La respuesta es obligatoria';
        // setFormulario({...formulario})
        //componente.erroreses[componente.pregunta]='La respuesta es obligatoria';
      }
      if (
        ['select', 'radio', 'checkbox', 'rating'].includes(componente.type) &&
        (componente.value === '' ||
          JSON.stringify(componente.value) === JSON.stringify({}) ||
          componente.value === [] ||
          componente.value === null)
      ) {
        errores = {
          ...errores,
          [componente.pregunta]: 'Debe elegir una opción',
        };
        componente.errores = 'Debe elegir una opción';

        //componente.erroreses.push('Debe elegir una opción');
      }
      if (
        ['condicional'].includes(componente.type) &&
        (componente.value === '' ||
          JSON.stringify(componente.value) === JSON.stringify({}) ||
          componente.value === [] ||
          componente.value === null)
      ) {
        errores = {
          ...errores,
          [componente.pregunta]: 'Debe elegir una opción',
        };
        componente.errores = 'Debe elegir una opción';

        //componente.erroreses.push('Debe elegir una opción');
      }
      if (
        ['rating'].includes(componente.type) &&
        (componente.value === '' || componente.value === 0 || componente.value === null)
      ) {
        errores = {
          ...errores,
          [componente.pregunta]: 'Debe elegir un puntaje',
        };
        componente.errores = 'Debe elegir un puntaje';

        // componente.erroreses.push('Debe elegir un puntaje');
      }
      if (['table'].includes(componente.type)) {
        Object.keys(componente.value).forEach((valor) => {
          if (componente.value[valor] === '') {
            errores = {
              ...errores,
              [componente.pregunta]: 'Debe elegir una opción para cada fila de la tabla',
            };
            componente.errores = 'Debe elegir una opción para cada fila de la tabla';
          }
        });
      }
      if (['userdata'].includes(componente.type)) {
        Object.keys(componente.value).forEach((valor) => {
          switch (valor) {
            case 'apellido':
            case 'nombre': {
              if (componente.value[valor].trim() === '') {
                errores = {
                  ...errores,
                  [componente.pregunta]: {
                    ...errores[componente.pregunta],
                    [valor]: 'Campo requerido',
                  },
                };
                componente.errores = {
                  ...componente.errores,
                  [valor]: 'Campo requerido',
                };
              } else {
                if (!Rex.RegTexto.test(componente.value[valor].trim())) {
                  errores = {
                    ...errores,
                    [componente.pregunta]: {
                      ...errores[componente.pregunta],
                      [valor]: 'No puede contener numero ni simbolos',
                    },
                  };
                  componente.errores = {
                    ...componente.errores,
                    [valor]: 'No puede contener numero ni simbolos',
                  };
                }
              }
              break;
            }
            case 'email': {
              if (!Rex.RegExEmail.test(componente.value[valor])) {
                errores = {
                  ...errores,
                  [componente.pregunta]: {
                    ...errores[componente.pregunta],
                    [valor]: 'Debe ingresar un email valido',
                  },
                };
                componente.errores = {
                  ...componente.errores,
                  [valor]: 'Debe ingresar un email valido',
                };
              }
              break;
            }
            case 'dni': {
              if (!Rex.RegDni.test(componente.value[valor])) {
                errores = {
                  ...errores,
                  [componente.pregunta]: {
                    ...errores[componente.pregunta],
                    [valor]: 'DNI incorrecto sin puntos ni guiones',
                  },
                };
                componente.errores = {
                  ...componente.errores,
                  [valor]: 'DNI incorrecto sin puntos ni guiones',
                };
              }
              break;
            }
            case 'telefono': {
              if (!Rex.RegTelefono.test(componente.value[valor])) {
                errores = {
                  ...errores,
                  [componente.pregunta]: {
                    ...errores[componente.pregunta],
                    [valor]: 'ingrese un numero valido con 264 (sin el 0 ni el 15)',
                  },
                };
                componente.errores = {
                  ...componente.errores,
                  [valor]: 'ingrese un numero valido con 264 (sin el 0 ni el 15)',
                };
              }
              break;
            }
            case 'sexo': {
              if (componente.value[valor].trim() === '') {
                errores = {
                  ...errores,
                  [componente.pregunta]: {
                    ...errores[componente.pregunta],
                    [valor]: 'Debe seleccionar un genero',
                  },
                };
                componente.errores = {
                  ...componente.errores,
                  [valor]: 'Debe seleccionar un genero',
                };
              }
              break;
            }
            case 'edad': {
              if (
                parseInt(componente.value[valor]) < 16 &&
                parseInt(componente.value[valor]) < 100
              ) {
                errores = {
                  ...errores,
                  [componente.pregunta]: {
                    ...errores[componente.pregunta],
                    [valor]: ' Mayores de 16',
                  },
                };
                componente.errores = {
                  ...componente.errores,
                  [valor]: ' Mayores de 16',
                };
              }

              break;
            }
            default: {
              if (!componente.value[valor]) {
                errores = {
                  ...errores,
                  [componente.pregunta]: {
                    ...errores[componente.pregunta],
                    [valor]: 'Campo requerido',
                  },
                };
                componente.errores = {
                  ...componente.errores,
                  [valor]: 'Campo requerido',
                };
              }
              break;
            }
          }
          // if (componente.value[valor] === '') {
          //   componente.erroreses.push(valor);
          // }
        });
      }
    }
    return componente;
  });
  setFormulario({...formulario, componentes: ComponenteActualizada});
  return errores;
};
