import React, {Fragment, useState, useEffect} from 'react';
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormGroup,
  FormLabel,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Radio,
  RadioGroup,
} from '@material-ui/core';

import useStyles from './componentesCSS';
import {formulariosSlice} from '../../app/redux/Formularios/ReducerFormularios';
import {useDispatch} from 'react-redux';
import ReCAPTCHA from 'react-google-recaptcha';
import {Rating} from '@material-ui/lab';

import ShortTextIcon from '@material-ui/icons/ShortText';
import SubjectIcon from '@material-ui/icons/Subject';
import Looks5OutlinedIcon from '@material-ui/icons/Looks5Outlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import RemoveIcon from '@material-ui/icons/Remove';
import DateRangeIcon from '@material-ui/icons/DateRange';

import {v4} from 'uuid';
import constantes from '../../app/constantes';

const VistaComponente = props => {
  const {item, index} = props;
  const classes = useStyles();

  const dispatch = useDispatch();
  const actions = formulariosSlice.actions;

  const [datosusuario, setDatosusuario] = useState({
    nombre: '',
    apellido: '',
    email: '',
    departamento: 0,
    sexo: '0',
    edad: 0,
    dni: '',
    telefono: '',
  });

  const [hover, setHover] = useState(-1);

  useEffect(() => {
    const usuarioNulo = () => {
      return (
        datosusuario.nombre === '' &&
        datosusuario.apellido === '' &&
        datosusuario.email === '' &&
        datosusuario.departamento === 0 &&
        datosusuario.sexo === '0' &&
        datosusuario.edad === 0 &&
        datosusuario.dni === '' &&
        datosusuario.telefono === ''
      );
    };
    if (!usuarioNulo(datosusuario)) {
      dispatch(
        actions.actualizarDatoComponente({index: index, prop: 'userdata', valor: datosusuario})
      );
    }
  }, [dispatch, actions, index, item, datosusuario]);

  const handleDatosUsuario = e => {
    setDatosusuario({...datosusuario, [e.target.name]: e.target.value});
  };

  return (
    <Fragment>
      {['divider'].includes(item.type) && (
        <Box>
          <Divider />
        </Box>
      )}
      {[
        'text',
        'textarea',
        'number',
        'select',
        'date',
        'parrafo',
        'radio',
        'checkbox',
        'img',
        'time',
        'userdata',
        'daterange',
        'recaptcha',
        'file',
        'rating',
        'condicional',
      ].includes(item.type) && (
        <Card elevation={3} classes={classes.boxActive}>
          <CardContent>
            <Fragment>
              {item.pregunta && (
                <Box>
                  <Typography component="div" fontWeight="fontWeightBold">
                    <Box fontWeight="fontWeightBold">{item.pregunta}</Box>
                  </Typography>
                </Box>
              )}
              {['text', 'textarea', 'number', 'select', 'date'].includes(item.type) && (
                <Box mt={3}>
                  <TextField
                    placeholder={item.placeholder}
                    name={item.name}
                    variant="outlined"
                    size="small"
                    fullWidth
                    required={item.required}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={
                      ['select', 'date'].includes(item.type)
                        ? {
                            endAdornment: (
                              <InputAdornment position="end">
                                {item.type === 'select' ? (
                                  <KeyboardArrowDownOutlinedIcon />
                                ) : (
                                  <CalendarTodayIcon />
                                )}
                              </InputAdornment>
                            ),
                          }
                        : {
                            startAdornment: (
                              <InputAdornment position="start">
                                {item.type === 'text' ? (
                                  <ShortTextIcon />
                                ) : item.type === 'textarea' ? (
                                  <SubjectIcon />
                                ) : (
                                  <Looks5OutlinedIcon />
                                )}
                              </InputAdornment>
                            ),
                          }
                    }
                    multiline={item.type === 'textarea'}
                    rows={item.type === 'textarea' ? 4 : 1}
                    disabled
                  />
                  {['select'].includes(item.type) && (
                    <Paper variant="outlined" className={classes.componenteRoot}>
                      {item.options.map((opcion, i) => (
                        <Typography variant="body2" color="textSecondary" key={i}>
                          {opcion}
                        </Typography>
                      ))}
                    </Paper>
                  )}
                </Box>
              )}
              {['parrafo'].includes(item.type) && (
                <Box mt={3}>
                  <Paper
                    variant="outlined"
                    color="textSecondary"
                    className={classes.componenteRoot}
                  >
                    <Box
                      dangerouslySetInnerHTML={{__html: item.value ? item.value : item.placeholder}}
                    />
                  </Paper>
                </Box>
              )}
              {['radio'].includes(item.type) && (
                <Box mt={3}>
                  <Paper variant="outlined" className={classes.componenteRoot}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">{item.label}</FormLabel>
                      <RadioGroup aria-label="gender" name={item.name} value={item.value}>
                        {item.options.map((opcion, i) => (
                          <FormControlLabel
                            value={opcion.valor}
                            control={<Radio />}
                            label={opcion.etiqueta}
                            key={v4()}
                            disabled
                          />
                        ))}
                      </RadioGroup>
                      <FormHelperText>{item.placeholder}</FormHelperText>
                    </FormControl>
                  </Paper>
                </Box>
              )}
              {['checkbox'].includes(item.type) && (
                <Box mt={3}>
                  <Paper variant="outlined" className={classes.componenteRoot}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">{item.label}</FormLabel>
                      <FormGroup>
                        {item.options.map((opcion, i) => (
                          <FormControlLabel
                            control={<Checkbox checked={opcion.estado} name={opcion.valor} />}
                            label={opcion.etiqueta}
                            key={v4()}
                            disabled
                          />
                        ))}
                      </FormGroup>
                      <FormHelperText>{item.placeholder}</FormHelperText>
                    </FormControl>
                  </Paper>
                </Box>
              )}
              {['img'].includes(item.type) && (
                <Box mt={3}>
                  <Card>
                    <CardContent id="img_contenedor">
                      <Grid container spacing={1} justify="center">
                        {item.value === '' ? (
                          <PanoramaOutlinedIcon color="disabled" style={{fontSize: 96}} />
                        ) : (
                          <img
                            src={item.value}
                            alt={item.label}
                            width={item.width}
                            height={item.height}
                          />
                        )}
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
              )}
              {['time'].includes(item.type) && (
                <Box mt={3}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    disabled
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <AccessTimeIcon />
                        </InputAdornment>
                      ),
                    }}
                    name={item.name}
                    required={item.required}
                    placeholder={item.placeholder}
                    label={item.label}
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>
              )}
              {['userdata'].includes(item.type) && (
                <Fragment>
                  <Box mt={3}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Nombre"
                          name="nombre"
                          value={datosusuario.nombre}
                          onChange={handleDatosUsuario}
                          variant="outlined"
                          size="small"
                          fullWidth
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Apellido"
                          name="apellido"
                          value={datosusuario.apellido}
                          onChange={handleDatosUsuario}
                          variant="outlined"
                          size="small"
                          fullWidth
                          disabled
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box mt={3}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Email"
                          name="email"
                          value={datosusuario.email}
                          onChange={handleDatosUsuario}
                          variant="outlined"
                          size="small"
                          fullWidth
                          type="email"
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Departamento"
                          name="departamento"
                          value={datosusuario.departamento}
                          defaultValue={0}
                          onChange={handleDatosUsuario}
                          variant="outlined"
                          size="small"
                          fullWidth
                          select
                          disabled
                        >
                          <option value="0">Elija una opción</option>
                          {constantes.DEPARTAMENTOS.map(depto => (
                            <option value={depto.valor} key={v4()}>
                              {depto.etiqueta}
                            </option>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box mt={3}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          label="Sexo"
                          name="sexo"
                          value={datosusuario.sexo}
                          defaultValue="0"
                          onChange={handleDatosUsuario}
                          variant="outlined"
                          size="small"
                          fullWidth
                          select
                          disabled
                        >
                          <option value="0">Elija una opción</option>
                          {constantes.SEXO.map(sexo => (
                            <option value={sexo.valor} key={v4()}>
                              {sexo.etiqueta}
                            </option>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          label="Edad"
                          name="edad"
                          value={datosusuario.edad}
                          onChange={handleDatosUsuario}
                          variant="outlined"
                          size="small"
                          fullWidth
                          type="number"
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          label="DNI"
                          name="dni"
                          value={datosusuario.dni}
                          onChange={handleDatosUsuario}
                          variant="outlined"
                          size="small"
                          fullWidth
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          label="Teléfono"
                          name="telefono"
                          value={datosusuario.telefono}
                          onChange={handleDatosUsuario}
                          variant="outlined"
                          size="small"
                          fullWidth
                          disabled
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Fragment>
              )}
              {['daterange'].includes(item.type) && (
                <Box mt={3}>
                  <Grid
                    container
                    spacing={2}
                    justify="center"
                    alignItems="center"
                    alignContent="center"
                  >
                    <Grid item xs={12} sm={5}>
                      <TextField
                        name={item.name}
                        label={item.label}
                        placeholder={item.placeholder}
                        variant="outlined"
                        size="small"
                        fullWidth
                        required={item.required}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <DateRangeIcon />
                            </InputAdornment>
                          ),
                        }}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={2} align="center">
                      <RemoveIcon />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        name={item.name2}
                        label={item.label2}
                        placeholder={item.placeholder2}
                        variant="outlined"
                        size="small"
                        fullWidth
                        required={item.required}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <DateRangeIcon />
                            </InputAdornment>
                          ),
                        }}
                        disabled
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}
              {['recaptcha'].includes(item.type) && (
                <Box mt={3} align="center">
                  <ReCAPTCHA sitekey={constantes.SITEKEYReCAPTCHA} />
                </Box>
              )}
              {['rating'].includes(item.type) && (
                <Box mt={3} align="center">
                  <Typography variant="body1" color="initial">
                    {item.placeholder}
                  </Typography>
                  <Rating
                    name={item.name}
                    value={item.value}
                    max={Object.keys(item.scale).length - 1}
                    onChange={(e, newValue) =>
                      dispatch(
                        actions.actualizarDatoComponente({
                          index: index,
                          prop: 'value',
                          valor: newValue,
                        })
                      )
                    }
                    onChangeActive={(e, newHover) => setHover(newHover)}
                    size="large"
                    disabled
                  />
                  {item.value !== null && (
                    <Typography variant="h5" component="span" color="initial">
                      {' ' + item.label + ': ' + item.scale[hover !== -1 ? hover : item.value]}
                    </Typography>
                  )}
                </Box>
              )}
              {['file'].includes(item.type) && (
                <Box mt={3} align="center">
                  <Typography variant="body1" color="initial">
                    {item.filename}
                  </Typography>
                </Box>
              )}
              {['condicional'].includes(item.type) && (
                <Box mt={3} align="center">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4} align="left">
                      <FormControl component="fieldset">
                        <RadioGroup
                          aria-label="opcion"
                          name="opcion"
                          value={item.value}
                          onChange={e =>
                            dispatch(
                              actions.actualizarDatoComponente({
                                index: index,
                                prop: 'value',
                                valor: e.target.value,
                              })
                            )
                          }
                          disabled
                        >
                          <FormControlLabel value="si" control={<Radio />} label={item.label_1} />
                          <FormControlLabel value="no" control={<Radio />} label={item.label_2} />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={8} align="left">
                      {item.value === 'si' && (
                        <Paper className={classes.boxCollapse}>
                          <Box>
                            <Typography component="div" fontWeight="fontWeightBold">
                              <Box fontWeight="fontWeightBold">{item.pregunta_1}</Box>
                            </Typography>
                          </Box>
                          <Box mt={2}>
                            <TextField
                              label="Escriba su respuesta"
                              value={item.value_1}
                              size="small"
                              fullWidth
                              variant="outlined"
                              disabled
                            />
                          </Box>
                        </Paper>
                      )}
                      {item.value === 'no' && (
                        <Paper className={classes.boxCollapse}>
                          <Box>
                            <Typography component="div" fontWeight="fontWeightBold">
                              <Box fontWeight="fontWeightBold">{item.pregunta_2}</Box>
                            </Typography>
                          </Box>
                          <Box mt={2}>
                            <TextField
                              label="Escriba su respuesta"
                              value={item.value_2}
                              size="small"
                              fullWidth
                              variant="outlined"
                              disabled
                            />
                          </Box>
                        </Paper>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Fragment>
          </CardContent>
        </Card>
      )}
    </Fragment>
  );
};

export default VistaComponente;
