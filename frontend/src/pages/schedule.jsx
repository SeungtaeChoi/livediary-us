import React from 'react';
import { useParams } from 'react-router-dom';

const Schedule = ({user}) => {

    console.log('user.id', user.id);
    
    const { userId, scheduleId } = useParams();
    console.log('userId', userId);
    console.log('scheduleId', scheduleId);

    return (
        <div>Schedule page</div>
    )
}

export default Schedule;