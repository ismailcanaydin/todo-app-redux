import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { destroy, getTodosAsync, removeTodoAsync, selectActiveFilter, selectFilteredTodos, selectTodos, toggle, toggleTodoAsync } from '../redux/todos/todosSlice';
import Error from './Error';
import Loading from './Loading';

// let filtered = []

function TodoList() {
    const dispatch = useDispatch()
    const filteredTodos = useSelector(selectFilteredTodos)

    const isLoading = useSelector((state) => state.todos.isLoading)
    const isError = useSelector((state) => state.todos.error)

    // const items = useSelector(selectTodos)
    // const activeFilter = useSelector(selectActiveFilter)

    useEffect(() => {
        dispatch(getTodosAsync())
    }, [dispatch])


    const handleDestroy = async (id) => {
        if (window.confirm('Are you sure?')) {
            await dispatch(removeTodoAsync(id))
        }
    }

    const handleToggle = async (id, completed) => {
        await dispatch(toggleTodoAsync({ id, data: { completed } }))
    }

    // filtered = items
    // if (activeFilter !== 'all') {
    //     filtered = items.filter((todo) =>
    //         activeFilter === 'active'
    //             ? todo.completed === false
    //             : todo.completed === true
    //     )
    // }

    // console.log(items);

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        return <Error message={isError} />
    }

    return (
        <>
            <ul className="todo-list">
                {
                    filteredTodos.map((item) => (
                        <li key={item.id} className={item.completed ? 'completed' : ''}>
                            <div className="view">
                                <input
                                    className="toggle"
                                    type="checkbox"
                                    checked={item.completed}
                                    onChange={() => handleToggle(item.id, !item.completed)}
                                />
                                <label>{item.title}</label>
                                <button
                                    className="destroy"
                                    onClick={() => handleDestroy(item.id)}
                                ></button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default TodoList