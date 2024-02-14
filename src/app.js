import React, { useState, useEffect } from 'react'
import { createTodo, deleteTodo, readTodos, updateTodo } from './api'
import { ControlPanel, Todo } from './components'
import { setTodoInTodos, findTodo, removeTodoInTodos, addTodoInTodos } from './utils'
import styles from './app.module.css'

export const App = () => {
	const [todos, setTodos] = useState([])
	const [searchPhrase, setSearchPhrase] = useState('')
	const [isAlphabetSorting, setIsAlphabetSorting] = useState(false)

	const onTodoAdd = () => {
		setTodos(addTodoInTodos(todos))
	}

	const onTodoSave = todoId => {
		const { title, completed } = findTodo(todos, todoId) || {}

		if (todoId === 'NEW_TODO_ID') {
			createTodo({ title, completed }).then(todo => {
				let updatedTodos = setTodoInTodos(todos, {
					id: 'NEW_TODO_ID',
					isEditing: false,
				})
				updatedTodos = removeTodoInTodos(updatedTodos, 'NEW_TODO_ID')
				updatedTodos = addTodoInTodos(updatedTodos, todo)
				setTodos(updatedTodos)
			})
		} else {
			updateTodo({ id: todoId, title }).then(() => {
				setTodos(setTodoInTodos(todos, { id: todoId, isEditing: false }))
			})
		}
	}

	const onTodoEdit = id => {
		setTodos(setTodoInTodos(todos, { id, isEditing: true }))
	}

	const onTodoTitleChange = (id, newTitle) => {
		setTodos(setTodoInTodos(todos, { id, title: newTitle }))
	}

	const onTodoCompletedChange = (id, newCompleted) => {
		updateTodo({ id, completed: newCompleted }).then(() => {
			setTodos(setTodoInTodos(todos, { id, completed: newCompleted }))
		})
	}

	const onTodoRemove = id => {
		deleteTodo(id).then(() => setTodos(removeTodoInTodos(todos, id)))
	}

	useEffect(() => {
		readTodos(searchPhrase, isAlphabetSorting).then(jsonTodos => setTodos(jsonTodos))
	}, [searchPhrase, isAlphabetSorting])

	return (
		<div className={styles.app}>
			<ControlPanel
				onTodoAdd={onTodoAdd}
				onSearch={setSearchPhrase}
				onSorting={setIsAlphabetSorting}
			/>
			{todos.map(({ id, title, completed, isEditing = false }) => (
				<div className={styles.todos} key={id}>
					<Todo
						title={title}
						completed={completed}
						isEditing={isEditing}
						onEdit={() => onTodoEdit(id)}
						onTitleChange={newTitle => onTodoTitleChange(id, newTitle)}
						onCompletedChange={newCompleted =>
							onTodoCompletedChange(id, newCompleted)
						}
						onSave={() => onTodoSave(id)}
						onRemove={() => onTodoRemove(id)}
					/>
				</div>
			))}
		</div>
	)
}
