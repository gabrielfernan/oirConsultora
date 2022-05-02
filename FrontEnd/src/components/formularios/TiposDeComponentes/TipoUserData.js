import React, {Fragment} from 'react';
import {Box, Card, CardContent, Grid, TextField, Typography} from '@material-ui/core';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import clsx from 'clsx';
import {v4} from 'uuid';
import constantes from '../../../app/constantes';
import useGlobalStyles from '../../../app/estilos/cssglobal';
// import Rex from '../../../ModulosExternos/RegEx';
const TipoUserData = ({item, index, classes, actualizarDatoComponente, edicion}) => {
  const globalClasses = useGlobalStyles();

  const handleDatosUsuario = (e) => {
    actualizarDatoComponente({
      index: index,
      prop: 'value',
      valor: {...item.value, [e.target.name]: e.target.value},
    });
  };
  //console.log(Rex.RegDni.test('5922949'));
  //  console.log(Rex.RegTexto.test('asdqweqweqweqwAAAaeasd'));
  return (
    <Fragment>
      <Card elevation={3} classes={classes.boxActive}>
        <Box
          width="100%"
          height="11px"
          className={
            item.errores && Object.keys(item.errores).length
              ? globalClasses.fondoRojo
              : globalClasses.fondoVerde
          }
        ></Box>
        <CardContent>
          <Fragment>
            <Box textAlign="center">
              <Typography component="div" fontWeight="fontWeightBold">
                <Box fontWeight="fontWeightBold">
                  {item.pregunta}
                  {item.required && (
                    <Typography
                      variant="h6"
                      component="span"
                      fontWeight="fontWeightBold"
                      color="error"
                    >
                      <span color="error"> *</span>
                    </Typography>
                  )}
                </Box>
              </Typography>
            </Box>

            <Fragment>
              <Box mt={{sm: 3}}>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <Box mt={{xs: 3}} mr={{sm: 2, md: 3}}>
                      <TextField
                        error={item.errores && item.errores.nombre ? true : false}
                        helperText={item.errores && item.errores.nombre ? item.errores.nombre : ''}
                        label="Nombre"
                        name="nombre"
                        value={item.value.nombre}
                        onChange={handleDatosUsuario}
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled={edicion}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box mt={{xs: 3}} ml={{sm: 2, md: 3}}>
                      <TextField
                        label="Apellido"
                        name="apellido"
                        error={item.errores && item.errores.apellido ? true : false}
                        helperText={
                          item.errores && item.errores.apellido ? item.errores.apellido : ''
                        }
                        value={item.value.apellido}
                        onChange={handleDatosUsuario}
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled={edicion}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box mt={{sm: 3}}>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <Box mt={{xs: 3}} mr={{sm: 2, md: 3}}>
                      <TextField
                        label="Email"
                        name="email"
                        error={item.errores && item.errores.email ? true : false}
                        helperText={item.errores && item.errores.email ? item.errores.email : ''}
                        value={item.value.email}
                        inputProps={{type: 'email'}}
                        onChange={handleDatosUsuario}
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled={edicion}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box mt={{xs: 3}} ml={{sm: 2, md: 3}}>
                      <TextField
                        label="Departamento"
                        name="departamento"
                        error={item.errores && item.errores.departamento ? true : false}
                        helperText={
                          item.errores && item.errores.departamento ? item.errores.departamento : ''
                        }
                        value={item.value.departamento}
                        defaultValue={0}
                        onChange={handleDatosUsuario}
                        variant="outlined"
                        size="small"
                        fullWidth
                        select
                        disabled={edicion}
                      >
                        <option value="0" disabled={edicion}>
                          Elija una opción
                        </option>
                        {constantes.DEPARTAMENTOS.map((depto, i) => (
                          <option value={depto.valor} key={i} disabled={edicion}>
                            {depto.etiqueta}
                          </option>
                        ))}
                      </TextField>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box mt={{sm: 3}}>
                <Grid container>
                  <Grid item xs={12} sm={3}>
                    <Box mt={{xs: 3}} mr={{sm: 1, md: 2}}>
                      <TextField
                        label="Sexo"
                        name="sexo"
                        value={item.value.sexo}
                        onChange={handleDatosUsuario}
                        variant="outlined"
                        size="small"
                        fullWidth
                        select
                        disabled={edicion}
                        error={item.errores && item.errores.sexo ? true : false}
                        helperText={item.errores && item.errores.sexo ? item.errores.sexo : ''}
                      >
                        {constantes.SEXO.map((sexo) => (
                          <option value={sexo.valor} key={v4()}>
                            {sexo.etiqueta}
                          </option>
                        ))}
                      </TextField>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box mt={{xs: 3}} mx={{sm: 1, md: 2}}>
                      <TextField
                        label="Edad"
                        name="edad"
                        inputProps={{type: 'number', min: '16', max: '100'}}
                        value={item.value.edad}
                        onChange={handleDatosUsuario}
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled={edicion}
                        error={item.errores && item.errores.edad ? true : false}
                        helperText={item.errores && item.errores.edad ? item.errores.edad : ''}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box mt={{xs: 3}} mx={{sm: 1, md: 2}}>
                      <TextField
                        label="DNI"
                        name="dni"
                        inputProps={{type: 'number'}}
                        value={item.value.dni}
                        onChange={handleDatosUsuario}
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled={edicion}
                        error={item.errores && item.errores.dni ? true : false}
                        helperText={item.errores && item.errores.dni ? item.errores.dni : ''}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box mt={{xs: 3}} ml={{sm: 1, md: 2}}>
                      <TextField
                        label="Teléfono"
                        name="telefono"
                        inputProps={{type: 'number'}}
                        value={item.value.telefono}
                        onChange={handleDatosUsuario}
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled={edicion}
                        error={item.errores && item.errores.telefono ? true : false}
                        helperText={
                          item.errores && item.errores.telefono ? item.errores.telefono : ''
                        }
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Fragment>
          </Fragment>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default TipoUserData;
