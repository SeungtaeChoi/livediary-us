import React, { useEffect, useState, useRef, memo, useCallback } from 'react';
import { isBrowser } from 'react-device-detect';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, LayoutCenter } from '../layout';
import { Dialog, Box, TextField, InputAdornment, DialogContent, DialogActions, Button, Alert, IconButton, Tooltip } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faSquare, faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import DeleteIcon from '@mui/icons-material/Delete';
import koLocale from 'date-fns/locale/ko';
import moment from 'moment';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import 'moment/locale/ko';
import LinearProgress from '@mui/material/LinearProgress';

const Now = ({ user, api, setAlertDialog, setConfirmDialog, setSnackbar }) => {
    console.log('now');

    /* todo : 할 일
        {
            id: 'r1',
            user_id: '',
            title: '헬스',
            date:'2022-03-17',
            time:'',
            during:'',
            checked: false
            time_fix: false
            state: 'ok'
        }
    */
    const today = moment().format('YYYY-MM-DD');
    const [todos, setTodos] = useState([]);
    const [todosOrder, setTodosOrder] = useState([]);
    const location = useLocation();
    const dayText = moment().locale("ko").format('ddd');
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const seletedTodoId = params.get('p'); //선택된 todo id
    const [seletedTodoItem, setSeletedTodoItem] = useState(undefined); //선택된 todo 정보
    const [nowTime, setNowTime] = useState();

    //fn
    useEffect(() => {
        if (seletedTodoId) {
            todos.forEach(i => {
                console.log('상세보기 반복', seletedTodoId);
                if (i.id === seletedTodoId) {
                    setSeletedTodoItem(i);
                }
            });
        } else {
            setSeletedTodoItem(undefined);
        }
    }, [location, seletedTodoId, todos]);

    const onChangeTodos = useCallback(newTodos => {
        console.log('할 일 변경', newTodos);
        let result = true;

        calcTodos(newTodos);

        return result;
    }, []);

    const onInsertTodo = useCallback( async (newTodo) => {
        console.log('할 일 등록', newTodo);
        let result = false;

        const newTodos = [...todos];

        //db insert
        const requestData = newTodo;
        requestData['request_id'] = user.id;
        const res = await api.post(`/todo`, requestData);
        switch(res.error){
            case undefined: //성공
                result = true;
                newTodos.push(newTodo);
                calcTodos(newTodos);
            break;
            default:
                setAlertDialog({ isOpen: true, title: '잠시 후에 다시 시도해 주세요.' });
        }

        return result;
    }, [todos, api, setAlertDialog, user.id]);

    const onDeleteTodo = useCallback(seletedTodoItem => {
        console.log('할 일 삭제', seletedTodoItem);
        let result = true;

        const index = todos.findIndex(x => x.id === seletedTodoItem.id);
        const newTodos = [...todos];
        newTodos.splice(index, 1);

        calcTodos(newTodos);

        return result;
    }, [todos]);

    const calcTodos = todos => {
        console.log('할 일 셋팅 (시간 자동 계산)', todos);
        let result = true;

        // 변수
        let tempTime = null; // 시간 설정값 저장

        // 거꾸로 배열하고 시간 계산하기
        let reversTodos = [...todos].reverse();
        reversTodos.forEach(todo => {
            if (todo.time.indexOf(":") !== -1 && todo.time_fix) {
                // 정해진 시간 O
                // tempTime 변수에 저장
                tempTime = moment(`${todo.date} ${todo.time}`, 'YYYYMMDDHHmmss');
            } else {
                // 정해진 시간 X
                // 계산 대상이 있고, 소요시간이 있으면
                todo.time = '';
                if (tempTime !== null && Number(todo.during) > 0) {
                    tempTime = tempTime.subtract(Number(todo.during), 'minutes');
                    todo.time = tempTime.format('HH:mm');
                }
            }
        });

        setTodos(todos);

        return result;
    }

    const onPopupTodo = useCallback(todo => {
        console.log('할 일 팝업으로 보기', todo);

        navigate(`/now?p=${todo.id}`);
    }, [navigate]);

    const getClock = (mode) => {
        let temp = new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '');
        if (mode === 'time') {
            temp = temp.split(' ')[1];
        }
        return temp;
    }

    useEffect(() => {
        setInterval(() => {
            setNowTime(getClock('time'));
        }, 1000);
    }, []);

    return (
        <Layout user={user} api={api}>
            {/* <LayoutLeft>
                <Box style={{ width: "100%", height: "100%", backgroundColor: "#ffffff", padding: "1.5em" }}>
                    <TimerArea
                        todos={todos}
                        onChangeTodos={onChangeTodos}
                        today={today}
                        nowTime={nowTime}
                    />
                </Box>
            </LayoutLeft> */}
            <LayoutCenter>
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                    <Box style={{ padding: "1.5em" }}>
                        <DateTimeArea
                            today={today}
                            dayText={dayText}
                            nowTime={nowTime}
                        />
                        <TodoListArea
                            todos={todos}
                            today={today}
                            nowTime={nowTime}
                            onChangeTodos={onChangeTodos}
                            onPopupTodo={onPopupTodo}
                        />
                        <TodoInsertArea
                            user={user}
                            onInsertTodo={onInsertTodo}
                            setSnackbar={setSnackbar}
                            today={today}
                        />
                    </Box>
                    {seletedTodoId && seletedTodoItem && <DetailDialog todos={todos} seletedTodoItem={seletedTodoItem} onChangeTodos={onChangeTodos} setConfirmDialog={setConfirmDialog} onDeleteTodo={onDeleteTodo} />}
                </div>
            </LayoutCenter>
            {/* <LayoutRight>
                <div>커뮤니티</div>
            </LayoutRight> */}
        </Layout >
    )
}

const DateTimeArea = ({ today, dayText, nowTime }) => {
    console.log("DateTimeArea : 현재 시간 표시 영역");

    const nowTimeRef = useRef();

    useEffect(() => {
        if (nowTime) {
            nowTimeRef.current.innerText = nowTime;
        }
    }, [nowTime]);

    return (
        <h3 style={{ marginBottom: "0.2em" }}>
            {today}
            ({dayText})&nbsp;
            <span ref={nowTimeRef}></span>
        </h3>
    );
}

const TodoListArea = memo(({ todos, today, nowTime, onChangeTodos, onPopupTodo }) => {
    // console.log(todos, onChangeTodos, onPopupTodo);
    console.log('할 일 리스트 영역');

    const onDragEnd = result => {
        console.log('드래그 & 드랍 종료');

        if (!result.destination) return;

        const newTodos = [...todos];
        const [reorderedItem] = newTodos.splice(result.source.index, 1);
        newTodos.splice(result.destination.index, 0, reorderedItem);

        onChangeTodos(newTodos);
    }

    const onClickItemCheck = useCallback((e, clickedItem) => {
        console.log('아이템 클릭', clickedItem);

        e.stopPropagation();

        const newTodos = [...todos];
        newTodos.forEach(i => { if (i.id === clickedItem.id) { i.check = !clickedItem.check; } })

        onChangeTodos(newTodos);
    }, [todos, onChangeTodos]);

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="todos">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} style={{ padding: "0.5em 0 0 0" }}>
                            {todos.map((item, index) => (
                                <TodoListItem key={item.id} item={item} index={index} today={today} nowTime={nowTime} onClickItemCheck={onClickItemCheck} onPopupTodo={onPopupTodo} />
                            ))}
                            {todos.length === 0 &&
                                <div style={{ color: "#aaa", cursor: "default" }}>등록된 할 일이 없습니다.</div>
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
});

const TodoListItem = memo(({ item, index, today, nowTime, onClickItemCheck, onPopupTodo }) => {
    console.log('할 일 아이템');

    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    onClick={() => onPopupTodo(item)}
                >
                    {/* {item.title === "---" ?
                        <div style={{ padding: "0.5em 0" }}>
                            <hr style={{ margin: "unset" }} />
                        </div>
                        : */}
                    <div style={{ display: "flex", lineHeight: "2rem", marginBottom:"0.5em" }}>
                        <span
                            onClick={(e) => onClickItemCheck(e, (e, item))}
                            style={{ marginRight: "0.3em", marginTop: "0.07em", fontSize: "1.3rem" }}
                        >
                            <FontAwesomeIcon icon={item.check ? faSquareCheck : faSquare} style={{ color: "#666666", cursor: "pointer" }} />
                        </span>
                        <div style={{ width: "100%" }}>
                            <div style={{ cursor: "pointer", color: item.check ? "#aaa" : "#000", textDecoration: item.check ? "line-through" : "none" }}>
                                {item.time &&
                                    <span style={{ fontSize: "1rem", wordBreak: "keep-all", color: item.check ? "#aaa" : item.time_fix ? "#0060e5" : "#2EAADC", fontWeight: "500", marginRight: "0.3em" }}>{item.time}</span>
                                }
                                {item.title}
                                {item.during &&
                                    <span style={{ fontSize: "1rem", wordBreak: "keep-all", color: item.check ? "#aaa" : "#777", fontWeight: "500", marginLeft: "0.3em" }}>({item.during})</span>
                                }
                            </div>
                            {!item.check &&
                                <div>
                                    <TodoTimerInfo today={today} nowTime={nowTime} todo={item} />
                                </div>
                            }
                        </div>
                    </div>
                    {/* } */}
                </div>
            )}
        </Draggable>
    );
});

const TodoTimerInfo = ({ today, nowTime, todo }) => {
    console.log('TodoTimerInfo');

    let startTimeMoment = moment(`${today} ${todo.time}`);
    let endTimeMoment = moment(`${today} ${todo.time}`).add(todo.during, 'm');
    let nowTimeMoment = moment(`${today} ${nowTime}`);
    let progressState = false; //진행상태
    let progress = 0; //진행률
    let startText = ``; //시작텍스트
    let endText = ``; //종료텍스트

    if (todo.time) {

        //시작텍스트
        let startDiffSecond = startTimeMoment.diff(nowTimeMoment, 'seconds');
        let startSign = "+";
        if (startDiffSecond > 0) { startSign = "-"; }
        if (startSign === '+') { startDiffSecond = startDiffSecond * (-1); }
        const startHour = parseInt(startDiffSecond / 3600).toString().padStart(2, '0');
        const startMin = parseInt((startDiffSecond % 3600) / 60).toString().padStart(2, '0');
        const startSec = (startDiffSecond % 60).toString().padStart(2, '0');
        startText += `${startSign} ${startHour}:${startMin}:${startSec}`;

        //종료텍스트
        if (todo.during > 0) {
            let endDiffSecond = endTimeMoment.diff(nowTimeMoment, 'seconds');
            let endSign = "+";
            if (endDiffSecond > 0) { endSign = "-"; }
            if (endSign === '+') { endDiffSecond = endDiffSecond * (-1); }
            const endHour = parseInt(endDiffSecond / 3600).toString().padStart(2, '0');
            const endMin = parseInt((endDiffSecond % 3600) / 60).toString().padStart(2, '0');
            const endSec = (endDiffSecond % 60).toString().padStart(2, '0');
            endText += `${endSign} ${endHour}:${endMin}:${endSec}`;

            //진행률
            if (startSign === '+') {
                let startToEndDiffSecond = endTimeMoment.diff(startTimeMoment, 'seconds');
                progress = Math.floor((startDiffSecond / startToEndDiffSecond) * 100);
                if(progress > 100) { progress = 100; }
                progressState = true;
            }
        }
    }


    //종료시간

    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontWeight: (progressState) ? "bold" : "normal" }}>
                <div>{startText}</div>
                <div>{endText}</div>
            </div>
            {startText && endText &&
                <LinearProgress variant="determinate" value={progress} sx={{ width: "100%", height: "0.5rem", borderRadius: "0.2em" }} />
            }
        </div>
    );
}

const TodoInsertArea = memo(({ user, onInsertTodo, setSnackbar, today }) => {
    console.log('할 일 입력 영역');

    const [keyPressState, setKeyPressState] = useState(false);

    const onKeyPress = (e) => {

        //중복실행방지
        if (keyPressState) { return false; }

        if (e.key === 'Enter') {
            console.log('엔터키 입력됨');

            const inputValue = e.target.value;

            if (inputValue === '') {
                console.log('입력된 값이 없으면 경고창');
                setSnackbar({ isOpen: true, severity: 'warning', message: '값을 입력해 주세요.', vertical: 'top', horizontal: 'center' });
                return false;
            }

            const item = setTodoItem(inputValue);
            const result = onInsertTodo(item);
            if (result) {
                console.log('입력 완료 후 인풋 비우기');
                e.target.value = "";
            }
        }

        setKeyPressState(true);
    }

    const onKeyUp = (e) => {
        setKeyPressState(false);
    }

    const setTodoItem = inputValue => {
        console.log('todo 아이템으로 셋팅');

        //고유코드
        const id = new Date().getTime();
        const date = today;

        //값 셋팅
        const inputValueArray = inputValue.split(';');

        let time = '';
        let during = '';
        let time_fix = false;

        let ti = 0; // title index

        if (inputValueArray[0].indexOf(':') !== -1) { //시각이 있는 경우
            time = inputValueArray[0].trim();
            ti = 1;
            time_fix = true;
        }
        if (Number(inputValueArray[ti + 1]) > 0) {
            during = inputValueArray[ti + 1].trim();
        }
        let title = inputValueArray[ti].trim();

        const item = {
            id: `${user.id}-${id}`,
            user_id: user.id,
            title: title,
            date: date,
            time: time, //시각
            during: during, //소요시간
            check: false,
            time_fix: time_fix,
            state: 'ok',
        };

        return item;
    }

    return (
        <>
            <TextField
                size="small"
                placeholder='할 일 입력'
                fullWidth
                sx={{ marginTop: "0.5em" }}
                onKeyPress={onKeyPress}
                onKeyUp={onKeyUp}
                InputProps={{
                    endAdornment:
                        <InputAdornment position="end" style={{ cursor: "pointer", color: "#aaa" }} >
                            <FontAwesomeIcon icon={faCircleQuestion} />
                        </InputAdornment>
                }}
            />
        </>
    )
});

const DetailDialog = ({ todos, seletedTodoItem, onChangeTodos, setConfirmDialog, onDeleteTodo }) => {
    console.log('상세 팝업', seletedTodoItem);

    const navigate = useNavigate();
    const titleRef = useRef();
    const [thisItem, setThisItem] = useState({ ...seletedTodoItem });

    // const onKeyPress = e => {
    //     console.log(e.code);
    // }
    const handleClose = () => {
        console.log('입력창 닫기');

        navigate('/now');

    }
    const onChange = (value, key) => {
        console.log('값 변경', value, key);

        const newItem = { ...thisItem };
        newItem[key] = value;
        setThisItem(newItem);
    }
    const handleOk = () => {
        console.log('저장');

        const newTodos = [...todos];
        newTodos.forEach(i => {
            if (i.id === thisItem.id) {
                Object.keys(i).forEach(key => {
                    i[key] = thisItem[key];
                });
            }
        })
        onChangeTodos(newTodos);

        handleClose();
    }
    const deleteConfirm = () => {
        setConfirmDialog({ isOpen: true, title: '삭제하시겠습니까?', ok: handleDelete, cancel: () => { return false; } });
    }
    const handleDelete = () => {
        console.log('삭제');

        const newThisItem = { ...thisItem };
        newThisItem.state = 'hide';
        setThisItem(newThisItem);

        onDeleteTodo(seletedTodoItem);

        handleClose();
    }

    return (
        <>
            <Dialog
                open={true}
                scroll='paper'
                maxWidth="xs"
                onClose={(e, reason) => { if (reason !== 'backdropClick') { handleClose(); } }}
                PaperProps={isBrowser ? { sx: { position: "fixed", top: "10%" } } : {}}
            >
                <DialogContent>
                    {thisItem.state === 'hide' &&
                        <Alert severity="error" sx={{ marginBottom: "1em" }}>
                            이 항목은 삭제되었습니다.
                        </Alert>
                    }
                    <TextField
                        inputRef={titleRef}
                        variant="standard"
                        placeholder='할 일'
                        fullWidth
                        value={thisItem.title}
                        sx={{ marginBottom: "1em" }}
                        InputProps={{
                            disableUnderline: true,
                            style: { fontSize: "2rem" }
                        }}
                        disabled={thisItem.state === 'hide'}
                        onChange={(e) => { onChange(e.target.value, 'title') }}
                    />
                    <label>일정</label>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={koLocale}>
                        <MobileDatePicker
                            placeholder="일정"
                            value={thisItem.date}
                            inputFormat={"yyyy-MM-dd"}
                            mask={"____-__-__"} //warning방지
                            renderInput={(params) => <TextField {...params} size="small" fullWidth />}
                            onChange={(e) => { onChange(moment(e).format('YYYY-MM-DD'), 'date') }}
                            disabled={thisItem.state === 'hide'}
                        />
                    </LocalizationProvider>
                    <TextField
                        placeholder='시각 (시간:분)'
                        fullWidth
                        size='small'
                        value={thisItem.time}
                        onChange={(e) => { onChange(e.target.value, 'time') }}
                        sx={{ marginBottom: "1em" }}
                        disabled={thisItem.state === 'hide'}
                        InputProps={{
                            endAdornment:
                                thisItem.time ?
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="시간확정여부"
                                            onClick={() => { onChange(!thisItem.time_fix, 'time_fix'); }}
                                            edge="end"
                                        >
                                            {thisItem.time_fix ? <Tooltip title="시간 확정됨"><CheckCircleIcon /></Tooltip> : <Tooltip title="시간 자동계산"><CheckCircleOutlineIcon style={{ color: "#c3c3c3" }} /></Tooltip>}
                                        </IconButton>
                                    </InputAdornment>
                                    :
                                    <></>
                        }}

                    />
                    <label>소요시간 (분)</label>
                    <TextField
                        type="number"
                        placeholder='소요시간 (분)'
                        fullWidth
                        size='small'
                        value={thisItem.during}
                        onChange={(e) => { onChange(e.target.value, 'during') }}
                        sx={{ marginBottom: "1em" }}
                        disabled={thisItem.state === 'hide'}
                    />
                    {thisItem.state === 'ok' &&
                        <Button variant="text" style={{ color: "grey" }} onClick={deleteConfirm}><DeleteIcon /> 삭제</Button>
                    }
                </DialogContent>
                <DialogActions>
                    <Button sx={{ width: "100%" }} onClick={handleClose}>닫기</Button>
                    {thisItem.state !== 'hide' &&
                        <Button sx={{ width: "100%" }} variant="contained" onClick={handleOk}>저장</Button>
                    }
                </DialogActions>
            </Dialog>
        </>
    )
}

// const TimerArea = ({ todos, onChangeTodos, today, nowTime }) => {
//     console.log('TimerArea : 타이머표시');

//     // const [progress, setProgress] = useState(0);
//     const [nowTodoStartTitle, setNowTodoStartTitle] = useState(undefined);
//     const [nowTodoStartTime, setNowTodoStartTime] = useState(undefined);
//     const [nowTodoEndTime, setNowTodoEndTime] = useState(undefined);
//     const [nextTodoStartTitle, setNextTodoStartTitle] = useState(undefined);
//     const [nextTodoStartTime, setNextTodoStartTime] = useState(undefined);
//     const settingStates = () => {
//         let nowTodo = undefined;
//         let nextTodo = undefined;

//         setNowTodoStartTitle(undefined);
//         setNowTodoStartTime(undefined);
//         setNowTodoEndTime(undefined);
//         setNextTodoStartTitle(undefined);
//         setNextTodoStartTime(undefined);

//         todos.forEach(todo => {

//             if (nowTodo && nextTodo) { return false; }

//             //제목
//             let title = todo.title;

//             //시작
//             let startText = ``;
//             let startDiffSecond = moment(`${today} ${todo.time}`).diff(moment(`${today} ${nowTime}`), 'seconds');
//             let startSign = "minus";
//             if (startDiffSecond > 0) { startSign = "plus"; }
//             if (startSign === 'minus') { startDiffSecond = startDiffSecond * (-1); }
//             const startHour = parseInt(startDiffSecond / 3600).toString().padStart(2, '0');
//             const startMin = parseInt((startDiffSecond % 3600) / 60).toString().padStart(2, '0');
//             const startSec = (startDiffSecond % 60).toString().padStart(2, '0');
//             if (startSign === 'plus') { startText += `시작 `; }
//             startText += `${startHour}:${startMin}:${startSec}`;
//             if (startSign === 'plus') { startText += ` 남음`; } else { startText += ` 진행중`; }

//             //종료
//             let endText = ``;
//             if(todo.during > 0){
//                 let endDiffSecond = moment(`${today} ${todo.time}`).add(todo.during, 'm').diff(moment(`${today} ${nowTime}`), 'seconds');
//                 let endSign = "minus";
//                 if (endDiffSecond > 0) { endSign = "plus"; }
//                 if (endSign === 'minus') { endDiffSecond = endDiffSecond * (-1); }
//                 const endHour = parseInt(endDiffSecond / 3600).toString().padStart(2, '0');
//                 const endMin = parseInt((endDiffSecond % 3600) / 60).toString().padStart(2, '0');
//                 const endSec = (endDiffSecond % 60).toString().padStart(2, '0');
//                 if (endSign === 'plus') { endText += `종료 `; }
//                 endText += `${endHour}:${endMin}:${endSec}`;
//                 if (endSign === 'plus') { endText += ` 남음`; } else { endText += ` 진행중`; }
//             }


//             //현재 일정 설정 (체크안된 것 중 첫번째)
//             if (!todo.check && !nowTodo) {
//                 nowTodo = todo;
//                 setNowTodoStartTitle(title);
//                 setNowTodoStartTime(startText);
//                 setNowTodoEndTime(endText);
//             } else {

//                 //다음 일정 설정 (체크안된 것 중 두번째)
//                 if (!todo.check && nowTodo && !nextTodo) {
//                     nextTodo = todo;
//                     setNextTodoStartTitle(title);
//                     setNextTodoStartTime(startText);
//                 }
//             }

//         });
//     }

//     useEffect(() => {
//         settingStates();
//     }, [nowTime]);

//     return (
//         <>
//             <div style={{ textAlign: "center" }}>
//                 {nowTodoStartTitle ?
//                     <div>
//                         <div style={{fontSize:"1.7rem"}}>{nowTodoStartTitle}</div>
//                         <div style={{fontSize:"2rem"}}>{nowTodoStartTime}</div>
//                         <div style={{fontSize:"1.3rem"}}>{nowTodoEndTime}</div>
//                     </div>
//                     :
//                     <>진행중인 일정이 없습니다.</>
//                 }
//             </div>
//             <br /><br />
//             <div style={{ textAlign: "center", color:"#aaa" }}>
//                 {nextTodoStartTitle ?
//                     <div>
//                         <div style={{fontSize:"1.7rem"}}>{nextTodoStartTitle}</div>
//                         <div style={{fontSize:"2rem"}}>{nextTodoStartTime}</div>
//                     </div>
//                     :
//                     <>일정이 없습니다.</>
//                 }
//             </div>
//             {/* <LinearProgress variant="determinate" value={progress} /> */}
//         </>
//     )
// }

export default Now;