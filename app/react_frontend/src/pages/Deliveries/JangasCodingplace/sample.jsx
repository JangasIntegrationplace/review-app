import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import { CreateReviewBO, SampleAPI } from '../../../adapters/xhr/sample'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'


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


export const Sample = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const [data, setData] = React.useState(null)
  const [reviewBO, setReviewBO] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    const init = async () => {
      const data = await SampleAPI.get()
      setData(data);
      setReviewBO(new CreateReviewBO(data.id, ""))
    }
    init();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!reviewBO.is_valid()){
      setError({type: "form"})
      return
    }
    try {
      const responseObj = await SampleAPI.createReview(reviewBO);
      setReviewBO(new CreateReviewBO(data.id, ""));
      setError(null);
      history.push(`/${responseObj.sample.id}/${responseObj.id}`)
    } catch {
      setError({type: "response"})
    }
  }

  const handleUpdate = (e) => {
    setReviewBO(reviewBO.handleUpdate(e))
  }

  if (data === null) return <></>

  return (
    <div>
      <Typography variant="h4" gutterBottom>{data.title}</Typography>
      <Typography variant="body1" gutterBottom>{data.body}</Typography>
      <form
        className={classes.form}
        onChange={handleUpdate}
        onSubmit={handleSubmit}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="body"
              name="body"
              label="Review"
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
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Sample)
