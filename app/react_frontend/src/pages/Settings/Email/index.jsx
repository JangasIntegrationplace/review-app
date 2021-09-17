import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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

export const Email = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography component="h1" variant="h5">
        Email Settings
      </Typography>
      <form className={classes.form}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={true}
                name="news"
                color="primary"
              />
            }
            label="Emails for News"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={true}
                name="feedback"
                color="primary"
              />
            }
            label="Emails for Feedback"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={true}
                name="notifications"
                color="primary"
              />
            }
            label="Emails for Notifications"
          />
        </FormGroup>
        <Button
          color="primary"
          variant="contained"
          className={classes.submit}
        >
          Save
        </Button>
      </form>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Email)
