import React, { useContext, useEffect, useState, useRef } from 'react';
import { Button, Grid, Typography, Container, Paper, List, ListItem, ListItemText, TextField, Tabs, Tab, Box } from '@material-ui/core';
import { Assignment, Phone } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { SocketContext } from '../Context';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    width: '390px',
    margin: 'auto',
  },
  paper: {
    padding: '10px 20px',
    border: '2px solid #ccc',
    borderRadius: '8px',
  },
  tabs: {
    color: theme.palette.common.white,
    borderBottom: '1px solid #ccc',
    backgroundColor: '#7B61FF',
    fontSize: '0rem',
  },
  tabPanel: {
    // padding: '20px 0',
  },
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '240px',
    borderRadius: '8px',
    overflowY: 'scroll',
    padding: '10px',
  },
  chatInput: {
    marginTop: '20px',
    display: 'flex',
  },
  chatTextField: {
    flex: 1,
    marginRight: '10px',
  },
  message: {
    color: 'white',
    padding: '7px',
    margin: '5px',
    borderBottom: '1px solid #eee',
  },
  ownMessage: {
    backgroundColor: '#7B61FF',
    alignSelf: 'flex-end',
    borderRadius: '8px',
  },
  otherMessage: {
    backgroundColor: '#9F7AEA',
    borderRadius: '8px',
    alignSelf: 'flex-start',
  },
  margin: {
    margin: '10px 0',
    backgroundColor: '#7B61FF',
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: '#9F7AEA',
    },
  },
}));

const Sidebar = ({ children }) => {
  const [entered, setEntered] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [message, setMessage] = useState('');
  const { me, name, setName, callUser, users, join, messages, sendMessage, setCurrentChat } = useContext(SocketContext);
  const classes = useStyles();
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (name) join();
  }, [name]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
  };

  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        {!entered && (
          <div>
            <Typography gutterBottom variant="h6">Account Info</Typography>
            <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
            <Button className={classes.margin} variant="contained" fullWidth startIcon={<Assignment fontSize="large" />} onClick={() => setEntered(true)}>
              Enter Meeting Room
            </Button>
          </div>
        )}
        {entered && (
          <>
            <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)} className={classes.tabs} indicatorColor="secondary" centered>
              <Tab label="Active Users" />
              <Tab label="Chats" />
            </Tabs>
            <TabPanel value={tabIndex} index={0} className={classes.tabPanel}>
              <Typography gutterBottom variant="h6">Users in Meeting</Typography>
              <List>
                {users.map((user) => (
                  user.id !== me && (
                    <ListItem key={user.id} button onClick={() => { callUser(user.id); setCurrentChat(user.id); }}>
                      <ListItemText primary={user.name} />
                      <Phone fontSize="large" />
                    </ListItem>
                  )
                ))}
              </List>
            </TabPanel>
            <TabPanel value={tabIndex} index={1} className={classes.tabPanel}>
              <div className={classes.chatContainer}>
                {messages.map((msg, index) => (
                  <div key={index} className={`${classes.message} ${msg.from === me ? classes.ownMessage : classes.otherMessage}`}>
                    <Typography variant="body2">{msg.message}</Typography>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <form className={classes.chatInput} onSubmit={handleSendMessage}>
                <TextField
                  label="Type a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={classes.chatTextField}
                  fullWidth
                />
                <Button type="submit" variant="contained" color="secondary">
                  Send
                </Button>
              </form>
            </TabPanel>
          </>
        )}
      </Paper>
      {children}
    </Container>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default Sidebar;
