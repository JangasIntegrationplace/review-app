import React from 'react'
import { connect } from 'react-redux'

import { Dashboard } from './dashboard';
import { Sample } from './sample';
import { Chat } from './chat';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>{children}</Box>
      )}
    </div>
  );
}

export const JangasCodingplace = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = async (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Dashboard" />
        <Tab label="Review" />
        <Tab label="Support" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Dashboard />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Sample />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Chat />
      </TabPanel>
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(JangasCodingplace)
