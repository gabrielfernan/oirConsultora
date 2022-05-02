const nodemailer = require('nodemailer');

export const enviarMailContactanos = async (email: string, mensaje: String) => {
  // Definimos el transporter
  var transporter = nodemailer.createTransport({
    host: process.env.HOST_EMAIL_SISTEMA,
    port: process.env.PORT_EMAIL_SISTEMA,
    secure: true,
    auth: {
      user: process.env.EMAIL_SISTEMA,
      pass: process.env.PASS_EMAIL_SISTEMA,
    },
  });
  await transporter.sendMail({
    from: process.env.EMAIL_SISTEMA,
    to: process.env.EMAIL_CONTACTO,
    subject: `Contacto: ${email}`,
    text: 'Este es un mail de oirConsultora.com',
    html: `${mensaje}`,
  });
};

export const enviarMailConfirmacion = async (email: string, nombre: String) => {
  // Definimos el transporter
  var transporter = nodemailer.createTransport({
    host: process.env.HOST_EMAIL_SISTEMA,
    port: process.env.PORT_EMAIL_SISTEMA,
    secure: true,
    auth: {
      user: process.env.EMAIL_SISTEMA,
      pass: process.env.PASS_EMAIL_SISTEMA,
    },
  });
  await transporter.sendMail({
    from: process.env.EMAIL_SISTEMA,
    to: email,
    subject: `Gracias por responder la encuesta`,
    text: 'Este es un mail de oirConsultora.com',
    html: `<!DOCTYPE html>
    <html lang="es">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Mail Confirmacion</title>
        <style type="text/css">
        body {margin: 0; padding: 0;}
        .cuerpoTexto{
          width: 600px;
        }
        .encabezado{
          top: 0px;
    left: 0px;
    width: 600px;
    height: 220px;
    opacity: 1;
        }
        .contenido {top: 0px;
        left: 0px;
        width: 600px ;
        height: 689px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        opacity: 1;}  
        .titulo {
          text-align: left;
          font: normal normal bold 22px/18px Rockwell;
          letter-spacing: 0px;
          color: #00AFB3;
          margin: 53px 0px 0px 75px;
        }
        .subtitulo {
            margin: 0px 0px 0px 75px;
    text-align: left;
    font: normal normal bold 18px/22px Montserrat;
    letter-spacing: 0px;
    color: #00AFB3;
    opacity: 1;
        }
        .etiquetaAgradecimiento{
          margin: 36px 0px 0px 71px;
          text-align: left;
          font: normal normal medium 14px/20px Montserrat;
          letter-spacing: 0px;
          color: #5E6060;
        }
        .etiquetaDiaSorteo {
          margin:22px 0px 0px 71px;
    
          text-align: left;
          font: normal normal bold 14px/20px Montserrat;
          letter-spacing: 0.17px;
          color: #5E6060;
          opacity: 1;
        }
        .etiquetaContacto {
          margin: 86px 0px 17px 144px;
    text-align: left;
    font: normal normal medium 14px/18px Montserrat;
    letter-spacing: 0px;
    color: #707070
        }
        .linkContacto{
    text-align: left;
    font: normal normal medium 14px/18px Montserrat;
    letter-spacing: 0px;
    color: #00AFB3
        }
        .spanAgradecimientos{
          font: normal normal bold 14px/20px Montserrat;
        }
        </style>
    </head>
      <body>
        <div style=" left: 0px;
        width: 600px ;
        height: 689px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        opacity: 1;">
          <img style="  top: 0px;
          left: 0px;
          width: 600px;
          height: 220px;
          opacity: 1;" alt="encabezado" src="http://www.prueba.oir.com.ar/img/encabezado_de_mail.jpg"></img>
          <div style="  width: 600px;" >
            <h1 style=" text-align: left;
            font: normal normal bold 22px/18px Rockwell;
            letter-spacing: 0px;
            color: #00AFB3;
            margin: 53px 0px 0px 75px;">Hola</h1>
            <h2 style="    margin: 0px 0px 0px 75px;
            text-align: left;
            font: normal normal bold 18px/22px Montserrat;
            letter-spacing: 0px;
            color: #00AFB3;
            opacity: 1;">${nombre}:</h2>
            <p style=" margin: 36px 0px 0px 71px;
            text-align: left;
            font: normal normal medium 14px/20px Montserrat;
            letter-spacing: 0px;
            color: #5E6060;" ><span style=" font: normal normal bold 14px/20px Montserrat;">Gracias</span> por completar la encuesta. Tu <span style=" font: normal normal bold 14px/20px Montserrat;">aporte</span> es muy importante para nosotros. Con tus datos estás <span style=" font: normal normal bold 14px/20px Montserrat;"">participando de un sorteo</span>  por increíbles premios.
            </p>
            <p style=" margin:22px 0px 0px 71px;
    
            text-align: left;
            font: normal normal bold 14px/20px Montserrat;
            letter-spacing: 0.17px;
            color: #5E6060;
            opacity: 1;">El día del sorteo recibirás un mail con los resultados.</p>
            <p style="   margin: 86px 0px 17px 144px;
            text-align: left;
            font: normal normal medium 14px/18px Montserrat;
            letter-spacing: 0px;
            color: #707070">Si tienes dudas contáctanos a: <span style="text-align: left;
    font: normal normal medium 14px/18px Montserrat;
    letter-spacing: 0px;
    color: #00AFB3">contacto@oirconsultora.com</span></p>
          </div>
          <img alt="imagenInicio" src="http://www.prueba.oir.com.ar/img/pie_de_mail.jpg"></img>
        </div>
        </body>
    </html>`,
  });
};

export const enviarMailSuscripto = async (email: string) => {
  // Definimos el transporter
  var transporter = nodemailer.createTransport({
    host: process.env.HOST_EMAIL_SISTEMA,
    port: process.env.PORT_EMAIL_SISTEMA,
    secure: true,
    auth: {
      user: process.env.EMAIL_SISTEMA,
      pass: process.env.PASS_EMAIL_SISTEMA,
    },
  });
  await transporter.sendMail({
    from: process.env.EMAIL_SISTEMA,
    to: email,
    subject: `Gracias por suscribirte`,
    text: 'Este es un mail de oirConsultora.com',
    html: `<!DOCTYPE html>
    <html lang="es">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Mail Confirmacion</title>
        <style type="text/css">
        body {margin: 0; padding: 0;}
        .cuerpoTexto{
          width: 600px;
        }
        .encabezado{
          top: 0px;
    left: 0px;
    width: 600px;
    height: 220px;
    opacity: 1;
        }
        .contenido {top: 0px;
        left: 0px;
        width: 600px ;
        height: 689px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        opacity: 1;}  
        .titulo {
          text-align: left;
          font: normal normal bold 22px/18px Rockwell;
          letter-spacing: 0px;
          color: #00AFB3;
          margin: 53px 0px 0px 75px;
        }
        .subtitulo {
            margin: 0px 0px 0px 75px;
    text-align: left;
    font: normal normal bold 18px/22px Montserrat;
    letter-spacing: 0px;
    color: #00AFB3;
    opacity: 1;
        }
        .etiquetaAgradecimiento{
          margin: 36px 0px 0px 71px;
          text-align: left;
          font: normal normal medium 14px/20px Montserrat;
          letter-spacing: 0px;
          color: #5E6060;
        }
        .etiquetaDiaSorteo {
          margin:22px 0px 0px 71px;
    
          text-align: left;
          font: normal normal bold 14px/20px Montserrat;
          letter-spacing: 0.17px;
          color: #5E6060;
          opacity: 1;
        }
        .etiquetaContacto {
          margin: 86px 0px 17px 144px;
    text-align: left;
    font: normal normal medium 14px/18px Montserrat;
    letter-spacing: 0px;
    color: #707070
        }
        .linkContacto{
    text-align: left;
    font: normal normal medium 14px/18px Montserrat;
    letter-spacing: 0px;
    color: #00AFB3
        }
        .spanAgradecimientos{
          font: normal normal bold 14px/20px Montserrat;
        }
        </style>
    </head>
      <body>
        <div style=" left: 0px;
        width: 600px ;
        height: 689px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        opacity: 1;">
          <img style="  top: 0px;
          left: 0px;
          width: 600px;
          height: 220px;
          opacity: 1;" alt="encabezado" src="http://www.oir.com.ar/encabezado_de_mail.jpg"></img>
          <div style="  width: 600px;" >
            <h1 style=" text-align: left;
            font: normal normal bold 22px/18px Rockwell;
            letter-spacing: 0px;
            color: #00AFB3;
            margin: 53px 0px 0px 75px;">Hola</h1>
            <h2 style="    margin: 0px 0px 0px 75px;
            text-align: left;
            font: normal normal bold 18px/22px Montserrat;
            letter-spacing: 0px;
            color: #00AFB3;
            opacity: 1;"></h2>
            <p style=" margin: 36px 0px 0px 71px;
            text-align: left;
            font: normal normal medium 14px/20px Montserrat;
            letter-spacing: 0px;
            color: #5E6060;" ><span style=" font: normal normal bold 14px/20px Montserrat;">Gracias</span> por completar la encuesta. Tu <span style=" font: normal normal bold 14px/20px Montserrat;">aporte</span> es muy importante para nosotros. Con tus datos estás <span style=" font: normal normal bold 14px/20px Montserrat;"">participando de un sorteo</span>  por increíbles premios.
            </p>
            <p style=" margin:22px 0px 0px 71px;
    
            text-align: left;
            font: normal normal bold 14px/20px Montserrat;
            letter-spacing: 0.17px;
            color: #5E6060;
            opacity: 1;">El día del sorteo recibirás un mail con los resultados.</p>
            <p style="   margin: 86px 0px 17px 144px;
            text-align: left;
            font: normal normal medium 14px/18px Montserrat;
            letter-spacing: 0px;
            color: #707070">Si tienes dudas contáctanos a: <span style="text-align: left;
    font: normal normal medium 14px/18px Montserrat;
    letter-spacing: 0px;
    color: #00AFB3">contacto@oirconsultora.com</span></p>
          </div>
          <img alt="imagenInicio" src="http://www.oir.com.ar/pie_de_mail.jpg"></img>
        </div>
        </body>
    </html>`,
  });
};
