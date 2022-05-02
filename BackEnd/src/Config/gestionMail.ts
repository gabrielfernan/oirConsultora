const nodemailer = require('nodemailer');

export class envioMail {
  public async enviarMailUsuario(emailUsuario: string, operacion: string) {
    let asunto,
      cuerpoDelMensaje,
      text: string = '';
    switch (operacion) {
      case 'confirmacionEncuesta':
        asunto = 'Confirmación de Encuesta';
        cuerpoDelMensaje = `<!DOCTYPE html>
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
          opacity: 1;" alt="encabezado" src="http://prueba.oir.com.ar/img/encabezado_de_mail.jpg"></img>
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
            color: #5E6060;" >< style=" font: normal normal bold 14px/20px Montserrat;">Gracias por completar la encuesta. 
            </p>
			<p style=" margin: 36px 0px 0px 71px;
            text-align: left;
            font: normal normal medium 14px/20px Montserrat;
            letter-spacing: 0px;
            color: #5E6060;" >< style=" font: normal normal bold 14px/20px Montserrat;">Estas participando por uno de nuestros premios. Por este medio y por nuestra redes estaremos informados a los ganadores.
            </p>
            <p style=" margin:22px 0px 0px 71px;
            text-align: left;
            font: normal normal bold 14px/20px Montserrat;
            letter-spacing: 0.17px;
            color: #5E6060;
            opacity: 1;">No olvides realizar todos los pasos que colocamos en la publicación.</p>
			<p style=" margin:22px 0px 0px 71px;
            text-align: left;
            font: normal normal bold 14px/20px Montserrat;
            letter-spacing: 0.17px;
            color: #5E6060;
            opacity: 1;">Síguenos en <strong><a href="https://www.facebook.com/oir-Software-Dev-103121645507406" target="_blank">Facebook</a></strong> e <strong><a href="https://instagram.com/oir.softwaredev/" target="_blank">Instagram</a></strong>.</p>
            <p style="   margin: 86px 0px 17px 144px;
            text-align: left;
            font: normal normal medium 14px/18px Montserrat;
            letter-spacing: 0px;
            color: #707070">Si tienes dudas contáctanos a: <span style="text-align: left;
    font: normal normal medium 14px/18px Montserrat;
    letter-spacing: 0px;
    color: #00AFB3">contacto@oirconsultora.com</span></p>
          </div>
          <img alt="imagenInicio" src="http://prueba.oir.com.ar/img/pie_de_mail.jpg"></img>
        </div>
        </body>
    </html>`;
        // cuerpoDelMensaje = `<div style="width:600px;font-size:15px;margin-left:70px;margin-right:38px">
        // 					<dl style="margin-top:0%;margin-bottom:0%"><dd><h2>Hola</h2></dd>
        // 					<dd>Gracias por completar la encuesta.</dd>
        // 					<dd>Estas participando por uno de nuestros premios. Por este medio y por nuestra redes estaremos informados a los ganadores.</dd>
        // 					<dd>No olvides realizar todos los pasos que colocamos en la publicación. </dd>
        // 					<dd>Seguínos en nuestras redes: <strong><a href="https://www.facebook.com/oir-Software-Dev-103121645507406" target="_blank">Facebook</a></strong> e <strong><a href="https://instagram.com/oir.softwaredev" target="_blank">Instagram</a></strong></dd>
        // 					</dl>
        // 					</div>`;
        text = 'Confirmación de recepción de encuesta';
        break;
      case 'suscripcion':
        asunto = 'Suscripción a página';
        // cuerpoDelMensaje = `<div style="width:600px;font-size:15px;margin-left:70px;margin-right:38px">
        // 					<dl style="margin-top:0%;margin-bottom:0%"><dd><h2>Hola</h2></dd>
        // 					<dd>Gracias por suscribirte a nuestra lista de contactos.</dd>
        // 					<dd> De esta manera podremos brindarte mas información sobre todas nuestras encuestas y sorteos, para que aumentes tus chances de ganar.</dd>
        // 					<dd>No olvides seguirnos en <strong><a href="https://www.facebook.com/oir-Software-Dev-103121645507406" target="_blank">Facebook</a></strong> e <strong><a href="https://instagram.com/oir.softwaredev" target="_blank">Instagram</a></strong></dd>
        // 					</dl>
        // 					</div>`;
        cuerpoDelMensaje = `<!DOCTYPE html>
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
          opacity: 1;" alt="encabezado" src="http://prueba.oir.com.ar/img/encabezado_de_mail.jpg"></img>
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
            color: #5E6060;" ><span style=" font: normal normal bold 14px/20px Montserrat;">Gracias</span> por suscribirte a nuestra lista de contactos. De esta manera podremos brindarte más información sobre todas nuestras encuestas y sorteos, para que aumentes tus chances de ganar.
            </p>
            <p style=" margin:22px 0px 0px 71px;
    
            text-align: left;
            font: normal normal bold 14px/20px Montserrat;
            letter-spacing: 0.17px;
            color: #5E6060;
            opacity: 1;">No olvides seguirnos en <strong><a href="https://www.facebook.com/oir-Software-Dev-103121645507406" target="_blank">Facebook</a></strong> e <strong><a href="https://instagram.com/oir.softwaredev/" target="_blank">Instagram</a></strong>.</p>
            <p style="   margin: 86px 0px 17px 144px;
            text-align: left;
            font: normal normal medium 14px/18px Montserrat;
            letter-spacing: 0px;
            color: #707070">Si tienes dudas contáctanos a: <span style="text-align: left;
    font: normal normal medium 14px/18px Montserrat;
    letter-spacing: 0px;
    color: #00AFB3">contacto@oirconsultora.com</span></p>
          </div>
          <img alt="imagenInicio" src="http://prueba.oir.com.ar/img/pie_de_mail.jpg"></img>
        </div>
        </body>
    </html>`;
        text = 'Confirmación de suscripción a página';
        break;
      default:
        break;
    }

    let transporter = nodemailer.createTransport({
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
      to: emailUsuario,
      // attachments: [
      // 	{
      // 		filename: 'encabezado.png',
      // 		path: path.join(
      // 			__dirname,
      // 			'../../public/archivos/Encabezado_mail.png'
      // 		),
      // 		cid: 'correo-encabezado',
      // 	},
      // 	{
      // 		filename: 'piePagina.png',
      // 		path: path.join(__dirname, '../../public/archivos/piePagina.png'),
      // 		cid: 'correo-pie',
      // 	},
      // ],
      subject: asunto,
      text: 'Confirmación de recepción de encuesta',
      // html: `${cuerpoDelMensaje}`,
      html: `${cuerpoDelMensaje}`,
    });
  }
}
