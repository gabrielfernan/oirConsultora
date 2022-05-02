export const insertarComponente = (componentes, tipo) => {
  // const identificador = uuid();
  let componente = {};
  if (
    [
      'text',
      'textarea',
      'number',
      'parrafo',
      'select',
      'radio',
      'checkbox',
      'img',
      'time',
      'date',
      'daterange',
      'file',
      'rating',
      'condicional',
      'table',
    ].includes(tipo)
  ) {
    componente.pregunta = '';
    componente.type = tipo;
    componente.name = 'nombre_componente';
    componente.required = false;
    componente.placeholder = 'Texto descriptivo';
    componente.value = '';
    componente.errores = null;
  }
  if (['divider', 'recaptcha'].includes(tipo)) {
    componente.type = tipo;
  }
  switch (tipo) {
    case 'select':
      componente.placeholder = 'Seleccione una opcion';
      componente.options = [];
      break;
    case 'radio':
      componente.placeholder = 'Elija una opcion';
      componente.options = [];
      break;
    case 'checkbox':
      componente.placeholder = 'Elija una o varias opciones';
      componente.options = [];
      break;
    case 'img':
      componente.height = 0;
      componente.width = 0;
      break;
    case 'date':
      componente.placeholder = 'DD/MM/AAAA';
      break;
    case 'daterange':
      componente.label = 'Desde';
      componente.placeholder = 'DD/MM/AAAA';
      componente.label2 = 'Hasta';
      componente.placeholder2 = 'DD/MM/AAAA';
      componente.name2 = 'nombre_componente_2';
      componente.value = {desde: '', hasta: ''};
      break;
    case 'file':
      componente.label = 'Archivo';
      componente.filename = '';
      break;
    case 'rating':
      componente.value = 0;
      componente.scale = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5};
      break;
    case 'condicional':
      componente.label_1 = 'Opción afirmativa';
      componente.label_2 = 'Opción negativa';
      componente.componente = null;
      componente.required = true;
      break;
    case 'tablaDobleEntrada':
      componente.options = [];
      break;
    case 'table':
      componente.columnas = ['No satisfecho', 'Algo satisfecho', 'Satisfecho', 'Muy satisfecho'];
      componente.filas = [
        'Calidad de servicio',
        'Su limpieza',
        'Velocidad de respuesta',
        'Su amabilidad',
      ];
      componente.value = {
        'Calidad de servicio': '',
        'Su limpieza': '',
        'Velocidad de respuesta': '',
        'Su amabilidad': '',
      };
      break;
    default:
      break;
  }
  if (componente && componentes) {
    componentes.push(componente);
    return componentes;
  } else {
    return componente;
  }
};
