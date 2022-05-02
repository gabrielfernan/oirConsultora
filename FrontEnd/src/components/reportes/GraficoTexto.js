import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import constantes from '../../app/constantes';
import 'fontawesome-4.7/css/font-awesome.css';
import {makeStyles} from '@material-ui/styles';
import './GraficoTexto.css';
// const useStyles = (theme) => ({
//   flexContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     boxSizing: 'border-box',
//   },
//   table: {
//     // temporary right-to-left patch, waiting for
//     // https://github.com/bvaughn/react-virtualized/issues/454
//     '& .ReactVirtualized__Table__headerRow': {
//       ...(theme.direction === 'rtl' && {
//         paddingLeft: '0 !important',
//       }),
//       ...(theme.direction !== 'rtl' && {
//         paddingRight: undefined,
//       }),
//     },
//   },
//   tableRow: {
//     cursor: 'pointer',
//   },
//   tableRowHover: {
//     // '&:hover': {
//     //   backgroundColor: theme.palette.grey[200],
//     // },
//   },
//   tableCell: {
//     flex: 1,
//   },
//   noClick: {
//     cursor: 'initial',
//   },
// });
const useStyles = makeStyles(theme => ({
  contenedorTabla: {
    overflowY: 'scroll',
    maxHeight: '500px',
    marginBottom: 30,
    padding: 5,
  },
}));
const GraficoTexto = props => {
  const {pregunta, datosGraficos} = props;
  const classes = useStyles();

  const obtenerSexo = s => {
    const sexo = constantes.SEXO.filter(item => item.valor.toLowerCase() === s.toLowerCase());
    if (sexo.length > 0) {
      return sexo[0].etiqueta;
    } else return '';
  };

  const obtenerDepartamento = d => {
    const departamento = constantes.DEPARTAMENTOS.filter(item => item.valor === parseInt(d));
    if (departamento.length > 0) {
      return departamento[0].etiqueta;
    } else return '';
  };

  const columnas = [
    {key: 'id', text: 'ID', sortable: true},
    {key: 'respuesta', text: 'Respuesta', sortable: true},
    {key: 'apellido_nombre', text: 'Apellido y Nombre', sortable: true, export: false},
    {key: 'sexo', text: 'Sexo', sortable: true},
    {key: 'edad', text: 'Edad', sortable: true},
    {key: 'departamento', text: 'Departamento', sortable: true},
  ];

  const filas = [];
  /*  Descomentar para prueba muchas filas */
  // const sample = [
  //   ['Frozen yoghurt', '', 6.0, 24, 4.0],
  //   ['Ice cream sandwich', 237, 9.0, 37, 4.3],
  //   ['Eclair', 262, 16.0, 24, 6.0],
  //   ['Cupcake', 305, 3.7, 67, 4.3],
  //   ['Gingerbread', 356, 16.0, 49, 3.9],
  // ];
  // for (let i = 0; i < 50; i += 1) {
  //   const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  //   filas.push({
  //     id: i,
  //     respuesta: randomSelection,
  //     apellido_nombre: randomSelection,
  //     sexo: randomSelection,
  //     edad: randomSelection,
  //     departamento: randomSelection,
  //   });
  // }

  //Comentar prueba muchas filas
  datosGraficos.data.forEach((fila, index) => {
    filas.push({
      id: index,
      respuesta: fila.respuesta,
      apellido_nombre: fila.apellido_nombre,
      sexo: obtenerSexo(fila.sexo),
      edad: fila.edad,
      departamento: obtenerDepartamento(fila.departamento),
    });
  });

  return (
    <Paper style={{marginBottom: '30px'}}>
      <Card>
        <CardContent>
          <Typography noWrap variant="h5" color="initial" align="center">
            {pregunta}
          </Typography>
          <Box m={2}>
            <TableContainer
              component={Paper}
              className={`${classes.contenedorTabla} scrollTablaGraficoTexto`}
            >
              <Table
                sx={{minWidth: 650}}
                size="small"
                aria-label="a dense table"
                // className={classes.table}
              >
                <TableHead>
                  <TableRow>
                    {columnas.map(columna => {
                      return <TableCell key={columna.key}>{columna.text}</TableCell>;
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filas.map(fila => {
                    return (
                      <TableRow
                        key={fila.id}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                      >
                        <TableCell component="th" scope="row">
                          {fila.id}
                        </TableCell>
                        <TableCell align="left">{fila.respuesta}</TableCell>
                        <TableCell align="left">{fila.apellido_nombre}</TableCell>
                        <TableCell align="left">{fila.sexo}</TableCell>
                        <TableCell align="left">{fila.edad}</TableCell>
                        <TableCell align="left">{fila.departamento}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default GraficoTexto;
