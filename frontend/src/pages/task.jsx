import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';

const Task = ({user}) => {

    console.log('user.id', user.id);
    
    const { userId, taskId } = useParams();
    console.log('userId', userId);
    console.log('taskId', taskId);

    return (
        <Grid container justifyContent="center" style={{height:"100%"}}>
            <Grid item md={4} sm={6} xs={12} style={{backgroundColor:"#fff", height:"100%"}}>
                <div>12321321321</div>
            </Grid>
        </Grid>
    )
}

export default Task;