import React from 'react';
import Navbar from './Navbar';
import InputForm from './InputForm';
import Grid from '@material-ui/core/Grid';
import Activities from './Activities';
import CustomButton from './CustomButton';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "91.3vh",
        overflowX: "hidden",
        overflowY: "hidden",
        backgroundColor: "rgb(39,37,37)"
    },
    mod: {
        position: "absolute",
        width: "250px",
        height: "500px",
        top: "40%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        outline: 0
    },
}));

/**
 * Responsible for displaying the home screen after authenticated.
 * As well as adding activities via modal
 */

export default function Dashboard(){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div className={classes.mod}>
            <InputForm/>
        </div>
    )


    return (
        <div className={classes.root}>
            <CssBaseline/>
            <Navbar/>
            <Grid container 
            style={{marginTop:"25px", marginBottom:"15px"}} 
            align="center" 
            justify="center">
                <CustomButton 
                props={{title:"Add Activity", onClick: handleOpen}}/>
                <Modal
                open={open}
                onClose={handleClose}>
                    {body}
                </Modal>
            </Grid>
            <Grid container 
            align="center" 
            justify="center" 
            direction="column">
                <Grid item container
                xs={12} 
                justify="center">
                    <Grid container item 
                    justify="center">
                        <Grid item>
                            <Activities/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}