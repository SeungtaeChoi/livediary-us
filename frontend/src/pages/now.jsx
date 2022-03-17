import React, { useEffect, useRef, useState } from 'react';
import { isMobile, isBrowser } from 'react-device-detect';
import { Layout, LayoutCenter } from '../layout';
import { Divider, Dialog, Box, TextField, Button } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCropSimple, faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import ContentEditable from 'react-contenteditable';
import TaskListItemStyles from './taskListItemStyles.module.css';
import setCaretToEnd from '../services/setCaretToEnd';

const Now = ({ user, api }) => {
    // console.log('now');

    //state
    const [stateTaskInputList, setStateTaskInputList] = useState(['']);

    //fn
    // const onKeyDownTaskInput = (e) => {
    //     console.log('할 일 인풋 키 다운 시');

    //     const keycode = e.keyCode;
    //     const id = e.target.id;
    //     const index = id.split('-')[1];
    //     const value = e.target.value;
    //     console.log(keycode, id, index, value);

    //     switch (keycode) {
    //         case 13:
    //             // console.log('엔터 클릭');

    //             setStateTaskInputList(() => {
    //                 // console.log('바로 뒤에 인풋 추가');
    //                 const updated = [...stateTaskInputList];
    //                 updated.splice(Number(index) + 1, 0, '');
    //                 return updated;
    //             });

    //             break;
    //         case 8:
    //             console.log('백스페이스 클릭');

    //             if (value === '') {
    //                 console.log('값이 비었음');

    //                 setStateTaskInputList(() => {
    //                     console.log('인풋 삭제');
    //                     const updated = [...stateTaskInputList];
    //                     updated.splice(index, 1);
    //                     console.log(updated);
    //                     return updated;
    //                 });
    //             } else {
    //                 setStateTaskInputList(() => {
    //                     const updated = [...stateTaskInputList];
    //                     updated[index] = value;
    //                     return updated;
    //                 });
    //             }
    //             break;
    //         case 38:
    //             // console.log('위로가기 버튼 클릭');
    //             break;
    //         case 40:
    //             // console.log('아래로가기 버튼 클릭');
    //             break;
    //         default:
    //             console.log('버튼 클릭');
    //             setStateTaskInputList(() => {
    //                 const updated = [...stateTaskInputList];
    //                 updated[index] = value;
    //                 return updated;
    //             });
    //     }
    //     if (e.currentTarget.nextSibling) {
    //         console.log('포커스 변경');
    //         console.log(e.currentTarget.nextSibling);
    //         e.currentTarget.nextSibling.focus();
    //     }
    // }


    return (
        <Layout user={user} api={api}>
            <LayoutCenter>
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                    <Box>
                        <div style={{ margin: "1em" }}>조회 조건 들어가야함</div>
                    </Box>
                    <Divider />
                    {/* <Box sx={{ padding: "0.5em" }}>
                        <h3>목록</h3>
                        {stateTaskInputList && stateTaskInputList.map((item, index) => {
                            return (
                                <TextField
                                    key={index}
                                    index={index}
                                    id={`t-${index}`}
                                    variant="standard"
                                    size="small"
                                    defaultValue={item}
                                    placeholder='입력'
                                    sx={{ width: "100%" }}
                                    InputProps={{
                                        disableUnderline: true, //밑줄 삭제
                                    }}
                                    // onChange={onChangeTaskInput}
                                    onKeyDown={onKeyDownTaskInput}
                                />
                            )
                        })}
                    </Box> */}
                    <TaskList user={user} api={api} />
                    {/* <InsertDialog user={user} api={api}/> */}
                </div>
            </LayoutCenter>
        </Layout>
    )
}

const InsertDialog = ({ user, api }) => {

    //state
    const [stateInsertDrawerOpen, setStateInsertDrawerOpen] = useState(false);

    //fn
    const onClickInsertButton = () => {
        //console.log('입력버튼 클릭 시')
        setStateInsertDrawerOpen(true)
    }

    const onCloseInsertDrawer = () => {
        // console.log('입력창 닫기');
        setStateInsertDrawerOpen(false);
    }

    return (
        <>
            <Box style={{ position: "absolute", bottom: 0, left: 0, width: "100%", padding: "0.5em" }}>
                <Button variant="contained" size='large' onClick={onClickInsertButton} style={{ width: "100%" }}>입력</Button>
            </Box>
            <Dialog
                open={stateInsertDrawerOpen}
                scroll='paper'
                maxWidth="xs"
                fullScreen={isMobile}
            >
                <div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div><div>입력</div>
            </Dialog>
        </>
    )
}

const TaskList = ({ user, api }) => {

    //state
    const [todos, setTodos] = useState([
        { id: "r1", title: "공부" },
        { id: "r2", title: "헬스" },
        { id: "r3", title: "독서" },
        { id: "r4", title: "산책" },
        { id: "r5", title: "요리" }
    ]);

    //fn
    useEffect(() => {
        console.log(todos);
    }, [todos]);
    const onDragEnd = (result) => {
        // console.log('드래그 & 드랍 종료');

        if (!result.destination) return;

        setTodos(() => {
            const updated = [...todos];
            const [reorderedItem] = updated.splice(result.source.index, 1);
            updated.splice(result.destination.index, 0, reorderedItem);
            return updated;
        });
    }

    const onKeyDown = (e, index) => {
        // console.log('TaskListItem > onKeyDown');
        const id = e.target.id;
        const keyCode = e.keyCode;
        const value = e.target.innerText;
        console.log(keyCode);

        switch (keyCode) {
            case 8:
                // console.log('백스페이스 키보드');
                if (!value) {
                    // console.log('삭제');
                    e.preventDefault();

                    setTodos((todos) => [...todos].filter((item) => item.id !== id));

                    if (index > 0) {
                        // 이전 항목 맨 뒤로 커서 옮김
                        const preNode = document.getElementById(todos[index - 1].id);
                        setCaretToEnd(preNode);
                    }
                }
                break;
            case 38:
                // console.log('위로 가기 키보드')
                if (index > 0) {
                    e.preventDefault();
                    const preNode = document.getElementById(todos[index - 1].id);
                    setCaretToEnd(preNode);
                }
                break;
            case 40:
                // console.log('아래로 가기 키보드')
                if ((index + 1) < todos.length) {
                    e.preventDefault();
                    const preNode = document.getElementById(todos[index + 1].id);
                    setCaretToEnd(preNode);
                }
                break;
            case 13:
                // console.log('엔터 키보드');
                e.preventDefault();
                // const preNode = document.getElementById(todos[index + 1].id);
                
                // setStateTaskInputList(() => {
                //     // console.log('바로 뒤에 인풋 추가');
                //     const updated = [...stateTaskInputList];
                //     updated.splice(Number(index) + 1, 0, '');
                //     return updated;
                // });
                // setCaretToEnd(preNode);
                break;
        }
    }

    return (
        <div style={{ padding: "1.5em" }}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="todos">
                    {(provided) => (
                        <div className="todos" {...provided.droppableProps} ref={provided.innerRef}>
                            {todos.map(({ id, title }, index) => (
                                <TaskListItem key={id} id={id} title={title} index={index} onKeyDown={(e) => { onKeyDown(e, index); }} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

const TaskListItem = ({ id, title, index, onKeyDown }) => {

    const contentEditable = useRef();

    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                >
                    <div className={isBrowser ? TaskListItemStyles.itemWrap : null} style={{ display: "flex", lineHeight: "2rem" }}>
                        <span
                            role="button"
                            tabIndex="0"
                            {...provided.draggableProps}
                            style={{ marginRight: "0.7em" }}
                            className={isBrowser ? TaskListItemStyles.dragButton : null}
                        >
                            <FontAwesomeIcon icon={faGripVertical} style={{ color: "#ccc" }} />
                        </span>
                        <div style={{ marginRight: "0.5em", cursor: "pointer" }}>
                            <FontAwesomeIcon icon={faClock} style={{ color: "#ccc" }} />
                        </div>
                        <ContentEditable
                            innerRef={contentEditable}
                            id={id}
                            html={title}
                            disabled={false}
                            onKeyDown={onKeyDown}
                            tagName='div'
                            className={TaskListItemStyles.contentEditable}
                        />
                    </div>
                </div>
            )}
        </Draggable>
    );
}

export default Now;