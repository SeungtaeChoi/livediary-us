import React, { useState, useEffect, useCallback } from 'react';
import { AlertDialog } from '../custom/dialog';

const Verifing = ({ api, setVerify }) => {

    //state
    const [alertDialog, setAlertDialog] = useState({ isOpen: false, title: '', description: '' });

    //fn
    const verifingAction = useCallback(async () => {
        const storage_user = JSON.parse(localStorage.getItem('user'));
        const userInitObj = { id: storage_user ? storage_user.id : null };
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
            const userId = userInitObj.id;
            const result = await api.post(`/user/verify`, { userId: userId, accessToken: access_token });
            switch (result.error) {
                case undefined: //성공
                    setVerify(true);
                    break;
                case "expire":
                    setAlertDialog({
                        isOpen: true, title: '로그인 정보가 만료되었습니다.', description: '다시 로그인해 주세요.', next: () => {
                            localStorage.removeItem('user');
                            localStorage.removeItem('access_token');
                            window.location.href = '/';
                        }
                    });
                    break;
                case "unauthorized":
                    setAlertDialog({
                        isOpen: true, title: '사용자가 변경되었습니다.', description: '다시 로그인해 주세요.', next: () => {
                            localStorage.removeItem('user');
                            localStorage.removeItem('access_token');
                            window.location.href = '/';
                        }
                    });
                    break;
                default:
                    setAlertDialog({ isOpen: true, title: '잠시 후에 다시 시도해 주세요.' });
            }
        } else {
            setVerify(true);
        }
    }, [api, setVerify]);

    useEffect(() => {
        verifingAction();
    }, [verifingAction]);

    return (
        <>
            인증 중...
            <AlertDialog alertDialog={alertDialog} setAlertDialog={setAlertDialog} />
        </>
    )
}

export default Verifing;