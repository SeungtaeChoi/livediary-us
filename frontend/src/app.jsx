import './app.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout';
import Main from './pages/main';
import Schedule from './pages/schedule';
import Search from './pages/search';
import Task from './pages/task';

const App = () => {

  const user = {
    id : '',
    auth : ''
  }

  return (
    <Routes>
      <Route element={<Layout user={user} />}>
        <Route path="/" element={<Main user={user}/>} />
        <Route path="/:userId" element={<Main user={user}/>} />
        <Route path="/:userId/schedule" element={<Schedule user={user}/>} />
        <Route path="/:userId/schedule/:scheduleId" element={<Schedule user={user}/>} />
        <Route path="/:userId/search" element={<Search user={user} />} />
        <Route path="/:userId/search/:searchString" element={<Search user={user}/>} />
        <Route path="/:userId/task" element={<Task user={user}/>} />
        <Route path="/:userId/task/:taskId" element={<Task user={user}/>} />
      </Route>
    </Routes>
  )
};

export default App;

/*
  메인페이지
    로그인 관련 / 개인 통계
  오늘
    진행중인 일 
  일정
 */