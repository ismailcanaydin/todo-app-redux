import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [{
            id: '1',
            title: 'Learn React',
            completed: true
        },
        {
            id: '2',
            title: 'Read a book',
            completed: false
        }
        ],
    },
    //createSlice data klanlamayı kendi yapıyor.
    //Buranın dışında işlem yapılacağı zaman datayı klanlamamız gerekli.
    reducers: {
        addTodo: (state, action) => {
            state.items.push(action.payload)
        }
    },
})

export const { addTodo } = todosSlice.actions
export default todosSlice.reducer