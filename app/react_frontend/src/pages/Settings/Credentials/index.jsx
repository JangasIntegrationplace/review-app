import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export const Credentials = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography component="h1" variant="h5">
        Credentials
      </Typography>
      <form className={classes.form}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <TextField
              id="email"
              name="email"
              label="Email Address"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Divider/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="newPassword1"
              name="newPassword1"
              label="New Password"
              type="password"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="newPassword2"
              name="newPassword2"
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Divider/>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              color="primary"
              variant="contained"
              className={classes.submit}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Credentials)
