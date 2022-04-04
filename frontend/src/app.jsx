import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './app.css';
import Main from './pages/main';
import Search from './pages/search';
// import Task from './pages/task';
import Verifing from './components/verifing/verifing';
import Now from './pages/now';
import Common from './common';
import NotFound from './pages/notFound';

const App = ({ api }) => {

    // 배포 환경에서 console.log, console.warn 지우기
    if (process.env.NODE_ENV === "production" ) {
    // if (process.env.NODE_ENV === "production" || "development") {
        console.log = function no_console() { };
        console.warn = function no_console() { };
    }

    console.log('app.js');

    //state
    const storage_user = JSON.parse(localStorage.getItem('user'));
    const userInitObj = { id: storage_user ? storage_user.id : null };
    const [user, setUser] = useState(userInitObj);
    const [verify, setVerify] = useState(false);
    const [alertDialog, setAlertDialog] = useState({ isOpen: false, title: '', description: '', next: () => { } });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', description: '', ok: () => { }, cancel: () => { } });
    const [snackbar, setSnackbar] = useState({ isOpen: false, severity: 'success', message: '', vertical: 'top', horizontal: 'center' });

    return (
        <Routes>
            {verify ?
                <Route element={
                    <Common
                        alertDialog={alertDialog} setAlertDialog={setAlertDialog}
                        confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}
                        snackbar={snackbar} setSnackbar={setSnackbar}
                    />
                }>
                    <Route path="/" element={
                        <Main
                            user={user}
                            setUser={setUser}
                            userInitObj={userInitObj}
                            api={api}
                            setAlertDialog={setAlertDialog}
                        />
                    } />
                    <Route path="/now" element={
                        <Now
                            user={user}
                            api={api}
                            setAlertDialog={setAlertDialog}
                            setConfirmDialog={setConfirmDialog}
                            setSnackbar={setSnackbar}
                        />
                    } />
                    <Route path="/search" element={
                        <Search
                            user={user}
                            api={api}
                            alertDialog={alertDialog}
                            setAlertDialog={setAlertDialog}
                        />
                    } />
                    <Route path="/search/:searchString" element={
                        <Search
                            user={user}
                            api={api}
                            alertDialog={alertDialog}
                            setAlertDialog={setAlertDialog}
                        />
                    } />
                    <Route path="*" element={
                        <NotFound />
                    } />
                </Route>
                :
                <Route path="*" element={
                    <Verifing api={api} setVerify={setVerify} />
                } />
            }
        </Routes>
    )
};

export default App;