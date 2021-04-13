import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';


function Notes({ activity }){
    return (
        <div styles={{ width:"100%", position: "absolute"}}>
            <Paper style={{height: "505px", width: "420px"}}>
                <Typography>
                    {activity.notes}
                </Typography>
            </Paper>

        </div>
    )
}

export default Notes;