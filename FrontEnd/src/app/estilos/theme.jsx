import {createTheme} from '@material-ui/core/styles';
import {esES} from '@material-ui/data-grid';

const theme = createTheme(
  {
    overrides: {
      zIndex: {
        drawer: 1099,
      },
    },
    palette: {
      primary: {
        main: '#00AFB3',
      },
      secondary: {
        main: '#575454',
      },
    },
  },
  esES
);

export default theme;
