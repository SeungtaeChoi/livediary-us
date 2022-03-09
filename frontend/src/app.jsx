import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './app.css';
import Layout from './layout';
import Main from './pages/main';
import Schedule from './pages/schedule';
import Search from './pages/search';
import Task from './pages/task';

const App = ({ storage, api }) => {
  // console.log(api);

  const userInitObj = {
    id: null,
    role: null,
  };
  
  const [user, setUser] = useState(userInitObj);

  return (
    <Routes>
      <Route element={<Layout user={user} api={api} />}>
        <Route path="/" element={<Main user={user} api={api} />} />
        <Route path="/:userId/schedule" element={<Schedule user={user} api={api} />} />
        <Route path="/:userId/schedule/:scheduleId" element={<Schedule user={user} api={api} />} />
        <Route path="/:userId/search" element={<Search user={user} api={api}  />} />
        <Route path="/:userId/search/:searchString" element={<Search user={user} api={api} />} />
        <Route path="/:userId/task" element={<Task user={user} api={api} />} />
        <Route path="/:userId/task/:taskId" element={<Task user={user} api={api} />} />
      </Route>
    </Routes>
  )
};

export default App;