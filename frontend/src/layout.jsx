import { memo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { Box, Paper, BottomNavigation, BottomNavigationAction, Avatar, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SearchIcon from '@mui/icons-material/Search';
import { blue } from '@mui/material/colors';

const Layout = memo(({ user, children }) => {
    console.log('layout');

    //게스트 설정
    let userId = 'guest';
    if (user.id) { userId = user.id; }

    return (
        <>
            <main style={{ paddingBottom: isMobile?"75px":"55px", height: "100%" }}>
                <Grid container justifyContent="center" style={{ height: "100%" }}>{children}</Grid>
            </main>
            <BottomNav userId={userId}/>
        </>
    );
});

const LayoutLeft = memo(({ children }) => {
    console.log('LayoutLeft');
    return (
        <Grid item md={4} sm={6} xs={12} style={{ width: "100%", height: "100%" }}>{children}</Grid>
    )
});
const LayoutCenter = memo(({ children }) => {
    console.log('LayoutCenter');
    return (
        <Grid item md={4} sm={6} xs={12} style={{ backgroundColor: "#fff", width: "100%", height: "100%", paddingBottom: "2px" }}>{children}</Grid>
    )
});
const LayoutRight = memo(({ children }) => {
    console.log('LayoutRight');
    return (
        <Grid item md={4} sm={6} xs={12} style={{ width: "100%", height: "100%" }}>{children}</Grid>
    )
});
const BottomNav = memo(({userId}) => {
    console.log('BottomNav');

    let navigate = useNavigate();
    let location = useLocation();

    //state
    const [bottomNavValue, setBottomNavValue] = useState(location.pathname);

    //fn
    const onClickBottomNavigation = (event, newValue) => {
        //console.log('하단 네비게이션 버튼 클릭 시');
        navigate(newValue);
        setBottomNavValue(newValue);
    }
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <Box style={{ marginBottom: isMobile?"20px":"0" }}>
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
                    <BottomNavigationAction value={`/now`} label="지금" icon={<PlayCircleIcon />} />
                    <BottomNavigationAction value={`/search`} label="검색" icon={<SearchIcon />} />
                </BottomNavigation>
            </Box>
        </Paper>
    )
});

export { Layout, LayoutLeft, LayoutCenter, LayoutRight };