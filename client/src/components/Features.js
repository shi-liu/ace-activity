import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageCard from './ImageCard';
import features from '../components/static/features';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column"
        }
    }
}));

/**
 * Responsible for displaying the image cards on the landing screen.
 */

export default function Features(){
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <ImageCard feature={features[0]}/>
            <ImageCard feature={features[1]}/>
        </div>
    )
}