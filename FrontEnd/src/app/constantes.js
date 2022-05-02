const constantes = {
  //Ancho del menu lateral
  widthdrawer: 240,
  //BD
  ROLES: [
    {
      clave: 1,
      valor: 'Administrador',
    },
    {
      clave: 2,
      valor: 'Editor',
    },
    {
      clave: 3,
      valor: 'Consultor',
    },
  ],
  ROL: [
    {
      key: 1,
      nombre: 'Administrador',
    },
    {
      key: 2,
      nombre: 'Editor',
    },
    {
      key: 3,
      nombre: 'Consultor',
    },
  ],

  DEPARTAMENTOS: [
    {valor: 0, etiqueta: 'departamento'},
    {valor: 1, etiqueta: '25 de Mayo'},
    {valor: 2, etiqueta: '9 de Julio'},
    {valor: 3, etiqueta: 'Albardón'},
    {valor: 4, etiqueta: 'Angaco'},
    {valor: 5, etiqueta: 'Calingasta'},
    {valor: 6, etiqueta: 'Capital'},
    {valor: 7, etiqueta: 'Caucete'},
    {valor: 8, etiqueta: 'Chimbas'},
    {valor: 9, etiqueta: 'Iglesia'},
    {valor: 10, etiqueta: 'Jáchal'},
    {valor: 11, etiqueta: 'Pocito'},
    {valor: 12, etiqueta: 'Rawson'},
    {valor: 13, etiqueta: 'Rivadavia'},
    {valor: 14, etiqueta: 'San Lucía'},
    {valor: 15, etiqueta: 'San Martín'},
    {valor: 16, etiqueta: 'Sarmiento'},
    {valor: 17, etiqueta: 'Ullum'},
    {valor: 18, etiqueta: 'Valle Fértil'},
    {valor: 19, etiqueta: 'Zonda'},
  ],
  SEXO: [
    {valor: 'F', etiqueta: 'Femenino'},
    {valor: 'M', etiqueta: 'Masculino'},
  ],
  //Variables de entorno
  SITEKEYReCAPTCHA: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
  apiURL: 'http://localhost:3001',
  URL: 'http://localhost:3000',
};

export default constantes;
