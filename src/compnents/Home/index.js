import { AppBar, Button, Checkbox, IconButton, InputAdornment, List, ListItem, TextField, Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import React, { useEffect } from "react";
import CheckIcon from '@mui/icons-material/Check';

import "./style.css"

const reducer = (state, action) => {
  const target = state.findIndex(e => e.id === action.id)

  switch (action.type) {
    case "DELETE_ONE":
      return [...state.filter((todo) => todo.id !== action.id)];
      case "DELETE_SELECTED":
        return [...state.filter((todo) => !todo.completed)];
  

    case "ADD":
      state.push({ id: action.id, title: action.newTask, edit: false, completed: false })
      return [...state]
    case "EDIT":
      state[target] = { ...state[target], edit: !state[target].edit }
      return [...state]

      case "EDIT_TODO":
      state[target] = { ...state[target], title: action.title }
      return [...state]
    case "COMPLETE":
        state[target] = { ...state[target], completed: !state[target].completed }
        return [...state]

    default:
      return state;
  }
};



const Home = () => {

  const [todos, dispatch] = React.useReducer(reducer, [{
    id: 1,
    title: "Task 1",
    edit: false,
    completed: false
  },]);
  const [newTask, setNewTask] = React.useState("")

  const handleComplete = (todo) => {
    dispatch({ type: "COMPLETE", id: todo.id });
  };

  const handleInputChange = event => {
    setNewTask(event.target.value)
  }
  
  const addTask = () => {
    dispatch({ type: "ADD", id: todos.length + 1, newTask: newTask, completed: false });
  }

  const editTask = (id) => {
    dispatch({ type: "EDIT", id: id });
  }

  const editTodos = (event,id) => {
    dispatch({ type: "EDIT_TODO", id: id, title: event.target.value });
  }

  return (
    <div className='container text-center'>
      <AppBar style={{marginBottom: '1rem', padding: '1rem'}} >
      <Typography variant="h5" component="h5">
          My Todo List
        </Typography>
      </AppBar>
      <div className="todo-body">
      <Typography variant="h4" component="h4">
          h1. Heading
        </Typography>
        <div style = {{display: "flex", gap: "2rem", marginTop: '1rem'}}>
          <TextField 
              margin="none"
              fullWidth value={newTask} onChange={handleInputChange} />
          <Button variant="contained" onClick={addTask}>Add Task</Button>
        </div>
        <List>
          {console.log(todos)}
          {todos.map(todo => 
          <ListItem>
            <Checkbox onChange={() => handleComplete(todo)} />
            <TextField 
              disabled={!todo.edit}
              variant="standard"
              margin="none"
              onChange={(e)=>editTodos(e, todo.id)}
              fullWidth
              value={todo.title}
              InputProps={{
                endAdornment: <>
                  <IconButton onClick={() => dispatch({type: "DELETE_ONE",id: todo.id})}>
                    <DeleteForeverIcon />
                  </IconButton>
                  <IconButton onClick={() => editTask(todo.id)}>
                    {!todo.edit ? <ModeEditIcon /> : <CheckIcon />}
                  </IconButton>
                </>
              }}
            />
          </ListItem>)}

        </List>
        {todos.filter(e => e.completed).length > 0 && <Button variant={'contained'} onClick={() => dispatch({type: "DELETE_SELECTED"})}>Delete Selected</Button>}
      </div>
    </div>
  );
}

export default Home;

