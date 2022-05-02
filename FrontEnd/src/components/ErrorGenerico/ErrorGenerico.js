import React from 'react';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import './ErrorGenerico.css';
const ErrorGenerico = ({mensaje}) => {
  return (
    <React.Fragment>
      <Alert severity="error">
        <AlertTitle>Error:{` ${mensaje}`}</AlertTitle>
      </Alert>
    </React.Fragment>
  );
};

export default ErrorGenerico;
