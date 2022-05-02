import {makeStyles} from '@material-ui/core';

const useGlobalStyles = makeStyles(theme => ({
  imagenResponsive: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  padding10: {
    padding: 10,
  },
  padding15: {
    padding: 15,
  },
  maginTop20: {
    marginTop: 20,
  },
  maginTop9: {
    marginTop: 9,
  },
  ocultar: {
    display: 'none',
  },
  mostrar: {
    display: 'block',
  },
  navlink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  colorRojo: {
    color: theme.palette.error.main,
  },
  colorNaranja: {
    color: theme.palette.warning.main,
  },
  colorVerde: {
    color: '#00AFB3',
  },
  colorBlanco: {
    color: theme.palette.common.white,
  },
  colorGris: {
    color: theme.palette.secondary.main,
  },
  degradeVerde: {
    background: 'linear-gradient(90deg, rgba(0,175,179,1) 0%, rgba(0,117,179,1) 100%)',
    color: 'white',
  },
  estilosBoton: {
    borderRadius: '1.25rem',
    color: 'white',
  },
  fondoVerde: {
    background: '#00AFB3',
  },
  fondoRojo: {
    background: theme.palette.error.main,
  },
  tamañoCardActions: {
    maxHeight: '35px',
  },
  cursorPointer: {
    cursor: 'pointer',
  },
  borderRadiusSuperiores: {
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
  },
  posicionContenedorErrorUnFormulario: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textoInformativoCaracteres: {
    fontSize: '12px',
  },
  boxTextoInformativoCaracteres: {
    textAlign: 'end',
  },
}));

export default useGlobalStyles;
