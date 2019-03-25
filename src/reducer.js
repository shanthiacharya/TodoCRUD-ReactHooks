import uuidv4 from 'uuid/v4'

export default function reducer (state,action) {

    switch (action.type) {

        case "ADD_TODO":

        if(!action.payload) {
            return state;
        }
        if (state.todos.findIndex(t=> t.text === action.payload) > -1) {
            return state;
        }
            const newTodo =  {
                id: uuidv4(),
                text:action.payload,
                complete:false
            }
            const addedTodos = [...state.todos,newTodo]
                return {
                    ...state,
                    todos: addedTodos
                }
       
        case "SETCURRENT_TODO":
                return {
                    ...state,
                    currentTodo:action.payload
                }
        case "TOGGLE_TODO":
            const toggledtodos = state.todos.map(t => 
                t.id === action.payload.id ? {
                    ...action.payload, complete:!action.payload.complete
                }:t
                )

                return {
                    ...state,
                    todos: toggledtodos
                }
        case "UPDATE_TODO":
                const updatedTodo = {...state.currentTodo, text:action.payload}
                const updateTodoIndex = state.todos.findIndex (
                    t=> t.id === state.currentTodo.id
                )
                const updatedTodos = [
                    ...state.todos.slice(0,updateTodoIndex),
                    updatedTodo,
                    ...state.todos.slice(updateTodoIndex+1)
                ]
            return {
                ...state,
                currentTodo:{},
                todos:updatedTodos
            }

        case "REMOVE_TODO":
            const filteredtodos = state.todos.filter(t => 
                t.id !== action.payload.id)
            const isRemovedTodo = state.currentTodo.id === action.payload.id ? 
            {}: state.currentTodo
                return {
                    ...state,
                    currentTodo: isRemovedTodo,
                    todos: filteredtodos
                }
        default:
            return state;
    }

}