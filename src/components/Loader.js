import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));

export default function Loader() {
  const classes = useStyles();

  return (
    <div id='loader'>
      <CircularProgress className={classes.progress} />
    </div>
  );
}