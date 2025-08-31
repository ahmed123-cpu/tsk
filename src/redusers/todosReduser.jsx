import { act } from 'react';
import {v4 as uuidv4} from 'uuid';



export default function todosReduser(currentTodos,action)
{

switch(action.type)
{
case "add":
    {

        const newTask= {
            id:uuidv4(),
            title:action.payload.title,
            details:"",
            iscompleted:false
            }
  
  
  
  
        const updatedTodos=[...currentTodos,newTask];
        localStorage.setItem("todos", JSON.stringify(updatedTodos))
          return updatedTodos;


    };
    case "delete":
        {
            
      const updatedTodos=currentTodos.filter((t)=>{
        if(t.id===action.payload.id)
          {
            return false;
          }
          else{
            return true
          }
  
        })
        localStorage.setItem("todos", JSON.stringify(updatedTodos))
        return updatedTodos
        }

    default:
        {
            throw Error("undefiend order")
        }
case "edit":
    {
        const updatedTodos=currentTodos.map((t)=>{
            if(t.id===action.payload.id)
              {
                return{
                  ...t,
                title:action.payload.taskName,
                details:action.payload.taskDetails,
                }
              }
              return t;
        })
                localStorage.setItem("todos", JSON.stringify(updatedTodos))
                return updatedTodos;
    }
    case "get":
      {
        const updatedTodos=JSON.parse(localStorage.getItem("todos"))??[]
        return updatedTodos
      }

      case "check":
        {
          const updatedTodos=currentTodos.map((t)=>{
            if(t.id===action.payload.id)
              {
                const newT={
                  ...t,
                  iscompleted:!t.iscompleted
                }
                return newT
              }
              return t;
        })
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
                return updatedTodos
        }
      

}



}