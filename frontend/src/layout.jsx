import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Paper, BottomNavigation, BottomNavigationAction, Avatar, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SearchIcon from '@mui/icons-material/Search';
import { blue } from '@mui/material/colors';

const Layout = ({ user, api, children }) => {
    // console.log('layout');
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
            <main style={{ paddingBottom: "55px", height: "100%" }}>
                <Grid container justifyContent="center" style={{ height: "100%" }}>{children}</Grid>
            </main>
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

const LayoutLeft = ({ children }) => <Grid item md={4} sm={6} xs={12} style={{ height: "100%" }}>{children}</Grid>;
const LayoutCenter = ({ children }) => <Grid item md={4} sm={6} xs={12} style={{ backgroundColor: "#fff", width:"100%", height: "100%", paddingBottom:"2px" }}>{children}</Grid>;
const LayoutRight = ({ children }) => <Grid item md={4} sm={6} xs={12} style={{ height: "100%" }}>{children}</Grid>;

export { Layout, LayoutLeft, LayoutCenter, LayoutRight };