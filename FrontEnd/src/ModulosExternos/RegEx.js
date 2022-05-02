const RegEx = {
  RegExEmail: /^([a-z0-9-.])+@([a-z])+.+([a-z]+).?([a-z]+)?$/,
  RegExPassword: /^([a-zA-Z0-9]){8,16}$/,
  RegExHash: /^[a-zA-Z0-9]+$/,
  RegExCuit: /^([0-9]){11}$/,
  RegExUsuario: /^([a-zA-Z0-9-])+$/,
  RegDni: /(^\d{7,8})$/m,
  RegTexto: /(^[a-zA-Z]+)$/m,
  RegTelefono: /(^\d{10})$/m,

  //RegExFecha:"^(?:3[01]|[12][0-9]|0?[1-9])([-/.])(0?[1-9]|1[1-2])\1\d{4}$",
  //RegExHora:/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
};
export default RegEx;
