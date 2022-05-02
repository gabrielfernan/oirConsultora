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
import 'fontawesome-4.7/css/font-awesome.css';
import {makeStyles} from '@material-ui/styles';
import './GraficoDepartamentos.css';

const useStyles = makeStyles(theme => ({
  contenedorTabla: {
    overflowY: 'scroll',
    maxHeight: '500px',
    marginBottom: 30,
    padding: 5,
  },
}));
const GraficoDepartamentos = ({pregunta, datosGraficos}) => {
  const classes = useStyles();
  const filas = [...datosGraficos.data];
  return (
    <Paper style={{marginBottom: '30px'}}>
      <Card>
        <CardContent>
          <Typography noWrap variant="h5" color="initial" align="center">
            Encuestados por departamento
          </Typography>
          <Box m={2}>
            <TableContainer
              component={Paper}
              className={`${classes.contenedorTabla} scrollTablaGraficoDepartamentos`}
            >
              <Table
                sx={{minWidth: 650}}
                size="small"
                aria-label="a dense table"
                // className={classes.table}
              >
                <TableHead>
                  <TableRow>
                    <TableCell key="Departamento">Departamento</TableCell>
                    <TableCell key="Cantidad">Cantidad</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filas.map((fila, index) => {
                    return (
                      <TableRow key={index} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                        <TableCell align="left">{fila.departamento}</TableCell>
                        <TableCell align="left">{fila.cantidad}</TableCell>
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

export default GraficoDepartamentos;
