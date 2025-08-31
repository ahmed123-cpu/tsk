import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { useContext } from 'react';
import { useTodos } from './contexts/TodosContext';
import { ToastContext } from './contexts/ToastContext';


export default function Todo({todo,showDelete,openEditDialog})
{
  const {todos,dispatch}=useTodos();
  const showHideToast=useContext(ToastContext);
  
// handle check method
  function handleCheckButton()
  {
          dispatch({type:"check",payload:todo})
          showHideToast("Task updated successfully");
  }
// handle check method

// handle delete method
  function handleDeleteButton()
  {
showDelete(todo);
  }

  // handle edit method
  function handleEditButton()
  {
    openEditDialog(todo)
  }


  // start return
return(
<>
  <Card 
className='TaskCard'
sx={{ minWidth: 275, background:"#283593",color:"white", marginTop:5, borderRadius:"20px !important" }}>
      <CardContent>

        <Grid container spacing={2}>
          <Grid size={{ xs: 6, md: 8, lg:8}} style={{textAlign:"left"}} >
            <Typography variant='h5' style={{ textDecoration: todo.iscompleted ? "line-through" : "none", color:"red" }}
              >
          {todo.title}
            </Typography>

            <Typography variant='h6'>
          {todo.details}
            </Typography>
        </Grid>
          <Grid size={{ xs: 6, md: 4, lg:4}} style={{display:"flex",justifyContent:"space-around", alignItems:"center" }}>
      
{/*check icon */}
    <IconButton 
    onClick={handleCheckButton}
    className='IconButton'
     style={{background: todo.iscompleted ?"#8bc34a" : "white",
      color: todo.iscompleted ?"white" : "#8bc34a",
       border:"solid 3px #8bc34a"}}>
        <DoneOutlinedIcon />
    </IconButton>
{/*check icon */}

{/*edit icon */}
<IconButton 
    onClick={handleEditButton}
    className='IconButton'
     style={{background:"white", color:"#200069", border:"solid 3px #200069"}}>
        <EditIcon />
</IconButton>
{/*edit icon */}



{/*delete icon */}
<IconButton 
    onClick={handleDeleteButton}
    className='IconButton'
    style={{background:"white", color:"red", border:"solid 3px red"}}>
      <DeleteIcon />
</IconButton>
{/*edit icon */}

        </Grid>
      </Grid>
    </CardContent>
  </Card>
</>
);

}