import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Nav from "./Nav";
import Container from '@material-ui/core/Container';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function Wrapper(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Nav />
      <main className={classes.content}>
        <Container
          maxWidth="lg"
          className={classes.container}
        >
          {props.children}
        </Container>
      </main>
    </div>
  );
}