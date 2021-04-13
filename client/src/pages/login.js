import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';
import Typography from "@material-ui/core/Typography";
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions/userActions';
import  CircularProgress from '@material-ui/core/CircularProgress';


const styles = {
    paperStyle: {
        padding: 20,
        height: "500px",
        width: 280,
        margin: "20px auto"
        },
    text: {
        color: "black",
        textDecoration: "none",
        fontFamily: "Nunito",
        fontWeight: "300"
    },
    inputRoot: {
        fontFamily: "Nunito"
    },
    progress: {
        position: 'absolute',
    },
    buttonStyle: {
        position: "relative",
        background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
        fontFamily: "Nunito",
    },
    errorText: {
        color: "red",
        fontFamily: "Nunito",
        fontSize: 17
    }
}

/*
Handles the login page styling and authenticating the user
*/
class login extends Component {
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    };

    handleChange = (event) => this.setState({[event.target.name]: event.target.value});
    
    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }; 
        this.props.userLogin(userData, this.props.history); 
       };

    render(){
        const { classes, UI: { loading } } = this.props;
        return (
            <Grid container>
                <Paper 
                elevation={10} 
                className={classes.paperStyle}>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <Grid item align="center">
                            <Avatar 
                            style={{background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%"}}>
                                <LockIcon/>
                            </Avatar>
                            <h2>Sign In</h2>
                            {this.props.UI.errors && (
                            <Typography 
                            variant="body2" 
                            className={classes.errorText}>
                               {this.props.UI.errors.general}
                               {this.props.UI.errors.email}
                            </Typography>
                            )}
                        </Grid>
                        <TextField 
                        name="email" type ="email" label="Email" variant="outlined" size="small" margin="dense"
                        fullWidth
                        value={this.state.email} 
                        onChange={this.handleChange}
                        InputProps={{classes: { root: classes.inputRoot }}} 
                        InputLabelProps={{ classes: { root: classes.inputRoot }}}/>
                        <TextField 
                        name="password" type ="password" label="Password" variant="outlined" size="small" margin="dense"
                        fullWidth
                        value={this.state.password} 
                        onChange={this.handleChange}
                        InputLabelProps={{ classes: { root: classes.inputRoot }}}/> 
                        <Box m={2} pt={3}></Box> 
                        <Grid item align="center">
                            <Button 
                            type="submit" 
                            className={classes.buttonStyle} 
                            disabled={loading} 
                            onClick={this.handleSubmit}>
                                Login
                            {loading && (<CircularProgress className={classes.progress}/>)}
                            </Button>
                        </Grid>
                        <Box m={2} pt={3}></Box>
                        <Grid item align="center">
                            <Typography>
                                <MuiLink href="/register" underline="none" className={classes.text}>
                                    Don't have an account? Create one!
                                </MuiLink>
                            </Typography> 
                        </Grid> 
                    </form>
                </Paper>
            </Grid>
        )
    }
};

login.propTypes = {
    classes: PropTypes.object.isRequired,
    userLogin: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    userLogin
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));