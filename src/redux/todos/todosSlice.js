import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`)
    return await res.json()
})

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`, data)
    return res.data
})

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
        activeFilter: 'all',
        addNewTodoIsLoading: false,
        addNewTodoError: null,
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
        toggle: (state, action) => {
            const { id } = action.payload
            const item = state.items.find((item) => item.id === id)
            item.completed = !item.completed
        },
        destroy: (state, action) => {
            const id = action.payload
            const filtered = state.items.filter((item) => item.id !== id)
            state.items = filtered
        },
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
            state.addNewTodoIsLoading = true
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            state.items.push(action.payload)
            state.addNewTodoIsLoading = false
        },
        [addTodoAsync.rejected]: (state, action) => {
            state.error = action.error.message
            state.addNewTodoIsLoading = false
        },
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