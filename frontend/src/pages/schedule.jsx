import React from 'react';
import { Layout, LayoutCenter } from '../layout';
import { useParams } from 'react-router-dom';

const Schedule = (props) => {
    console.log(props);

    const { userId } = useParams();
    console.log('userId', userId);

    return (
        <Layout>
            <LayoutCenter>
                <div>search</div>
            </LayoutCenter>
        </Layout >
    )
}

export default Schedule;