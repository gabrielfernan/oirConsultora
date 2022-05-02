import React, {useState} from 'react';
import useStyles from './barramenuCSS';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {Avatar, Divider, Grid, Menu, MenuItem, Box, Hidden} from '@material-ui/core';
import {useHistory} from 'react-router';
import {NavLink} from 'react-router-dom';
import LogoBlanco from '../../Static/Img/LogoBlanco.svg';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import img from '../../Static/Img/usuario.png';
import MenuIcon from '@material-ui/icons/Menu';
import Cargando from '../Cargando/Cargando';

const Barramenu = props => {
  const {usuario} = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAvatarActivo, setIsAvatarActivo] = useState(false);
  const [anchorElMobile, setanchorElMobile] = useState(null);
  const open = Boolean(anchorEl);
  const openMobile = Boolean(anchorElMobile);
  const history = useHistory();

  const handleMenu = e => {
    if (isAvatarActivo) {
      setIsAvatarActivo(false);
    } else {
      setIsAvatarActivo(true);
    }
    setAnchorEl(e.currentTarget);
  };
  const navLinkActivado = () => {
    setIsAvatarActivo(false);
  };
  /* const eventoOnblurMenuAvatar = () => {
    if (isAvatarActivo) setIsAvatarActivo(false);
  }; */
  const handleMenuMobile = e => {
    setanchorElMobile(e.currentTarget);
  };
  const handleClose = redireccion => {
    setAnchorEl(null);
    /* setIsAvatarActivo(false); */
    if (isAvatarActivo) {
      setAnchorEl(null);
    }
    if (redireccion) {
      history.push(redireccion);
    }
  };
  const handleCloseMobile = redireccion => {
    setanchorElMobile(null);
    if (redireccion) {
      history.push(redireccion);
    }
  };
  const cerrarSesion = () => {
    setAnchorEl(null);
    localStorage.removeItem('token');
    window.location.href = '/';
  };
  /* console.log(usuario.foto); */
  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <NavLink to="/" className={classes.titulo}>
            <Box ml={2}>
              <img alt="" src={LogoBlanco} className={classes.logo}></img>
            </Box>
          </NavLink>
          <Grid container spacing={1} alignItems="center" justifyContent="flex-end">
            <Hidden xsDown>
              <NavLink
                to="/"
                exact
                className={classes.navlinks}
                activeClassName={classes.navlinkactiveCSS}
                onClick={navLinkActivado}
              >
                <Typography variant="subtitle1" color="initial">
                  Inicio
                </Typography>
              </NavLink>
              {[1].includes(usuario.rol) && (
                <NavLink
                  to="/usuarios"
                  exact
                  className={classes.navlinks}
                  activeClassName={classes.navlinkactiveCSS}
                  onClick={navLinkActivado}
                >
                  <Typography variant="subtitle1" color="initial">
                    Usuarios
                  </Typography>
                </NavLink>
              )}
              {/* {[2, 3].includes(usuario.rol) && (
                <NavLink
                  to="/reportes"
                  exact
                  className={classes.navlinks}
                  activeClassName={classes.navlinkactiveCSS}
                  onClick={navLinkActivado}
                >
                  <Typography variant="subtitle1" color="initial">
                    Reportes
                  </Typography>
                </NavLink>
              )} */}
              <IconButton
                aria-label="cuenta de usuario actual"
                aria-controls="menu-app"
                aria-haspopup="true"
                onClick={handleMenu}
                /* onBlur={eventoOnblurMenuAvatar} */
                color="inherit"
                className={isAvatarActivo ? classes.menuiconoActivo : classes.menuicono}
              >
                {/* {usuario.foto ? (
                  <div>
                    <img
                      className=""
                      src={`data:image/${usuario.foto.tipo};base64,${usuario.foto.fileBase64}`}
                    ></img>
                  </div>
                ) : (
                  <Avatar className={classes.avatar}>
                    <AccountCircleIcon style={{fontSize: 30}} />
                  </Avatar>
                )} */}
                {usuario.foto ? (
                  <React.Fragment>
                    <Avatar
                      className={classes.avatar}
                      src={
                        usuario.foto
                          ? `data:image/${usuario.foto.tipo};base64,${usuario.foto.fileBase64}`
                          : ''
                      }
                    >
                      <AccountCircleIcon style={{fontSize: 30}} />
                    </Avatar>
                    <Typography variant="body2" color="initial">
                      {usuario.usuario}
                    </Typography>
                  </React.Fragment>
                ) : (
                  <AccountCircleIcon style={{fontSize: 30}} />
                )}
              </IconButton>
              <Menu
                id="menu-app"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={() => handleClose()}
              >
                <MenuItem onClick={() => handleClose('/perfil')}>Mi perfil</MenuItem>
                {usuario.rol === 1 && (
                  <MenuItem onClick={() => handleClose('/usuarios')}>Usuarios</MenuItem>
                )}
                <Divider />
                <MenuItem onClick={cerrarSesion}>Cerrar sesión</MenuItem>
              </Menu>
            </Hidden>
            <Hidden smUp>
              <IconButton
                className={classes.menuicono}
                aria-haspopup="true"
                onClick={handleMenuMobile}
              >
                <MenuIcon></MenuIcon>
              </IconButton>
              <Menu
                id="menu-mobile"
                anchorEl={anchorElMobile}
                keepMounted
                open={openMobile}
                onClose={() => handleCloseMobile()}
              >
                <NavLink to="/" className={classes.navlinksMobile}>
                  <MenuItem onClick={handleCloseMobile}>Inicio</MenuItem>
                </NavLink>
                {[1].includes(usuario.rol) && (
                  <NavLink to="/usuarios" className={classes.navlinksMobile}>
                    <MenuItem onClick={handleCloseMobile}>Usuarios</MenuItem>
                  </NavLink>
                )}
                <MenuItem onClick={() => handleCloseMobile('/perfil')}>Mi perfil</MenuItem>
                <MenuItem onClick={cerrarSesion}>Cerrar sesión</MenuItem>
              </Menu>
            </Hidden>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Barramenu;
