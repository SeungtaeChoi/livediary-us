import React from 'react';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

const NotFound = (props) => {
    return (
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", height:"50vh"}}>
            <NotInterestedIcon style={{fontSize:"7rem", marginBottom:"0.5em"}}/>
            <div style={{fontSize:"2rem"}}>페이지를 찾을 수 없습니다.</div>
        </div>
    )
}

export default NotFound;