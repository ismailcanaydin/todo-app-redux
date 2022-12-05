import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { destroy, selectActiveFilter, selectFilteredTodos, selectTodos, toggle } from '../redux/todos/todosSlice';

let filtered = []

function TodoList() {
    const dispatch = useDispatch()
    const filteredTodos = useSelector(selectFilteredTodos)
    // const items = useSelector(selectTodos)
    // const activeFilter = useSelector(selectActiveFilter)

    const handleDestroy = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(destroy(id))
        }
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
                                    onChange={() => dispatch(toggle({ id: item.id }))}
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