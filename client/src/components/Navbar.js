import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { userLogout } from "../redux/actions/userActions";
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    appbar: {
        backgroundColor: "white"
    },
    appbarWrapper: {
        width: "100%",
        height: "70px",
        margin: "0 auto"
    },
    text: {
        color: "black",
        textDecoration: "none",
        fontFamily: "Nunito",
        fontWeight: 300,
        fontSize: 15
        
    },
    position: {
        display: "flex",
        alignItems: "center",
        marginLeft: "0 auto"
    },
    logoutBlock: {
        display: "flex",
        alignItems: "center",
        marginRight: "0 auto"
    },
    iconColor: {
        color: "black"
    }
}));

/**
 * Responsible for the navbar after the user logs in.
 * Shows the user first & last name
 * Allows user to log out
 */
function Navbar(props){
    const classes = useStyles();

    const handleLogout = () => props.userLogout();

    const firstName = "Test"
    const lastName = "V1"
        
    return (
        <AppBar className={classes.appbar} 
        elevation={0}>
            <Toolbar className={classes.appbarWrapper}>
                <Grid container 
                align="center" 
                direction="row" 
                justify="center" 
                className={classes.position}>
                    <Grid item 
                    align="center">
                    <IconButton>
                        <AccountCircleIcon className={classes.iconColor}/>
                    </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.text}>
                            {firstName} {lastName}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container 
                align="center" 
                justify="center" 
                className={classes.logoutBlock}>
                    <Grid item 
                    align="center">
                        <Typography 
                        className={classes.text}>
                            Logout
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={handleLogout}>
                            <ArrowRightAltIcon className={classes.iconColor}/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

Navbar.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

const mapActionsToProps = { userLogout }

export default connect(mapStateToProps, mapActionsToProps)(Navbar);