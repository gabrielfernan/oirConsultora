const nodeZip = require('node-zip');
import fs from 'fs';
import path from 'path';
const zip = new nodeZip();

export const comprimir = async (archivo: any) => {
  let pathFile: string = archivo.path;
  let nombreArchivo: any;
  if (pathFile.includes('/')) {
    nombreArchivo = pathFile.split('/');
  } else {
    nombreArchivo = pathFile.split('\\');
  }

  zip.file(
    nombreArchivo[1],
    fs.readFileSync(path.join(__dirname, `../../fotos/${nombreArchivo[1]}`))
  );
  let data = zip.generate({base64: false, compression: 'DEFLATE'});
  let nombreArchivoZip = `${nombreArchivo[1].split('.')[0]}.zip`;
  fs.writeFileSync(`${path.join(__dirname, `../../fotos/${nombreArchivoZip}`)}`, data, 'binary');
  let retornar = {
    data: data,
    nombreArchivo: nombreArchivoZip,
  };
  return retornar;
};

export async function descomprimir(datos: any) {
  const zip = new nodeZip(datos.data, {base64: false, checkCRC32: true});
  return zip.files;
}

export async function binaryToBase64(archivoBinario: string) {
  return Buffer.from(archivoBinario, 'binary').toString('base64');
}
