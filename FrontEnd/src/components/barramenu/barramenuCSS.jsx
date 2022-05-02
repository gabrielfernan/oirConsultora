import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  titulo: {
    flexGrow: 1,
    textDecoration: 'none',
    color: 'inherit',
  },
  menuicono: {
    borderRadius: 3,
    color: theme.palette.common.white,
    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },
  menuiconoActivo: {
    borderRadius: 0,
    color: theme.palette.common.white,

    background: theme.palette.primary.dark,
  },
  avatar: {
    marginRight: 5,
    background: theme.palette.primary.dark,
  },
  /* avatarActive: {
    marginRight: 5,
    color: theme.palette.common.white,
    background: theme.palette.primary.dark,
  }, */
  navlinks: {
    color: theme.palette.common.white,
    textDecoration: 'none',
    padding: 18,
    '&:hover': {
      background: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
  },
  navlinkactiveCSS: {
    background: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  navlinksMobile: {
    color: theme.palette.common.black,
    textDecoration: 'none',
  },
  logo: {
    width: 150,
  },
}));

export default useStyles;
