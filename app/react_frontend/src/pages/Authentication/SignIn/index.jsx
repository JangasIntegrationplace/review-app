import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from "react-router-dom";
import { login } from '../../../actions/auth';

import { AUTH_PATH } from './../../../constants/react-routes/open';
import { SignInAPI, AuthBO } from '../../../adapters/xhr/auth';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(0, 0, 2),
  },
}));

const Error = (props) => {
  const { error } = props;
  if (error === null)
    return <></>
  else if (error.type === "form")
    return (
      <Typography variant="caption" color="error" display="block" gutterBottom>
        Please set Username and Password
      </Typography>
    )
  else if (error.type === "response")
    return (
      <Typography variant="caption" color="error" display="block" gutterBottom>
        Either your Username or Password is wrong.
      </Typography>
    )
  else
    return (
      <Typography variant="caption" color="error" display="block" gutterBottom>
        ups. Something went wrong. Please reload and Try again
      </Typography>
    )
}


export const SignIn = (props) => {
  const classes = useStyles();
  const [authBO, setAuthBO] = React.useState(new AuthBO("", ""))
  const [error, setError] = React.useState(null)

  const handleUpdate = e => {
    setAuthBO(authBO.handleUpdate(e))
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (!authBO.is_valid()){
      setError({type: "form", message: "Please set Password and username."})
      return
    }
    try {
      const responseObj = await SignInAPI.post(authBO);
      window.localStorage.setItem("token", responseObj.token)
      props.login(responseObj.token, authBO.username)
      setAuthBO(new AuthBO("", ""));
      setError(null);
    } catch {
      setError({type: "response", message: "username already taken"})
    }
  }

  return (
    <React.Fragment>
      <Typography component="h1" variant="h5" align="center">
        Sign In
      </Typography>
      <form
        className={classes.form}
        onChange={handleUpdate}
        onSubmit={handleSubmit}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="username"
              name="username"
              label="Username"
              variant="outlined"
              value={authBO.username}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              value={authBO.password}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Error error={error} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              color="primary"
              variant="contained"
              className={classes.submit}
              type="submit"
              fullWidth
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Link
              component={RouterLink}
              to={`${AUTH_PATH}/signup`}
              variant="body2"
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        <Grid container>
          <Typography variant="caption" display="block" gutterBottom>
            Forgot your password?! Send a message to me in Slack @Janga
          </Typography>
        </Grid>
      </form>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  login: login
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
