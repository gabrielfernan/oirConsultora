import {makeStyles} from '@material-ui/core';
import constantes from '../../app/constantes';

const useStyles = makeStyles((theme) => ({
  botonFlotante: {
    position: 'fixed',
    top: 90,
    left: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    textTransform: 'none',
    zIndex: 1100,
    width: constantes.widthdrawer,
  },
  addButtonCSS: {
    position: 'fixed',
    left: 0,
    top: 160,
    background: theme.palette.secondary.main,
    color: theme.palette.common.white,
    padding: '0 0 0 16px',
    borderRadius: '0 23px 23px 0',
    cursor: 'pointer',
    zIndex: theme.zIndex.appBar,
    [theme.breakpoints.down('xs')]: {
      top: 130,
    },
    [theme.breakpoints.down('sm')]: {
      top: 130,
    },
  },
  drawerRootCSS: {
    width: constantes.widthdrawer,
    flexShrink: 0,
  },
  drawerPaperCSS: {
    width: constantes.widthdrawer,
    zIndex: '1099 !important',
  },
  immageButtonsCSS: {
    textTransform: 'none',
    margin: 5,
  },
  drawerHeaderCSS: {
    display: 'flex',
  },
  drawerTitleCSS: {
    flexGrow: 1,
    marginTop: 12,
  },
  containerCSS: {
    flexGrow: 1,
    marginTop: 30,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down('xs')]: {
      marginTop: 60,
      paddingLeft: 0,
      paddingRight: 0,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 70,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },
  paperCSS: {
    marginTop: 25,
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '15px',
      paddingRight: '15px',
    },
  },
  logo: {
    background: theme.palette.grey[100],
    borderColor: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: 3,
    maxWidth: 150,
    maxHeight: 150,
  },
  titleCSS: {
    marginBottom: theme.spacing(2),
  },
  gridItemCSS: {
    padding: `${theme.spacing(3)}px !important`,
  },
  gridContainerCSS: {
    marginTop: theme.spacing(3),
    paddingRight: theme.spacing(1),
  },
  hideTextField: {
    display: 'none',
  },
  showTextField: {
    display: 'block',
  },
  draggablePadding10: {
    padding: 10,
    borderRadius: 4,
    '&:hover, &:focus': {
      border: `1px solid ${theme.palette.info.light}`,
      background: '#f6f6f6',
    },
  },
  botonEliminarImg: {
    '&:hover, &:focus': {
      color: 'red',
    },
  },
  contenedorImg: {
    maxWidth: '200px',
    maxHeight: '200px',
  },
}));

export default useStyles;
