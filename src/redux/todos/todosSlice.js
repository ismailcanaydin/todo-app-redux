import { createSlice } from "@reduxjs/toolkit";
import { addTodoAsync, getTodosAsync, removeTodoAsync, toggleTodoAsync } from "./services";

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [
            // {
            //     id: '1',
            //     title: 'Learn React',
            //     completed: true
            // },
            // {
            //     id: '2',
            //     title: 'Read a book',
            //     completed: false
            // }
        ],
        isLoading: false,
        error: null,
        activeFilter: localStorage.getItem('activeFilter'),
        addNewTodo: {
            isLoading: false,
            error: null,
        }
    },
    //createSlice data klanlamayı kendi yapıyor.
    //Buranın dışında işlem yapılacağı zaman datayı klanlamamız gerekli.
    reducers: {
        // addTodo: {
        //     reducer: (state, action) => {
        //         state.items.push(action.payload)
        //     },
        //     prepare: ({ title }) => {
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 completed: false,
        //                 title,
        //             },
        //         }
        //     },
        // },
        // toggle: (state, action) => {
        //     const { id } = action.payload
        //     const item = state.items.find((item) => item.id === id)
        //     item.completed = !item.completed
        // },
        // destroy: (state, action) => {
        //     const id = action.payload
        //     const filtered = state.items.filter((item) => item.id !== id)
        //     state.items = filtered
        // },
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload
        },
        clearCompleted: (state) => {
            const filtered = state.items.filter((item) => item.completed === false)
            state.items = filtered
        }
    },
    extraReducers: {
        // get todos
        [getTodosAsync.pending]: (state, action) => {
            state.isLoading = true
        },
        [getTodosAsync.fulfilled]: (state, action) => {
            state.items = action.payload
            state.isLoading = false
        },
        [getTodosAsync.rejected]: (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        },
        // add todo
        [addTodoAsync.pending]: (state, action) => {
            state.addNewTodo.isLoading = true
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            state.items.push(action.payload)
            state.addNewTodo.isLoading = false
        },
        [addTodoAsync.rejected]: (state, action) => {
            state.addNewTodo.error = action.error.message
            state.addNewTodo.isLoading = false
        },
        // toggle todo
        [toggleTodoAsync.fulfilled]: (state, action) => {
            const { id, completed } = action.payload
            const index = state.items.findIndex(item => item.id === id)
            state.items[index].completed = completed
        },
        // remove todo
        [removeTodoAsync.fulfilled]: (state, action) => {
            const id = action.payload
            const index = state.items.findIndex((item) => item.id === id)
            state.items.splice(index, 1)
        }
    }
})

export const selectTodos = (state) => state.todos.items
export const selectActiveFilter = (state) => state.todos.activeFilter
export const selectFilteredTodos = (state) => {
    if (state.todos.activeFilter === 'all') {
        return state.todos.items
    }

    return state.todos.items.filter((todo) =>
        state.todos.activeFilter === 'active'
            ? todo.completed === false
            : todo.completed === true
    )
}

export const { addTodo, toggle, destroy, changeActiveFilter, clearCompleted } = todosSlice.actions
export default todosSlice.reducer