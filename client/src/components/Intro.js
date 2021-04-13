import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomButton from './CustomButton';
import { BrowserRouter as Router } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "block",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: "Nunito"
    }
}));

/**
 * Responsible for the short portion below the navbar on landing page
 */

export default function Intro(){
    const classes = useStyles();
    return (
        <Router>
            <div className={classes.root}>
                <h1>Welcome to Ace Activity</h1>
                <h2>Begin by adding activities throughout the day to reflect on later.</h2>
                <CustomButton props={{title: "Register", href:"/register"}}/>
            </div>
        </Router>
    )
}