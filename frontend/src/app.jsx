import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './app.css';
import Layout from './layout';
import Main from './pages/main';
import Schedule from './pages/schedule';
import Search from './pages/search';
import Task from './pages/task';
import Verifing from './components/verifing/verifing';

const App = ({ api }) => {
    // console.log('app.js');

    //state
    const storage_user = JSON.parse(localStorage.getItem('user'));
    const userInitObj = { id: storage_user ? storage_user.id : null };
    const [user, setUser] = useState(userInitObj);
    const [verify, setVerify] = useState(false);

    return (
        <Routes>
            {verify ?
                <Route element={<Layout user={user} api={api} />}>
                    <Route path="/" element={<Main user={user} setUser={setUser} api={api} />} />
                    <Route path="/:userId/schedule" element={<Schedule user={user} api={api} />} />
                    <Route path="/:userId/schedule/:scheduleId" element={<Schedule user={user} api={api} />} />
                    <Route path="/:userId/search" element={<Search user={user} api={api} />} />
                    <Route path="/:userId/search/:searchString" element={<Search user={user} api={api} />} />
                    <Route path="/:userId/task" element={<Task user={user} api={api} />} />
                    <Route path="/:userId/task/:taskId" element={<Task user={user} api={api} />} />
                </Route>
                :
                <Route path="*" element={<Verifing api={api} setVerify={setVerify}/>} />
            }
        </Routes>
    )
};

export default App;