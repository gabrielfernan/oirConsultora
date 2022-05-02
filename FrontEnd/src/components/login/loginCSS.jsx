import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  containerCardLogin: {
    position: 'relative',
    top: -250,
  },
  paperCSS: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 300,
  },
  circleLeftCardLogin: {
    width: 50,
    height: 200,
    transform: 'rotate(180deg)',
    overflow: 'hidden',
    position: 'absolute',
    top: 50,
    opacity: 0.6,
  },
  circleRightCardLogin: {
    width: 62,
    height: 60,
    position: 'absolute',
    top: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.6,
  },
  circleLeft: {
    maxWidth: 100,
  },
  circleRight: {
    maxWidth: 100,
    position: 'absolute',
    bottom: 0,
  },
}));

export default useStyles;
