import React from 'react'
import { connect } from 'react-redux'

import { CreateCommentBO, SampleDetailAPI } from '../../../adapters/xhr/sample'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'


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


const Sample = (props) => {
  const { sample } = props;
  return (
    <>
      <Typography variant="h4" gutterBottom>{sample.title}</Typography>
      <Typography variant="body1" gutterBottom>{sample.body}</Typography>
    </>
  )
}

export const Thread = (props) => {
  const { author, body, timestamp } = props
  return (
    <>
      <Typography variant="caption" display="block" gutterBottom>by {author}</Typography>
      <Typography variant="body1" gutterBottom>{body}</Typography>
      <Typography variant="caption" display="block" gutterBottom>{timestamp}</Typography>
    </>
  )
}

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


export const ReviewDetail = (props) => {
  const classes = useStyles();
  const sampleId = props.match.params.sampleId
  const reviewId = props.match.params.reviewId
  const [data, setData] = React.useState(null)
  const [commentBO, setCommentBO] = React.useState(new CreateCommentBO(sampleId, reviewId, ""))
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    const init = async () => {
      const data = await SampleDetailAPI.get(sampleId, reviewId)
      setData(data);
    }
    init();
  }, [sampleId, reviewId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!commentBO.is_valid()){
      setError({type: "form"})
      return
    }
    try {
      await SampleDetailAPI.createComment(commentBO);
      setCommentBO(new CreateCommentBO(sampleId, reviewId, ""));
      setError(null);
      window.location.reload();
    } catch {
      setError({type: "response"})
    }
  }

  const handleUpdate = (e) => {
    setCommentBO(commentBO.handleUpdate(e))
  }

  if (data === null ) return <></>

  return (
    <Paper className={classes.root}>
      <Sample sample={data.sample} />
      <Divider />
      <Thread author={data.author} body={data.body} timestamp={data.timestamp}/>
      <Divider />
      {
        data.comments.map((comment, key) => <Thread
          key={key}
          author={comment.author}
          body={comment.body}
          timestamp={comment.timestamp}
        />)
      }
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
    </Paper>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDetail)
