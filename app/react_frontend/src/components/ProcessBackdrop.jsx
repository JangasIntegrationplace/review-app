import React from 'react'
import { connect } from 'react-redux'

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export function ProcessBackdrop(props) {
  const { isLoading } = props;
  const classes = useStyles();

  return (
    <Backdrop
      className={classes.backdrop}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.process.isLoading
})

export default connect(mapStateToProps, {})(ProcessBackdrop)
