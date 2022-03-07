import './layout.css';
import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { isBrowser } from 'react-device-detect';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SearchIcon from '@mui/icons-material/Search';
import moment from 'moment';

const Layout = ({ user }) => {
  let navigate = useNavigate();
  let location = useLocation();

  //게스트 설정
  let userId = 'guest';
  if(user.id){ userId = user.id; }

  const today = moment().format('YYYY-MM-DD'); //오늘

  const [bottomNavValue, setBottomNavValue] = useState(location.pathname);
  // const [drawerState, setDrawerState] = useState(false);

  const changeBottomNavValue = (event, newValue) => {
    navigate(newValue);

    setBottomNavValue(newValue);
  }

  return (
    <div style={{ height: '100vh' }}>

      <main className={isBrowser ? 'main_browser' : 'main_mobile'}><Outlet /></main>

      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <Box>
          <BottomNavigation
            showLabels
            value={bottomNavValue}
            onChange={changeBottomNavValue}
          >
            <BottomNavigationAction value={'/'} icon={
              <>
                {userId === 'guest' ?
                  <Avatar sx={{ width: 24, height: 24 }}>
                    <AccountCircleIcon />
                  </Avatar>
                  :
                  <AccountCircleIcon />
                }
              </>
            } />
            <BottomNavigationAction value={`/${userId}/search`} label="검색" icon={<SearchIcon />} />
            <BottomNavigationAction value={`/${userId}/schedule/${today}`} label="오늘" icon={<PlayCircleIcon />} />
            <BottomNavigationAction value={`/${userId}/schedule`} label="일정" icon={<EventNoteIcon />} />
            <BottomNavigationAction value={`/${userId}/task`} label="목록" icon={<ListAltIcon />} />
          </BottomNavigation>
        </Box>
      </Paper>
    </div>
  );
};

export default Layout;