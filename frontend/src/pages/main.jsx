import React, { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Button, Grid, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import '@fontsource/comfortaa';

const Main = ({ user, api }) => {
    const { id } = useParams();
    console.log('main');

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

    const [stateLoginInfo, setStateLoginInfo] = useState({
        userEmail: null,
        userPassword: null,
    });

    const handleChange = (prop) => (event) => {
        // console.log(`${prop}의 값을 ${event.target.value}로 변경`);
        setStateLoginInfo({ ...stateLoginInfo, [prop]: event.target.value });
    };

    const [loadingEmailInputNextButton, setLoadingEmailInputNextButton] = useState(false);
    const onClickEmailInputNextButton = async () => {

        //1. 로딩상태로 변경
        setLoadingEmailInputNextButton(true);

        //2. 이메일 조회 실행
        console.log(api);
        const result = await api.run('/user/getUserInfo', 'post', { userEmail: stateLoginInfo.userEmail });
        console.log(result);
    }

    return (
        <Grid container justifyContent="center" style={{ height: "calc(100% - 43px)" }}>
            <Grid item md={4} sm={6} xs={12} style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ padding: '0em', height: "100%", width: "340px" }}>
                    <div style={{ marginTop: "50%" }}>
                        <div style={{ fontSize: '1.5rem', fontFamily: 'comfortaa', textAlign: "center", marginBottom: "0.5em" }}>회원가입 / 로그인</div>
                        <FormControl sx={{ width: '100%' }} variant="outlined" required>
                            <InputLabel htmlFor="email-input">이메일</InputLabel>
                            <OutlinedInput
                                label="이메일"
                                id="email-input"
                                // type={values.showPassword ? 'text' : 'password'}
                                // value={values.password}
                                onChange={handleChange('userEmail')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <LoadingButton
                                            loading={loadingEmailInputNextButton}
                                            onClick={onClickEmailInputNextButton}
                                            style={{ minWidth: "unset" }}
                                            disabled={!stateLoginInfo.userEmail}
                                        >
                                            <ArrowCircleRightOutlinedIcon />

                                        </LoadingButton>
                                        {/* <IconButton
                                            aria-label="email input next button"
                                            onClick={onClickEmailInputNextButton}
                                            edge="end"
                                        >
                                            <ArrowCircleRightOutlinedIcon />
                                        </IconButton> */}
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <div style={{ marginTop: "1.5em" }}>
                            <p>✔️&nbsp;&nbsp;새로 접속해도 내용을 유지할 수 있습니다.</p>
                            <p>✔️&nbsp;&nbsp;다른 기기와 연동하여 사용할 수 있습니다.</p>
                        </div>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default Main;