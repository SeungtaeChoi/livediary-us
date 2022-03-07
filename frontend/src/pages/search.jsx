import React from 'react';
import { useParams } from 'react-router-dom';

const Search = ({user}) => {

    console.log('user.id', user.id);
    
    const { userId, searchString } = useParams();
    console.log('userId', userId);
    console.log('searchString', searchString);

    return (
        <div>Search page</div>
    )
}

export default Search;