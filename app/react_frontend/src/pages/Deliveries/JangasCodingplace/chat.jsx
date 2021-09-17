import React from 'react'
import { connect } from 'react-redux'
import { ThreadAPI, ReceivedMessageBO, MessageBO } from '../../../adapters/xhr/chat';

import { Thread } from './reviewDetail';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
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


export const Chat = (props) => {
  const classes = useStyles()
  const [thread, setThread] = React.useState(null)
  const [messageBO, setMessageBO] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [messages, setMessages] = React.useState([])
  const [socket, setSocket] = React.useState(null)

  React.useEffect(() => {
    const init = async () => {
      const thread = await ThreadAPI.post()
      setThread(thread);
      setMessageBO(new MessageBO(thread.id, ""))
      const endpoint = `ws://localhost:8000/ws/chat/${thread.id}/`
      const socket = new WebSocket(endpoint);
      setSocket(socket)
    }
    init();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!messageBO.is_valid()){
      setError({type: "form"})
      return
    }
    try {
      await ThreadAPI.createMessage(messageBO);
      document.getElementById("msg-body-form").reset();
      setMessageBO(new MessageBO(thread.id), "");
      setError(null);
    } catch {
      setError({type: "response"})
    }
  }

  const handleUpdate = (e) => {
    setMessageBO(messageBO.handleUpdate(e))
  }

  if (thread === null || socket === null) return <></>

  socket.onmessage = e => {
    console.log("message received", e)
    const msg = JSON.parse(e.data)
    try {
      const message = ReceivedMessageBO.parseFromJSON(msg)

      if (messages.filter(m => m.id === message.id).length !== 0)
        return

      const new_messages = [...messages, message]
      setMessages(new_messages) 
    }
    catch {
      console.log("Message received from socket which is not a chat message.")
    }
  }

  socket.onopen = e => {
    console.log("open", e)
  }

  socket.onerror = e => {
    console.log("error", e)
  }

  socket.onclose = e => {
    console.log("close", e)
  }

  return (
    <Paper className={classes.root}>
      <Typography variant="h4" gutterBottom>Livechat Support Demo</Typography>
      <Typography variant="caption" display="block" gutterBottom>Thread will be renewed on reload. No Chat history is included yet.</Typography>
      <Divider />
      {
        messages.map((message, key) => <Thread
          key={key}
          author={message.user}
          body={message.body}
          timestamp={message.timestamp}
        />)
      }
      <form
        id="msg-body-form"
        className={classes.form}
        onChange={handleUpdate}
        onSubmit={handleSubmit}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="chat-msg-body"
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

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
