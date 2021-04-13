import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const StyledButton = withStyles({
    root: {
        background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
        fontFamily: "Nunito"
    },
    label: {
        textTransform: "capitalize"
    }
})(Button);

export default function CustomButton({props}){
    return <StyledButton disabled={props.disable} onClick={props.onClick} href={props.href} type={props.type}>{props.title}</StyledButton>; 
}