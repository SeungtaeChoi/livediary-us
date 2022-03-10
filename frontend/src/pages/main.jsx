import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Button, Grid, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import '@fontsource/comfortaa';
import CustomAlertDialog from '../components/custom/customAlertDialog/customAlertDialog';

const Main = ({ user, api }) => {
    // console.log('main');
    const { id } = useParams();

    return (
        <div style={{ height: "100%" }}>
            <Header />
            {user.id ? <Outlet /> : <LoginBody user={user} api={api} />}
        </div>
    )
}

const Header = () => {
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: '0.5em', alignItems: "center" }}>
                <div style={{ fontSize: '1.5rem', fontFamily: 'comfortaa' }}>livediary.us</div>
            </div>
        </div>
    )
}

const LoginBody = ({ user, api }) => {

    const userIdInputRef = useRef();
    const userPwInputRef = useRef();

    const [pageConfig, setPageConfig] = useState({
        showPassword: false
    });

    const onClickShowPasswordButton = (e) => {
        // console.log('비밀번호 보임/숨김 토글버튼 클릭 시')
        e.preventDefault();
        setPageConfig({
            ...pageConfig,
            showPassword: !pageConfig.showPassword,
        });
    }

    const [stateLoginInfo, setStateLoginInfo] = useState({
        userId: '',
        userPassword: '',
    });

    const onChangeInput = (prop) => (event) => {
        // console.log(`${prop}의 값을 ${event.target.value}로 변경`);
        setStateLoginInfo({ ...stateLoginInfo, [prop]: event.target.value });
    };

    const [customAlertDialogOpenState, setCustomAlertDialogOpenState] = useState(false);

    const [lodingStateLoginButton, setLodingStateLoginButton] = useState(false);
    const onClickLoginButton = async () => {
        // console.log('로그인버튼 클릭 시');

        //1. 로딩상태로 변경
        setLodingStateLoginButton(true);
        setTimeout(async () => {

            //2. 로그인 실행
            const result = await api.post(`/user/login`, { userId: stateLoginInfo.userId, userPassword: stateLoginInfo.userPassword });
            alert(result.error);
            if (result.error === "invalid_user") { setCustomAlertDialogOpenState(true); }
            if (result) {
                setLodingStateLoginButton(false);
            }

        }, 500);
    }

    return (
        <Grid container justifyContent="center" style={{ height: "calc(100% - 43px)" }}>
            <Grid item md={4} sm={6} xs={12} style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ padding: '0em', height: "100%", width: "340px" }}>
                    <div style={{ marginTop: "0%" }}>
                        <h2 style={{ textAlign: "center" }}>로그인</h2>
                        <FormControl sx={{ width: '100%', marginBottom: "0.5em" }} variant="outlined" required>
                            <InputLabel htmlFor="userId-input">아이디</InputLabel>
                            <OutlinedInput
                                label="아이디"
                                id="userId-input"
                                value={stateLoginInfo.userId}
                                inputRef={userIdInputRef}
                                onChange={onChangeInput('userId')}
                            />
                        </FormControl>
                        <FormControl sx={{ width: '100%', marginBottom: "0.5em" }} variant="outlined" required>
                            <InputLabel htmlFor="password-input">비밀번호</InputLabel>
                            <OutlinedInput
                                label="비밀번호"
                                id="password-input"
                                type={pageConfig.showPassword ? 'text' : 'password'}
                                value={stateLoginInfo.userPassword}
                                onChange={onChangeInput('userPassword')}
                                inputRef={userPwInputRef}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="비밀번호 보임 여부"
                                            onClick={onClickShowPasswordButton}
                                            edge="end"
                                        >
                                            {pageConfig.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <LoadingButton
                            variant='contained'
                            loading={lodingStateLoginButton}
                            onClick={onClickLoginButton}
                            size="large"
                            // style={{ minWidth: "unset", display:enterState&&'none' }}
                            disabled={!stateLoginInfo.userId || !stateLoginInfo.userPassword}
                            style={{ width: '100%' }}
                        >로그인</LoadingButton>
                        <div style={{ marginTop: "1.5em" }}>
                            <h3>회원가입 시</h3>
                            <p>✔️&nbsp;&nbsp;새로 접속해도 내용을 유지할 수 있습니다.</p>
                            <p>✔️&nbsp;&nbsp;다른 기기와 연동하여 사용할 수 있습니다.</p>
                            <Button variant='outlined' style={{ width: '100%' }}>회원가입</Button>
                        </div>
                        <CustomAlertDialog
                            openState={customAlertDialogOpenState}
                            setOpenState={setCustomAlertDialogOpenState}
                            title="회원정보를 찾을 수 없습니다."
                            description="다시 확인 후 로그인해 주세요."
                        />
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default Main;