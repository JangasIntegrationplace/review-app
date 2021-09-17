import React from 'react'
import { connect } from 'react-redux'

import { DeliveryAPI } from '../../../adapters/xhr/delivery'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 8
  },
  form: {
    width: '95%', // Fix IE 11 issue.
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
        Please write some text.
      </Typography>
    )
  else
    return (
      <Typography variant="caption" color="error" display="block" gutterBottom>
        ups. Something went wrong. Please reload and Try again
      </Typography>
    )
}


export const GenericDelivery = (props) => {
  const classes = useStyles();
  const delivery = props.match.params.delivery
  const [description, setDescription] = React.useState(null);
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null)
  const [body, setBody] = React.useState("")

  React.useEffect(() => {
    const init = async () => {
      const description = await DeliveryAPI.get(delivery)
      setDescription(description);
    }
    init();
  }, [delivery])


  const handleUpdate = e => {
    if (e.target.name !== "body") return
    setBody(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (body === ""){
      setError({type: "form"})
      return
    }
    const data = await DeliveryAPI.post(delivery, body)
    setResponse(data)
    setBody("")
    document.getElementById("delivery-form").reset();
  }
  
  if (description === null) return <></>

  return (
    <Paper className={classes.root}>
      <Typography variant="h4" gutterBottom>{delivery}</Typography>
      <Typography variant="body1" gutterBottom>{description.description}</Typography>
      <form
        className={classes.form}
        onChange={handleUpdate}
        onSubmit={handleSubmit}
        id="delivery-form"
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="body"
              name="body"
              label="Make a comment"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Error error={error} />
          </Grid>
          <Grid item xs={12}>
            <Button
              color="primary"
              variant="outlined"
              type="submit"
              className={classes.submit}
              fullWidth
            >
              Send Answer
            </Button>
          </Grid>
        </Grid>
      </form>
      <Divider />
      <Typography variant="h4" gutterBottom>Evaluation</Typography>
      <pre>
        {response === null ? "No data sent until now." : JSON.stringify(response, null, 2)}
      </pre>
    </Paper>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(GenericDelivery)
