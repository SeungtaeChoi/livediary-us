import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Box, Paper, BottomNavigation, BottomNavigationAction, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SearchIcon from '@mui/icons-material/Search';
import { blue } from '@mui/material/colors';

const Layout = ({ user }) => {
    let navigate = useNavigate();
    let location = useLocation();

    //게스트 설정
    let userId = 'guest';
    if (user.id) { userId = user.id; }

    //state
    const [bottomNavValue, setBottomNavValue] = useState(location.pathname);

    //fn
    const onClickBottomNavigation = (event, newValue) => {
        //console.log('하단 네비게이션 버튼 클릭 시');
        navigate(newValue);
        setBottomNavValue(newValue);
    }

    return (
        <>
            <main style={{ paddingBottom: "55px", height:"calc(100% - 55px)" }}><Outlet /></main>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <Box>
                    <BottomNavigation
                        showLabels
                        value={bottomNavValue}
                        onChange={onClickBottomNavigation}
                    >
                        <BottomNavigationAction value={'/'} icon={
                            <>
                                {userId !== 'guest' ?
                                    <Avatar sx={{ width: 30, height: 30, bgcolor: blue[50], color: "#000" }} >
                                        {userId.substring(0, 2)}
                                    </Avatar>
                                    :
                                    <AccountCircleIcon />
                                }
                            </>
                        } />
                        <BottomNavigationAction value={`/search`} label="검색" icon={<SearchIcon />} />
                        <BottomNavigationAction value={`/now`} label="지금" icon={<PlayCircleIcon />} />
                        <BottomNavigationAction value={`/schedule`} label="일정" icon={<EventNoteIcon />} />
                        <BottomNavigationAction value={`/task`} label="할 일" icon={<ListAltIcon />} />
                    </BottomNavigation>
                </Box>
            </Paper>
        </>
    );
};

export default Layout;