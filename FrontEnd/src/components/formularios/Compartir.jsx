import React from 'react';
import useStyles from './compartirCSS';
import {Box, Card, CardContent, Grid, Paper, Typography} from '@material-ui/core';

import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';
import {QRCode} from 'react-qr-svg';
import useGlobalStyles from '../../app/estilos/cssglobal';

const Compartir = props => {
  const classes = useStyles();
  const globalClasses = useGlobalStyles();

  const {formulario} = props;

  const url = `https://oirconsultora.com/votacion/${formulario._id}`;
  const url2 = 'http://github.com';

  return (
    <Box mt={3}>
      <Card elevation={3}>
        <CardContent>
          <Box mb={3} className={globalClasses.fondoVerde}>
            <Typography variant="h6" className={globalClasses.colorBlanco} align="center">
              Compartir encuesta
            </Typography>
          </Box>
          <Box mt={3}>
            <Paper className={classes.paperCSS}>
              <Grid container spacing={1} justifyContent="center">
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Typography variant="subtitle2" color="initial" align="center">
                    URL del formulario
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Typography
                    variant="body2"
                    componente="span"
                    color="initial"
                    className={classes.urlCSS}
                    align="center"
                    noWrap={true}
                  >
                    {url}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>
          <Box mt={3}>
            <Paper className={classes.paperCSS}>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={6}>
                  <Box my={2}>
                    <Grid container spacing={1} justifyContent="center">
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} align="center">
                        <QRCode
                          value={url}
                          /* style={{width: 220}} */ className={classes.responsiveQr}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box px={{xs: 2, sm: 4, md: 10}}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <FacebookShareButton
                          url={url2}
                          quote={formulario.titulo}
                          className={`${classes.shareButtonCSS} ${classes.shareFacebookColorCSS}`}
                        >
                          <FacebookIcon size={32} round />{' '}
                          <Typography
                            variant="body2"
                            component="span"
                            color="initial"
                            className={classes.textShareButtonCSS}
                          >
                            Facebook
                          </Typography>
                        </FacebookShareButton>
                      </Grid>
                      <Grid item xs={12}>
                        <LinkedinShareButton
                          url={url}
                          quote={formulario.titulo}
                          className={`${classes.shareButtonCSS} ${classes.shareLinkedInColorCSS}`}
                        >
                          <LinkedinIcon size={32} round />{' '}
                          <Typography
                            variant="body2"
                            component="span"
                            color="initial"
                            className={classes.textShareButtonCSS}
                          >
                            LinkedIn
                          </Typography>
                        </LinkedinShareButton>
                      </Grid>
                      <Grid item xs={12}>
                        <TelegramShareButton
                          url={url}
                          quote={formulario.titulo}
                          className={`${classes.shareButtonCSS} ${classes.shareTelegramColorCSS}`}
                        >
                          <TelegramIcon size={32} round />{' '}
                          <Typography
                            variant="body2"
                            component="span"
                            color="initial"
                            className={classes.textShareButtonCSS}
                          >
                            Telegram
                          </Typography>
                        </TelegramShareButton>
                      </Grid>
                      <Grid item xs={12}>
                        <WhatsappShareButton
                          url={url}
                          quote={formulario.titulo}
                          className={`${classes.shareButtonCSS} ${classes.shareWhatsappColorCSS}`}
                        >
                          <WhatsappIcon size={32} round />{' '}
                          <Typography
                            variant="body2"
                            component="span"
                            color="initial"
                            className={classes.textShareButtonCSS}
                          >
                            Whatsapp
                          </Typography>
                        </WhatsappShareButton>
                      </Grid>
                      <Grid item xs={12}>
                        <TwitterShareButton
                          url={url}
                          quote={formulario.titulo}
                          className={`${classes.shareButtonCSS} ${classes.shareTwitterColorCSS}`}
                        >
                          <TwitterIcon size={32} round />{' '}
                          <Typography
                            variant="body2"
                            component="span"
                            color="initial"
                            className={classes.textShareButtonCSS}
                          >
                            Twitter
                          </Typography>
                        </TwitterShareButton>
                      </Grid>
                      <Grid item xs={12}>
                        <EmailShareButton
                          subject={formulario.titulo}
                          url={url}
                          body="Completa esta encuesta"
                          className={`${classes.shareButtonCSS} ${classes.shareEmailColorCSS}`}
                        >
                          <EmailIcon size={32} round />{' '}
                          <Typography
                            variant="body2"
                            component="span"
                            color="initial"
                            className={classes.textShareButtonCSS}
                          >
                            E-mail
                          </Typography>
                        </EmailShareButton>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Compartir;
