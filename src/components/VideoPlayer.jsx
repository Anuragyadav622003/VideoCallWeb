import React, { useContext, useState } from 'react';
import { Grid, Paper, Button, IconButton } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import VideocamIcon from '@material-ui/icons/Videocam';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz'; // Add the Swap icon
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from './Sidebar';
import Notifications from './Notifications';
import { SocketContext } from '../Context';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  userVideo: {
    width: '250px',
    [theme.breakpoints.down('xs')]: {
      width: '100px',
    },
  },
  gridContainer: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    borderRadius: '15px',
    padding: '10px',
    margin: '10px',
  },
  userVideoContainer: {
    marginTop: '-40%',
    marginLeft: '10px',
  },
  con: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  endCallButton: {
    padding: '10px 20px',
    borderRadius: '10px',
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
    width: '70%',
  },
  swapButton: {
    margin: '10px',
  },
}));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, leaveCall } = useContext(SocketContext);
  const classes = useStyles();
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [isSwapped, setIsSwapped] = useState(false);

  const toggleMic = () => {
    setMicOn((prev) => !prev);
    if (myVideo.current) {
      myVideo.current.srcObject.getAudioTracks()[0].enabled = !micOn;
    }
  };

  const toggleCam = () => {
    setCamOn((prev) => !prev);
    if (myVideo.current) {
      myVideo.current.srcObject.getVideoTracks()[0].enabled = !camOn;
    }
  };

  const handleSwapVideos = () => {
    setIsSwapped((prev) => !prev);
  };

  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            {!isSwapped ? (
              <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
            ) : (
              <video playsInline muted ref={userVideo} autoPlay className={classes.video} />
            )}
          </Grid>
        </Paper>
      )}
      <div className={classes.con}>
        {callAccepted && !callEnded && (
          <Paper className={`${classes.paper} ${classes.userVideoContainer}`}>
            <Grid item xs={12} md={6}>
              {!isSwapped ? (
                <video playsInline ref={userVideo} autoPlay className={classes.userVideo} />
              ) : (
                <video playsInline ref={myVideo} autoPlay className={classes.userVideo} />
              )}
            </Grid>
          </Paper>
        )}
        <div className={classes.controls}>
          <IconButton onClick={toggleMic} color={micOn ? 'primary' : 'secondary'}>
            {micOn ? <MicIcon /> : <MicOffIcon />}
          </IconButton>
          <IconButton onClick={toggleCam} color={camOn ? 'primary' : 'secondary'}>
            {camOn ? <VideocamIcon /> : <VideocamOffIcon />}
          </IconButton>
          <IconButton onClick={handleSwapVideos} className={classes.swapButton}>
            <SwapHorizIcon />
          </IconButton>
        </div>
        {callAccepted && !callEnded && (
          <Button onClick={leaveCall} variant="contained" className={classes.endCallButton}>
            End Call
          </Button>
        )}
      </div>
      <Sidebar>
        <Notifications />
      </Sidebar>
    </Grid>
  );
};

export default VideoPlayer;
