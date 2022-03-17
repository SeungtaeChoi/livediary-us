import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './app.css';
import Main from './pages/main';
import Schedule from './pages/schedule';
import Search from './pages/search';
import Task from './pages/task';
import Verifing from './components/verifing/verifing';
import Now from './pages/now';

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
                <>
                    <Route path="/" element={<Main user={user} setUser={setUser} userInitObj={userInitObj} api={api} />} />
                    <Route path="/schedule" element={<Schedule user={user} api={api} />} />
                    <Route path="/now" element={<Now user={user} api={api} />} />
                    <Route path="/search" element={<Search user={user} api={api} />} />
                    <Route path="/search/:searchString" element={<Search user={user} api={api} />} />
                    <Route path="/task" element={<Task user={user} api={api} />} />
                    <Route path="/task/:taskId" element={<Task user={user} api={api} />} />
                </>
                :
                <Route path="*" element={<Verifing api={api} setVerify={setVerify} />} />
            }
        </Routes>
    )
};

export default App;