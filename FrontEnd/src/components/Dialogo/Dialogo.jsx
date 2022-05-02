import React from 'react';
import {Dialog, DialogTitle, List, ListItem, ListItemText} from '@material-ui/core';

const Dialogo = (props) => {
  const {onClose, selectedValue, open, titulo} = props;
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <React.Fragment>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>{titulo}</DialogTitle>
        <List sx={{pt: 0}}>
          <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
            <ListItemText primary="Add account" />
          </ListItem>
        </List>
      </Dialog>
    </React.Fragment>
  );
};
export default Dialogo;
