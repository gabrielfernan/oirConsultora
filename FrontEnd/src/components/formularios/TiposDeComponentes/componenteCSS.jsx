import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  componenteRoot: {
    padding: 15,
  },
  boxCollapse: {
    padding: theme.spacing(2),
    background: theme.palette.grey[100],
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  switch: {
    fontSize: 12,
    marginTop: 10,
  },
  switchlabel: {
    fontSize: 12,
  },
  tableCell: {
    padding: '0 16px',
  },
  draggableIconOptions: {
    marginTop: 12,
    cursor: 'move',
  },
  immageButtonsCSS: {
    textTransform: 'none',
    margin: 5,
  },
  draggableIcon: {
    cursor: 'move',
  },
  boxBordered: {
    padding: theme.spacing(1),
    borderRadius: 4,
    border: `1px solid ${theme.palette.grey[200]}`,
  },
  divider: {
    heigth: 3,
  },
  textRotate: {
    'writing-mode': 'vertical-lr',
  },
}));

export default useStyles;
