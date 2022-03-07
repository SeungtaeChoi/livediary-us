import React from 'react';
import Tooltip from '@mui/material/Tooltip';

const DevOnly = ({user, children}) => {
    return (
        <Tooltip title="개발자만 보임" arrow>
            {user.auth === 'developer' && children}
        </Tooltip>
    )
}

export default DevOnly;