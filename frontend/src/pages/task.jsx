import React from 'react';
import { useParams } from 'react-router-dom';

const Task = ({user}) => {

    console.log('user.id', user.id);
    
    const { userId, taskId } = useParams();
    console.log('userId', userId);
    console.log('taskId', taskId);

    return (
        <div>Task page</div>
    )
}

export default Task;