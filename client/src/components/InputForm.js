import React, { Component } from 'react';
import {  withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Paper from "@material-ui/core/Paper";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { connect } from "react-redux";
import  CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { postActivity, getActivities } from "../redux/actions/dataActions";

const styles = {
    paperStyle: {
        padding: 20,
        height: "500px",
        width: 250,
        margin: "20px auto"
    },
    avatarStyle: {
        backgroundColor: "#1bbd7e"
    },
    text: {
        color: "black",
        textDecoration: "none",
        fontFamily: "Nunito"
    },
    buttonStyle: {
        position: "relative",
        background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
        fontFamily: "Nunito",
    },
    progress: {
        position: 'absolute',
    },
    errorText: {
        color: "red",
        fontFamily: "Nunito",
        fontSize: 17
    }
};

/**
 * This is the modal that pops up after clicking "Add activity"
 * Handles all the textfield changes and submit
 * Automatically retrieves the data after submission
 */

class InputForm extends Component {
    constructor(){
        super();
        this.state = {
            activity: "",
            duration: "",
            notes: "",
            date: new Date(),
        }
        this.baseState = this.state;
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        const activity = {
            ...this.state
        };
        this.props.postActivity(activity);
        this.props.getActivities();
        this.setState(this.baseState);
    };
    render(){
        const { classes, UI: { loading } } = this.props;

        return (
            <Grid container 
            direction="column">
                <Paper 
                elevation={10} 
                className={classes.paperStyle}>
                    <Grid 
                    item 
                    align="center">
                    {this.props.UI.errors && (
                        <Typography variant="body2" className={classes.errorText}>
                            {this.props.UI.errors.data.activity}
                        </Typography>
                    )}
                    </Grid>
                    <TextField 
                    name="activity" 
                    onChange={this.handleChange} 
                    label="Activity" variant="outlined" size="small" margin="dense"
                    value={this.state.activity}  
                    inputProps={{ maxLength: 20 }}InputLabelProps={{ classes: { root: classes.text }}}></TextField>
                    <TextField 
                    name="duration" 
                    onChange={this.handleChange} 
                    label="Duration" variant="outlined" size="small" margin="dense"
                    value={this.state.duration} 
                    inputProps={{ maxLength: 4 }} InputLabelProps={{ classes: { root: classes.text }}}></TextField>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            InputLabelProps = {{style: {fontFamily: "Nunito"}}} inputProps={{style: {fontFamily: "Nunito"}}}
                            disableToolbar
                            variant="outlined"
                            format="MM/dd/yyyy"
                            margin="normal"
                            name="date"
                            label="Date Picker"
                            value={this.state.date}
                            onChange={(newDate) => {this.setState({date: (newDate)})}}/>
                    </MuiPickersUtilsProvider>
                    <TextField 
                    name="notes" 
                    onChange={this.handleChange} 
                    label="Notes" multiline rows={5}
                    variant="outlined" size="small" margin="dense"
                    value={this.state.notes} 
                    inputProps={{maxLength: 1000}} InputLabelProps={{ classes: { root: classes.inputRoot }}}/>
                    <Box padding={1}></Box>
                    <Grid item align="center">
                        <Button type="submit" className={classes.buttonStyle} onClick={this.handleSubmit}>
                            Done
                            {loading && (<CircularProgress className={classes.progress}/>)}
                        </Button>
                    </Grid>
                </Paper>
            </Grid> 
        )
    }
}

InputForm.propTypes = {
    classes: PropTypes.object,
    postActivity: PropTypes.func,
    getActivities: PropTypes.func,
    UI: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    postActivity,
    getActivities
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(InputForm));