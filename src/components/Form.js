import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, addTodoAsync } from '../redux/todos/todosSlice'
import Error from './Error'
import Loading from './Loading'

function Form() {
    const [title, setTitle] = useState('')
    const dispatch = useDispatch()

    const isLoading = useSelector((state) => state.todos.addNewTodoIsLoading)
    const isError = useSelector((state) => state.todos.addNewTodoError)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title) return

        // dispatch(addTodo({ id: nanoid(), title, completed: false }))
        await dispatch(addTodoAsync({ title }))

        setTitle('')
    }

    // if(isError){
    //     return <Error message={isError} />
    // }

    return (
        <>
            <form onSubmit={handleSubmit} style={{ display: 'flex', fontSize: 15, alignItems: 'center' }}>
                <input
                    disabled={isLoading}
                    className='new-todo'
                    placeholder='What needs to be done?'
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />

                {isLoading && <Loading />}
                {isError && <Error message={isError} />}
            </form>
        </>

    )
}

export default Form