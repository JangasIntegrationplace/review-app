import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button';

import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export const General = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography component="h1" variant="h5">
        General Settings
      </Typography>
      <form className={classes.form}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="firstName"
              name="firstName"
              label="First name"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="lastName"
              name="lastName"
              label="Last name"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                disableFuture
                openTo="year"
                inputVariant="outlined"
                format="MM.dd.yyyy"
                views={["year", "month", "date"]}
                id="birthday"
                name="birthday"
                label="Birthday"
                fullWidth
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="about"
              name="about"
              label="About"
              multiline
              rows={3}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Divider/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="streetNo"
              name="streetNo"
              label="Street Number"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              id="street"
              name="street"
              label="Street"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="additional"
              name="additional"
              label="Additional"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="postcode"
              name="postcode"
              label="Postcode"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="city"
              name="city"
              label="City"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="country"
              name="country"
              label="Country"
              variant="outlined"
              fullWidth
            />
          </Grid>
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
      </form>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(General)
