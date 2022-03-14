import React from 'react';
import { useParams } from 'react-router-dom';

const Schedule = ({ user, api }) => {

    const { userId } = useParams();
    console.log('userId', userId);

    return (
        <div>Schedule page</div>
    )
}

export default Schedule;