import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appbar: {
        background: "white",
    },
    appbarWrapper: {
        width: "80%",
        height: "70px",
        margin: "0 auto"
    },
    text: {
        color: "black",
        textDecoration: "none",
        fontFamily: "Nunito"
    },
    position: {
        marginLeft: "auto"
    },
    title: {
        fontFamily: "Bebas Neue",
        fontSize: "40px",
        color: "black",
        flexGrow: "1"
    }
}));

/**
 * Responsible for displaying the navbar on the landing page
 */
export default function Header(){
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar 
            className={classes.appbar} 
            elevation={0}>
                <Toolbar 
                className={classes.appbarWrapper}>
                    <Typography 
                    className={classes.title}>
                        Ace Activity
                    </Typography>
                    <div className={classes.position}>
                        <Typography>
                            <MuiLink 
                            href="/login" 
                            underline="none" 
                            className={classes.text}>
                                Login
                            </MuiLink>
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}