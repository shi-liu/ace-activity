import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Intro from '../components/Intro';
import Features from '../components/Features';
import Header from '../components/Header';


const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "91vh",
        background: `url('${process.env.PUBLIC_URL}/homeBG.jpg')`,
        backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center"
    }
}));

/**
 * If the user is not logged in, this is the page shown
 */
export default function Landing() {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <CssBaseline/>
            <Header/>
            <Intro/>
            <Features/>
        </div>
    )
}