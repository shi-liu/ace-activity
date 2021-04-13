import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 500,
        background: "rgba(0,0,0,0.5)",
        margin: "35px",
    },
    media: {
        height: 300
    },
    title: {
        fontWeight: "bold",
        fontSize: "2rem",
        color: "white",
        textAlign: "center",
        fontFamily: "Nunito"
    },
    description: {
        color: "#ddd",
        fontSize: "1rem",
        fontFamily: "Nunito"
    }
}));

/**
 * Initalizes the card media with the features properties
 */

export default function ImageCard({ feature }){
    const classes = useStyles();

    return (
        <Slide 
        in={true} 
        direction="right" 
        mountOnEnter unmountOnExit>
            <Card className={classes.root}>
                <CardMedia className={classes.media} 
                title={feature.title} 
                image={feature.picture}/>
                <CardContent>
                        <Typography className={classes.title}
                        gutterBottom 
                        variant="h5" 
                        component="h2">
                            {feature.title}
                        </Typography>
                        <Typography className={classes.description}
                        variant="body2" 
                        component="p">
                            {feature.description}
                        </Typography>
                </CardContent>
            </Card>
        </Slide>
    )
}