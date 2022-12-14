import React, {useCallback} from 'react';
import {TodoList} from "./TodoList";
import './css/App.css';
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from "@mui/material/Paper";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from "./reducers/tasksReducer";
import {
    addTodolistAC,
    changeTaskFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./reducers/todolistsReducer";
import {AppRootStateType} from "./redux/store";
import {useDispatch, useSelector} from "react-redux";

export type FilterValueType = 'all' | 'active' | 'completed'

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = {
    [key: string]: TaskType[]
}

function App() {
    // BLL (business logic layer):
    let todolists = useSelector<AppRootStateType, TodolistsType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const dispatch = useDispatch()

    // Task reducers
    const removeTask = useCallback((todolistId: string, taskId: string) => dispatch(removeTaskAC(todolistId, taskId)),[dispatch])
    const addTask = useCallback((todolistId: string, title: string) => dispatch(addTaskAC(todolistId, title)), [dispatch])
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => dispatch(changeTaskStatusAC(todolistId, taskId, isDone)),[dispatch])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, newTitle: string) => dispatch(changeTaskTitleAC(todolistId, taskId, newTitle)),[dispatch])
    const cnangeTaskFilter = useCallback((todolistId: string, filter: FilterValueType) => dispatch(changeTaskFilterAC(todolistId, filter)),[dispatch])

    // Todolist reducers
    const addTodolist = useCallback((title: string) => dispatch(addTodolistAC(title)), [dispatch])
    const removeTodolistItem = useCallback((todolistId: string) => dispatch(removeTodolistAC(todolistId)),[dispatch])
    const changeTodolistTitle = useCallback((todolistId: string, title: string) => dispatch(changeTodolistTitleAC(todolistId, title)),[dispatch])

    const todolistItem = todolists.length
        ?
        todolists.map(tl => {
            return (
                <Grid key={tl.id} item>
                    <Paper style={{padding: '10px'}}>
                        <TodoList
                            key={tl.id}
                            todolistId={tl.id}
                            title={tl.title}
                            tasks={tasks[tl.id]}
                            filter={tl.filter}
                            addTask={addTask}
                            removeTask={removeTask}
                            cnangeFilter={cnangeTaskFilter}
                            changeTaskStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}
                            removeTodolistItem={removeTodolistItem}
                            changeTodolistTile={changeTodolistTitle}
                        />
                    </Paper>
                </Grid>
            )
        })
        :
        <span className={'warning'}>Your list is empty</span>

    //GUI (graphical user interface):
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolistItem}
                </Grid>
            </Container>
        </div>
    )
}

export default App;
