import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: '#7B61FF',
        color: theme.palette.common.white,
        padding: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'Nunito, sans-serif',
    },
    title: {
        fontSize: '2.25rem',
        fontWeight: 'bold',
    },
    nav: {
        marginLeft: '7rem',
        '& a': {
            fontSize: '1.5rem',
            marginLeft: theme.spacing(4),
            textDecoration: 'none',
            color: theme.palette.common.white,
        },
    },
}));

const Header = () => {
    const classes = useStyles();

    return (
        <header className={classes.header}>
            <h1 className={classes.title}>MeetMee</h1>
            <nav className={classes.nav}>
                <a>Connect</a>
                <a>With</a>
                <a>Random</a>
                <a>Friends  .  .  .</a>
            </nav>
        </header>
    );
};

export default Header;
