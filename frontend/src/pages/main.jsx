import React, { useRef, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { Button, Grid, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import '@fontsource/comfortaa';
import { AlertDialog } from '../components/custom/dialog';
import { changeToLowerCase } from '../services/function';

const Main = ({ user, setUser, api }) => {
    // console.log('main');
    const { id } = useParams();
    // console.log(id);

    return (
        <div style={{ height: "100%" }}>
            <Header />
            {user.id ? <UserBody user={user} setUser={setUser} api={api} /> : <LoginBody user={user} setUser={setUser} api={api} />}
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

const LoginBody = ({ user, setUser, api }) => {

    //state
    const [stateLoginInfo, setStateLoginInfo] = useState({ userId: '', userPassword: '', });
    const [pageConfig, setPageConfig] = useState({ showPassword: false });
    const [alertDialog, setAlertDialog] = useState({ isOpen: false, title: '', description: '' });
    const [lodingStateLoginButton, setLodingStateLoginButton] = useState(false);

    //ref
    const userIdInputRef = useRef();
    const userPasswordInputRef = useRef();

    //fn
    const onClickShowPasswordButton = (e) => {
        // console.log('비밀번호 보임/숨김 토글버튼 클릭 시')
        e.preventDefault();
        setPageConfig({
            ...pageConfig,
            showPassword: !pageConfig.showPassword,
        });
    }

    const onChangeInput = (prop) => (event) => {
        // console.log(`${prop}의 값을 ${event.target.value}로 변경`);
        setStateLoginInfo({ ...stateLoginInfo, [prop]: event.target.value });
    };

    const onClickLoginButton = async () => {
        // console.log('로그인버튼 클릭 시');

        //1. 로딩상태로 변경
        setLodingStateLoginButton(true);
        setTimeout(async () => {

            //2. 로그인 실행
            const result = await api.post(`/user/login`, { userId: stateLoginInfo.userId, userPassword: stateLoginInfo.userPassword });
            console.log(result);
            setLodingStateLoginButton(false);
            switch (result.error) {
                case undefined: //성공
                    localStorage.setItem('access_token', result.token);
                    setUser(result.user);
                    localStorage.setItem('user', JSON.stringify(result.user));
                    break;
                case "invalid_user":
                    userIdInputRef.current.focus();
                    setAlertDialog({ isOpen: true, title: '회원정보를 찾을 수 없습니다.' });
                    break;
                case "not_match_password":
                    userPasswordInputRef.current.focus();
                    setAlertDialog({ isOpen: true, title: '비밀번호를 틀렸습니다.' });
                    break;
                default:
                    setAlertDialog({ isOpen: true, title: '잠시 후에 다시 시도해 주세요.' });
            }
        }, 1000);
    }

    return (
        <Grid container justifyContent="center" style={{ height: "calc(100% - 43px)" }}>
            <Grid item md={4} sm={6} xs={12} style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ padding: '0em', height: "100%", width: "340px" }}>
                    <div style={{ marginTop: "0%" }}>
                        <h2 style={{ textAlign: "center" }}>로그인</h2>
                        <FormControl sx={{ width: '100%', marginBottom: "1em" }} variant="outlined" required>
                            <InputLabel htmlFor="userId-input">아이디</InputLabel>
                            <OutlinedInput
                                label="아이디"
                                id="userId-input"
                                value={stateLoginInfo.userId}
                                inputRef={userIdInputRef}
                                onChange={onChangeInput('userId')}
                            />
                        </FormControl>
                        <FormControl sx={{ width: '100%', marginBottom: "1em" }} variant="outlined" required>
                            <InputLabel htmlFor="password-input">비밀번호</InputLabel>
                            <OutlinedInput
                                label="비밀번호"
                                id="password-input"
                                type={pageConfig.showPassword ? 'text' : 'password'}
                                value={stateLoginInfo.userPassword}
                                onChange={onChangeInput('userPassword')}
                                inputRef={userPasswordInputRef}
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
                            style={{ width: '100%' }}
                        >로그인</LoadingButton>
                        <div style={{ marginTop: "1.5em" }}>
                            <JoinBody user={user} api={api} />
                        </div>
                    </div>
                </div>
                <AlertDialog alertDialog={alertDialog} setAlertDialog={setAlertDialog} />
            </Grid>
        </Grid>
    )
}

const JoinBody = ({ user, api }) => {

    //state
    const [pageConfig, setPageConfig] = useState({ showPassword: false });
    const [joinDialogOpenState, setJoinDialogOpenState] = useState(false);
    const stateJoinInfoObj = { userId: '', userPassword: '', userRePassword: '' }
    const [stateJoinInfo, setStateJoinInfo] = useState(stateJoinInfoObj);
    const [lodingStateJoinButton, setLodingStateJoinButton] = useState(false);
    const [alertDialog, setAlertDialog] = useState({ isOpen: false, title: '', description: '' });

    //ref
    const userIdInputRef = useRef();
    const userPasswordInputRef = useRef();
    const userRePasswordInputRef = useRef();

    //fn
    const onClickJoinDialogOpenButton = () => {
        //console.log('회원가입 진행');
        setJoinDialogOpenState(true);
    };

    const onClickJoinDialogCloseButton = () => {
        //console.log('회원가입 모달 닫기');
        setJoinDialogOpenState(false);
        initStateJoinInfo();
    };

    const initStateJoinInfo = () => {
        //console.log('회원가입 정보 초기화');
        setStateJoinInfo(stateJoinInfoObj);
    }

    const onChangeInput = (prop) => (event) => {
        // console.log(`${prop}의 값을 ${event.target.value}로 변경`);
        setStateJoinInfo({ ...stateJoinInfo, [prop]: event.target.value });
    };

    const onBlurUserIdInput = (e) => {
        // console.log('아이디는 소문자로 변경');
        setStateJoinInfo({ ...stateJoinInfo, userId: changeToLowerCase(e.target.value) });
    }

    const onClickShowPasswordButton = (e) => {
        // console.log('비밀번호 보임/숨김 토글버튼 클릭 시')
        e.preventDefault();
        setPageConfig({
            ...pageConfig,
            showPassword: !pageConfig.showPassword,
        });
    }

    const onClickJoinButton = async () => {
        // console.log('회원가입 창 저장 버튼 클릭 시');

        //1. 로딩상태로 변경
        setLodingStateJoinButton(true);
        setTimeout(async () => {

            if (stateJoinInfo.userPassword !== stateJoinInfo.userRePassword) {
                // console.log('비밀번호가 다른 경우');

                userRePasswordInputRef.current.focus();
                setAlertDialog({ isOpen: true, title: '비밀번호를 동일하게 입력해 주세요.' });

            } else {

                //2. 회원가입 실행
                const result = await api.post(`/user`, { userId: stateJoinInfo.userId, userPassword: stateJoinInfo.userPassword });
                // console.log(result);
                switch (result.error) {
                    case undefined: //성공
                        setAlertDialog({ isOpen: true, title: '회원가입 완료' });
                        onClickJoinDialogCloseButton();
                        break;
                    case "exist":
                        userIdInputRef.current.focus();
                        setAlertDialog({ isOpen: true, title: '이미 존재하는 아이디입니다.' });
                        break;
                    case "check_id":
                        userIdInputRef.current.focus();
                        setAlertDialog({ isOpen: true, title: '아이디를 다시 입력해 주세요.', description: '특수문자를 제외하고 6~30자리로 설정하실 수 있습니다.' });
                        break;
                    case "check_password":
                        userPasswordInputRef.current.focus();
                        setAlertDialog({ isOpen: true, title: '비밀번호를 다시 입력해 주세요.', description: '영문자+숫자 조합으로 6~30자리로 설정하실 수 있습니다.' });
                        break;
                    case "ban_keyword":
                        userIdInputRef.current.focus();
                        setAlertDialog({ isOpen: true, title: '이미 존재하는 아이디입니다.' });
                        break;
                    default:
                        setAlertDialog({ isOpen: true, title: '잠시 후에 다시 시도해 주세요.' });
                }
            }

            setLodingStateJoinButton(false);
        }, 1000);
    }

    return (
        <>
            <h3>회원가입 시</h3>
            <p>✔️&nbsp;&nbsp;새로 접속해도 내용을 유지할 수 있습니다.</p>
            <p>✔️&nbsp;&nbsp;다른 기기와 연동하여 사용할 수 있습니다.</p>
            <Button
                onClick={onClickJoinDialogOpenButton}
                variant='outlined'
                size="large"
                style={{ width: '100%' }}
            >회원가입</Button>
            <Dialog
                fullScreen={isMobile}
                open={joinDialogOpenState}
                maxWidth="xs"
                onClose={onClickJoinDialogCloseButton}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"회원가입"}
                </DialogTitle>
                <DialogContent>
                    <FormControl sx={{ width: '100%', marginBottom: "1em", marginTop: "0.5em" }} variant="outlined" required>
                        <InputLabel htmlFor="userId-input">아이디</InputLabel>
                        <OutlinedInput
                            label="아이디"
                            autoComplete="off"
                            id="userId-input"
                            inputRef={userIdInputRef}
                            value={stateJoinInfo.userId}
                            onChange={onChangeInput('userId')}
                            onBlur={onBlurUserIdInput}
                        />
                    </FormControl>
                    <FormControl sx={{ width: '100%', marginBottom: "1em" }} variant="outlined" required>
                        <InputLabel htmlFor="password-input">비밀번호</InputLabel>
                        <OutlinedInput
                            label="비밀번호"
                            id="userPassword-input"
                            type={pageConfig.showPassword ? 'text' : 'password'}
                            value={stateJoinInfo.userPassword}
                            onChange={onChangeInput('userPassword')}
                            inputRef={userPasswordInputRef}
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
                    <FormControl sx={{ width: '100%', marginBottom: "1em" }} variant="outlined" required>
                        <InputLabel htmlFor="password-input">비밀번호 재입력</InputLabel>
                        <OutlinedInput
                            label="비밀번호 재입력"
                            id="userRePassword-input"
                            type={pageConfig.showPassword ? 'text' : 'password'}
                            value={stateJoinInfo.userRePassword}
                            onChange={onChangeInput('userRePassword')}
                            inputRef={userRePasswordInputRef}
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
                        loading={lodingStateJoinButton}
                        onClick={onClickJoinButton}
                        size="large"
                        style={{ width: '100%' }}
                    >완료</LoadingButton>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClickJoinDialogCloseButton}>취소</Button>
                </DialogActions>
            </Dialog>
            <AlertDialog alertDialog={alertDialog} setAlertDialog={setAlertDialog} />
        </>
    )
}

const UserBody = ({ user, setUser, api }) => {

    return (
        <>
            <Button
                // onClick={}
            >로그아웃</Button>
        </>
    );
}

export default Main;