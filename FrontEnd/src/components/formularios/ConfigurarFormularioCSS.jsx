import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  containerCSS: {
    marginTop: 30,
  },
  titleCSS: {
    marginBottom: theme.spacing(2),
  },
  paperCSS: {
    padding: 25,
  },
  textShareButtonCSS: {
    margin: 6,
    color: theme.palette.common.white,
  },
  shareButtonCSS: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 3,
  },
  shareFacebookColorCSS: {
    backgroundColor: 'rgb(59, 89, 152) !important',
  },
  shareLinkedInColorCSS: {
    backgroundColor: 'rgb(0, 127, 177) !important',
  },
  shareTelegramColorCSS: {
    backgroundColor: 'rgb(55, 174, 226) !important',
  },
  shareWhatsappColorCSS: {
    backgroundColor: 'rgb(37, 211, 102) !important',
  },
  shareTwitterColorCSS: {
    backgroundColor: 'rgb(0, 172, 237) !important',
  },
  shareEmailColorCSS: {
    backgroundColor: 'rgb(127, 127, 127) !important',
  },
  urlCSS: {
    border: `1px solid ${theme.palette.common.black}`,
    padding: 5,
    borderRadius: 3,
  },
  privacityButtonCSS: {
    textTransform: 'none',
  },
}));

export default useStyles;
