import { createContext, useContext, useReducer } from "react";
import todosReduser from "../redusers/todosReduser";

export const TodosContext=createContext([]);

const TodosProvider=({children})=>
    {
const [todos,todosDispatch]=useReducer(todosReduser,[])
return(

<TodosContext.Provider value={{todos:todos,dispatch:todosDispatch}}>
    {children}
</TodosContext.Provider>

)

    }

    export const useTodos=()=>{
       return useContext(TodosContext)
    }

    export default TodosProvider;