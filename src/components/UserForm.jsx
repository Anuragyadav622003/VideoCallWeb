import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Container, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { SocketContext } from '../Context';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '600px',
        margin: '35px 0',
        padding: 0,
        [theme.breakpoints.down('xs')]: {
            width: '80%',
        },
    },
    paper: {
        padding: '10px 20px',
        border: '2px solid black',
    },
    margin: {
        marginTop: 20,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

const UserForm = () => {
    const classes = useStyles();
    const history = useHistory();
    const { name, setName, gender, setGender, country, setCountry } = useContext(SocketContext);
    const [formValid, setFormValid] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && gender && country) {
            setFormValid(true);
            history.push('/chat');
        }
    };

    return (
        <Container className={classes.container}>
            <Paper elevation={10} className={classes.paper}>
                <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                    <TextField label="Gender" value={gender} onChange={(e) => setGender(e.target.value)} fullWidth />
                    <TextField label="Country" value={country} onChange={(e) => setCountry(e.target.value)} fullWidth />
                    <Button type="submit" variant="contained" color="primary" className={classes.margin} disabled={!name || !gender || !country}>
                        Start Chatting
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default UserForm;
