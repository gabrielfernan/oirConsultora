import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import {useForm, Controller} from 'react-hook-form';
import {login} from '../../Redux/Usuarios/AccionesUsuarios';
import {useDispatch, useSelector} from 'react-redux';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import useStyles from './loginCSS';
import useGlobalStyles from '../../app/estilos/cssglobal';
import circleImg from '../../Static/Img/semicirculorotado90.png';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import encabezadoImg from '../../Static/Img/encabezado_de_mail.jpeg';

const Login = () => {
  const {control, handleSubmit} = useForm();
  const {errorLogin} = useSelector(state => state.ReducerUsuarios)
  const dispatch = useDispatch();
  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (data) => {
    dispatch(login({usuario: data.usuario, password: data.password}));
  };

  return (
    <Container maxWidth="sm" className={classes.containerCardLogin}>
      <img alt="Encabezado" src={encabezadoImg} className={globalClasses.imagenResponsive}></img>
      <Box width="100%" position="relative">
        <div className={classes.circleLeftCardLogin}>
          <img alt="" src={circleImg} className={classes.circleLeft}></img>
        </div>
        {/* <div className={classes.circleRightCardLogin}>
          <img alt="" src={circleImg} className={classes.circleRight}></img>
        </div> */}
      </Box>
      <Box>
        <Paper elevation={3} className={classes.paperCSS}>
          <Box mx={2} mt={{xs: 2}}>
            <Typography variant="subtitle1" color="textPrimary" align="center">
              Para ingresar escriba su usuario y contraseña
            </Typography>
          </Box>
          <Box mt={2} my={2} px={{xs: 5, sm: 8, md: 10}}>
            <form onSubmit={handleSubmit(handleLogin)} autoComplete="off">
              <Box mx={{xs: 0, sm: 4, md: 2}} my={2}>
                <Controller
                  name="usuario"
                  control={control}
                  defaultValue=""
                  rules={{required: 'Nombre de usuario requerido'}}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <TextField
                      label="Usuario"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={value}
                      onChange={onChange}
                      error={!!error || errorLogin?true:false}
                      helperText={error ? error.message : null}
                      autoFocus
                    />
                  )}
                />
              </Box>
              <Box mx={{xs: 0, sm: 4, md: 2}} my={2}>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{required: 'Contraseña requerida'}}
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <TextField
                      label="Contraseña"
                      variant="outlined"
                      size="small"
                      fullWidth
                      type={showPassword ? 'text' : 'password'}
                      value={value}
                      onChange={onChange}
                      error={!!error || errorLogin?true:false}
                      helperText={error  ? error.message : errorLogin}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Box>
             
              <Box mx={{xs: 5, sm: 8}} mt={5}>
            
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={`${globalClasses.colorBlanco} ${globalClasses.degradeVerde} ${globalClasses.estilosBoton}`}
                >
                  Iniciar
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
