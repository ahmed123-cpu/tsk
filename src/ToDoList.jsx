import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState,useContext,useEffect,useMemo,useReducer } from 'react';

// import dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

//import components
import Todo from './ToDo';
import { ToastContext } from './contexts/ToastContext';
import { useTodos } from './contexts/TodosContext';
//import components



          // start 

export default function ToDoList() {
  const {todos,dispatch}=useTodos()
  const [inputValue,setInputValue]=useState("");
  const [showTodosType,setShowTodosType]=useState("all");
  const [showDialog,setShowDialog]=useState(false);
  const [showEditDialog,setShowEditDialog]=useState(false);
  const [dialogTodo,setDialogTodo]=useState(null);
  const [taskName,setTaskName]=useState("");
  const [taskDetails,setTaskDetails]=useState("");
  const [newTaskName,setNewTaskName]=useState(taskName);
  const [newTaskaskDetails,setNewTaskDetails]=useState("");
  const showHideToast=useContext(ToastContext)


  // todos filteration
const completedTodos=useMemo(()=>{
  return todos.filter((t)=>{
    console.log("iscompleted")
    return t.iscompleted
  })
},[todos])

const notCompletedTodos=useMemo(()=>{
  return todos.filter((t)=>{
    console.log("notcompleted")
    return !t.iscompleted
  })
},[todos])


// handle methods

      function handleAddTask()
        {
          dispatch(
          {
            type:"add",
            payload:{
              title:inputValue,


            }
          }
          )
          setInputValue("")
          showHideToast("Task added successfully")
      }

      function handleShowTodos(e)
      {
        setShowTodosType(e.target.value)
      }

// delete methods
      function handleCloseDeleteDialog()
      {
        setShowDialog(false)
      }

      function showDeleteDialog(todo)
      {
        setDialogTodo(todo)
        setShowDialog(true)
      }

      function handleDeleteConfirm()
      {
      dispatch({type:"delete",payload:{id:dialogTodo.id}})
      setShowDialog(false)
      showHideToast("Task deleted successfully")
      }
// delete methods

// edit methods
      function openEditDialog(todo)
      {
        setDialogTodo(todo)
        setShowEditDialog(true)
        setTaskName(todo.title)
        setTaskDetails(todo.details)
      }

      function handleCloseEditDialog()
      {
        setShowEditDialog(false)
      }

      function handleEditConfirm()
      {
        if(taskName===newTaskName)
          {
            showHideToast("error")

          }
          else{
       dispatch({
        type:"edit",
        payload:{
          id:dialogTodo.id,
          taskName:taskName,
          taskDetails:taskDetails
        }
       })
       handleCloseEditDialog();
       showHideToast("Task updated successfully")
      }}
// editmethods



// use effect
useEffect(()=>{
dispatch({type:"get"})
},[])

let todosToBeRendred=todos;

if(showTodosType==="completed")
  {
    todosToBeRendred=completedTodos;
  }
  else if(showTodosType==="notCompleted")
    {
      todosToBeRendred=notCompletedTodos;
    }
    else
    {
      todosToBeRendred=todos;
    }

    // map method and return

  const todosList=todosToBeRendred.map((task)=> {
    return <Todo key={task.id} todo={task} showDelete={showDeleteDialog} openEditDialog={openEditDialog}/>
  })

  return (

<>

{/*delete dialog */}
        <React.Fragment>

              <Dialog
                open={showDialog}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title" style={{textAlign:"center"}}>
                  {"Delete Task"}
                </DialogTitle>

                <DialogContent>
                  <DialogContentText id="alert-dialog-description"  style={{textAlign:"center"}}>
                    Task will be permanently deleted
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                  <Button autoFocus onClick={handleDeleteConfirm}>
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
        </React.Fragment>
{/* //delete dialog */}

{/* edit dailog */}
        <React.Fragment>

        <Dialog
          open={showEditDialog}
          onClose={handleCloseEditDialog}
        >
          <DialogTitle style={{textAlign:"center"}}>Edit Task</DialogTitle>
          <DialogContent>
            <DialogContentText style={{textAlign:"center"}}>
              Please Enter the changes you’d like to make.
            </DialogContentText>
            <TextField
            value={taskName}
            onChange={(e)=>{
              setTaskName(e.target.value)
            }}
              autoFocus
              required
              margin="dense"
              id="taskName"
              name="taskName"
              label="Task Name"
              type="text"
              fullWidth
              variant="standard"
            />

        <TextField
            value={taskDetails}
            onChange={(e)=>{
              setTaskDetails(e.target.value)
            }}
              autoFocus
              required
              margin="dense"
              id="taskDetails"
              name="taskDetails"
              label="Task Details"
              type="text"
              fullWidth
              variant="standard"
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog}>Cancel</Button>
            <Button onClick={handleEditConfirm} type="submit">Edit</Button>
          </DialogActions>
        </Dialog>
        </React.Fragment>
{/* edit dailog */}


{/* card container */}
      <Container maxWidth="sm" style={{marginTop:"0",padding:"0"}}>
    <Card
    style={{height:"95vh", overflow:"scroll", margin:"3px"}}
    >
      <CardContent>

        <Typography className='hola' variant='h2'>
          My Tasks
        </Typography>

        <Divider/>

{/* button group */}
    <ToggleButtonGroup
        style={{ marginTop:"30px"}}
      value={showTodosType}
      exclusive
      onChange={handleShowTodos}
      aria-label="text alignment"
    >
      <ToggleButton value="all" >
        All
      </ToggleButton>

      <ToggleButton value="completed" >
        Completed
      </ToggleButton>

      <ToggleButton value="notCompleted" >
        Pending
      </ToggleButton>


    </ToggleButtonGroup>
{/* button group */}

{/* Todo component */}
      {todosList}
{/* Todo component */}

{/* Add new task */}
    <Grid style={{marginTop:"20px"}} container spacing={2}>

    <Grid size={8} >
    <TextField
    value={inputValue}
    onChange={(e)=>{setInputValue(e.target.value)}}
    style={{width:"100%"}} id="outlined-basic" label="Add Task" variant="outlined" />
    </Grid>

    <Grid size={4} >
    <Button
    disabled={inputValue=== ""}
    onClick={handleAddTask}
    style={{width:"100%",height:"100%"}} variant="contained">Add</Button>
    </Grid>

    </Grid>
{/* Add new task */}

      </CardContent>
    </Card>
      </Container>
{/* card container */}

</>
  );
}
