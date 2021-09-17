import React from 'react';
import { Link as RouterLink} from 'react-router-dom';
import { connect } from 'react-redux'

import { logout } from './../../actions/auth'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

function NavOptions_(props){
  const { isAuthenticated, logout } = props;

  if (isAuthenticated){
    return <nav>
      <Button
        color="inherit"
        aria-controls="profile"
        aria-haspopup="true"
        onClick={logout}
      >
        Signout
      </Button>
    </nav>
  }
  else {
    return <nav></nav>
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = {
  logout: logout
}

const NavOptions = connect(mapStateToProps, mapDispatchToProps)(NavOptions_)


export default function Nav() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.title}
            noWrap
          >
            <Link
              to="/"
              component={RouterLink}
              underline="none"
              color="inherit"
            >
              Jangas Codingplace
            </Link>
          </Typography>
          <NavOptions />
        </Toolbar>
      </AppBar>
    </div>
  );
}
