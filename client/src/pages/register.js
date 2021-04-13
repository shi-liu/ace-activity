import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CustomButton from '../components/CustomButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';
import Typography from "@material-ui/core/Typography";
import { userRegister } from '../redux/actions/userActions';
import { connect } from 'react-redux';

const styles = {
    paperStyle: {
        padding: 20,
        height: "70vh",
        width: 280,
        margin: "20px auto"
    },
    text: {
        fontFamily: "Nunito",
        color: "black",
        fontWeight: 300
    }, 
    errorText: {
        color: "red",
        fontFamily: "Nunito",
        fontSize: 17
    }
}

class register extends Component {
    constructor(){
        super();
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            errors: {}
        };
    }

    handleChange = (event) => { this.setState({[event.target.name]: event.target.value})};
    
    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }; 
        this.props.userRegister(userData, this.props.history); 
    };

    render(){
        const { classes } = this.props;
        return (
            <Grid container>
                <Paper elevation={10} className={classes.paperStyle}>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <Grid item align="center">
                            <Avatar style={{background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%"}}><AccountCircleIcon/></Avatar>
                            <h2>Account Creation</h2>
                            {this.props.UI.errors && (
                            <Typography variant="body2" className={classes.errorText}>
                               {this.props.UI.errors.generic}
                            </Typography>
                            )}
                        </Grid>
                        <TextField 
                        name="firstName" type="text" label="First Name" variant="outlined" margin="dense" fullWidth
                        InputProps={{classes: {root: classes.text}}} InputLabelProps={{ classes: { root: classes.text }}}
                        value={this.state.firstName} onChange={this.handleChange}/>
                        <TextField 
                        name="lastName" type="text" label="Last Name" variant="outlined" margin="dense" fullWidth
                        InputProps={{classes: {root: classes.text}}} InputLabelProps={{ classes: { root: classes.text }}}
                        value={this.state.lastName} onChange={this.handleChange}/>
                        <TextField 
                        name="email" type="email" label="Email" variant="outlined" margin="dense" fullWidth
                        InputProps={{classes: {root: classes.text}}} InputLabelProps={{ classes: { root: classes.text }}}
                        value={this.state.email} onChange={this.handleChange}/>
                        <TextField 
                        name="password" type="password" label="Password" variant="outlined" margin="dense" fullWidth
                        InputLabelProps={{ classes: { root: classes.text }}}
                        value={this.state.password} onChange={this.handleChange}/>
                        <Box m={2} pt={3}></Box>
                        <Grid item align="center">
                            <CustomButton props={{title: "Create", type: "submit"}}/>
                        </Grid>
                        <Box m={2} pt={3}></Box>
                        <Grid item align="center">
                            <Typography>
                                <MuiLink 
                                href="/login" underline="none" className={classes.text}>
                                    Have an account? Sign in
                                </MuiLink>
                            </Typography> 
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        )
    }
};

register.propTypes = {
    classes: PropTypes.object,
    user: PropTypes.object,
    UI: PropTypes.object
}

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    userRegister
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(register));