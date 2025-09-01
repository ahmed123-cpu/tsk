import './App.css';
import ToDoList from './ToDoList';
import SnackBar from './SnackBar'
import TodosProvider, { TodosContext } from './contexts/TodosContext';
import {v4 as uuidv4} from 'uuid';
import { useState } from 'react';
import { ToastProvider} from './contexts/ToastContext';

// start up tasks array
const initialTodos=[
  {
  id:uuidv4(),
  title:"read a book",
  details:"lop",
  iscompleted:false
  },
  
  {
    id:uuidv4(),
    title:"do sport",
    details:"lop lpo",
    iscompleted:false
  },
  
    {
      id:uuidv4(),
      title:"watch TV",
      details:"tv",
      iscompleted:false
    },
  ]

  // start return
function App() {
  const [todos,setTodos]=useState(initialTodos);

  return (
    <TodosProvider>
      
    <ToastProvider>
    <div className="App" style={{display:"flex", justifyContent:"center",
      alignItems:"center",
      background:"linear-gradient(135deg, #74ebd5 0%, #9face6 100%)",
      height:"100vh",
      width:"100vw"
    }}>



      <ToDoList/>
    </div>
    </ToastProvider>
    </TodosProvider>

  );
}
export default App;