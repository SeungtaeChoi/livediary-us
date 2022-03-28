import React, { useEffect, useState, useRef } from 'react';
import { isMobile, isBrowser } from 'react-device-detect';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, LayoutCenter } from '../layout';
import { Dialog, Box, TextField, InputAdornment, DialogContent, DialogActions, Button, Alert, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faSquare, faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import DeleteIcon from '@mui/icons-material/Delete';
import koLocale from 'date-fns/locale/ko';
import moment from 'moment';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, MobileDatePicker } from '@mui/lab';

const Now = ({ user, api, setConfirmDialog, setSnackbar }) => {
    // console.log('now');

    /* todo : 할 일
        {
            id: 'r1',
            title: '헬스',
            date:'2022-03-17',
            time:'',
            during:'',
            checked: false
            state: 'ok'
        }
    */
    const today = moment().format('YYYY-MM-DD');
    const [todos, setTodos] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const seletedTodoId = params.get('p'); //선택된 todo id
    const [seletedTodoItem, setSeletedTodoItem] = useState(undefined); //선택된 todo 정보

    //fn
    useEffect(() => {
        if (seletedTodoId) {
            todos.forEach(i => {
                // console.log('상세보기 반복', seletedTodoId);
                if (i.id === seletedTodoId) {
                    setSeletedTodoItem(i);
                }
            });
        } else {
            setSeletedTodoItem(undefined);
        }
    }, [location, seletedTodoId, todos]);
    const onChangeTodos = newTodos => {
        // console.log('할 일 변경', newTodos);

        let result = true;

        setTodos(newTodos);

        return result;
    }
    const onInsertTodo = newTodo => {
        // console.log('할 일 등록', newTodo);

        let result = true;

        const newTodos = [...todos];
        newTodos.push(newTodo);
        setTodos(newTodos);

        return result;
    }
    const onPopupTodo = todo => {
        // console.log('할 일 팝업으로 보기', todo);

        navigate(`/now?p=${todo.id}`);
    }
    const onDeleteTodo = seletedTodoItem => {
        // console.log(seletedTodoItem);

        const index = todos.findIndex(x => x.id === seletedTodoItem.id);
        const newTodos = [...todos];
        newTodos.splice(index, 1);

        onChangeTodos(newTodos);
    }

    return (
        <Layout user={user} api={api}>
            <LayoutCenter>
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                    <Box style={{ padding: "1.5em" }}>
                        <TodoListArea
                            todos={todos}
                            onChangeTodos={onChangeTodos}
                            onPopupTodo={onPopupTodo}
                            today={today}
                        />
                        <TodoInsertArea
                            todos={todos}
                            onInsertTodo={onInsertTodo}
                            setSnackbar={setSnackbar}
                            today={today}
                        />
                    </Box>
                    {seletedTodoId && seletedTodoItem && <DetailDialog todos={todos} seletedTodoItem={seletedTodoItem} onChangeTodos={onChangeTodos} setConfirmDialog={setConfirmDialog} onDeleteTodo={onDeleteTodo} />}
                </div>
            </LayoutCenter>
        </Layout >
    )
}

const TodoListArea = ({ todos, onChangeTodos, onPopupTodo, today }) => {
    // console.log('할 일 리스트 영역');

    const onDragEnd = result => {
        // console.log('드래그 & 드랍 종료');

        if (!result.destination) return;

        const newTodos = [...todos];
        const [reorderedItem] = newTodos.splice(result.source.index, 1);
        newTodos.splice(result.destination.index, 0, reorderedItem);

        onChangeTodos(newTodos);
    }

    const onClickItemCheck = (e, clickedItem) => {
        // console.log('아이템 클릭', clickedItem);

        e.stopPropagation();

        const newTodos = [...todos];
        newTodos.forEach(i => { if (i.id === clickedItem.id) { i.check = !clickedItem.check; } })

        onChangeTodos(newTodos);
    }

    return (
        <div>
            <h3 style={{ marginBottom: "0.2em" }}>{today}(목)</h3>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="todos">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} style={{ padding: "0.5em 0 0 0" }}>
                            {todos.map((item, index) => (
                                <TodoListItem key={item.id} item={item} index={index} onClickItemCheck={onClickItemCheck} onPopupTodo={onPopupTodo} />
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
}

const TodoListItem = ({ item, index, onClickItemCheck, onPopupTodo }) => {
    // console.log('할 일 아이템');

    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    onClick={() => onPopupTodo(item)}
                >
                    {item.title === "---" ?
                        <div style={{ padding: "0.5em 0" }}>
                            <hr style={{ margin: "unset" }} />
                        </div>
                        :
                        <div style={{ display: "flex", lineHeight: "2rem" }}>
                            <span
                                onClick={(e) => onClickItemCheck(e, (e, item))}
                                style={{ marginRight: "0.3em", fontSize: "1.3rem" }}
                            >
                                <FontAwesomeIcon icon={item.check ? faSquareCheck : faSquare} style={{ color: "#666666", cursor: "pointer" }} />
                            </span>
                            {item.time &&
                                <div style={{ fontSize:"1rem", wordBreak:"keep-all", color:"blue", fontWeight:"500", marginRight:"0.3em" }}>{item.time}</div>
                            }
                            <div style={{ cursor: "pointer", width: "100%" }}>
                                {item.title}
                                {item.during &&
                                    <span style={{ fontSize:"1rem", wordBreak:"keep-all", color:"#aaa", fontWeight:"500", marginLeft:"0.3em"}}>`{item.during}분</span>
                                }
                            </div>
                        </div>
                    }
                </div>
            )}
        </Draggable>
    );
}

const TodoInsertArea = ({ onInsertTodo, setSnackbar, today }) => {
    // console.log('할 일 입력 영역');

    const [keyPressState, setKeyPressState] = useState(false);

    const onKeyPress = (e) => {
        console.log('키보드 입력', e.key);

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
                // console.log('입력 완료 후 인풋 비우기');
                e.target.value = "";
            }
        }

        setKeyPressState(true);
    }

    const onKeyUp = (e) => {
        setKeyPressState(false);
    }

    const setTodoItem = inputValue => {
        // console.log('todo 아이템으로 셋팅');

        //고유코드
        const id = new Date().getTime();
        const date = today;

        //값 셋팅
        const inputValueArray = inputValue.split(';');
        let time = '';
        let during = '';
        let ti = 0; // title index
        if(inputValueArray[0].indexOf(':') !== -1){ //시각이 있는 경우
            time = inputValueArray[0].trim();
            ti = 1;
        }
        if(Number(inputValueArray[ti + 1]) > 0){
            during = inputValueArray[ti + 1].trim();
        }
        let title = inputValueArray[ti].trim();

        const item = {
            id: `r-${id}`,
            title: title,
            date: date,
            time: time, //시각
            during: during, //소요시간
            check: false,
            state: 'ok'
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
}

const DetailDialog = ({ todos, seletedTodoItem, onChangeTodos, setConfirmDialog, onDeleteTodo }) => {
    // console.log('상세 팝업', seletedTodoItem);

    const navigate = useNavigate();
    const titleRef = useRef();
    const [thisItem, setThisItem] = useState({ ...seletedTodoItem });

    // const onKeyPress = e => {
    //     console.log(e.code);
    // }
    const handleClose = () => {
        // console.log('입력창 닫기');

        navigate('/now');

    }
    const onChange = (value, key) => {
        // console.log('값 변경', value, key);

        const newItem = { ...thisItem };
        newItem[key] = value;
        setThisItem(newItem);
    }
    const handleOk = () => {
        // console.log('저장');

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
        // console.log('삭제');

        const newThisItem = { ...thisItem };
        newThisItem.state = 'hide';
        setThisItem(newThisItem);

        onDeleteTodo(seletedTodoItem);
    }

    return (
        <>
            <Dialog
                fullScreen={isMobile}
                open={true}
                scroll='paper'
                maxWidth="xs"
                onClose={(e, reason) => { if (reason !== 'backdropClick') { handleClose(); } }}
                PaperProps={isBrowser ? { sx: { position: "fixed", top: "10%" } } : {}}
            // onKeyPress={onKeyPress}
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

export default Now;