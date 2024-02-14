import { useState, useRef } from 'react'
import { Button } from './button'
import { debounce } from '../utils'
import styles from '../app.module.css'

export const Search = ({ onSearch }) => {
	const [value, setValue] = useState('')

	const debouncedOnSearch = useRef(debounce(onSearch, 500)).current // ссылка на текущее значение (current) через хук useRef, чтобы была одна функция, а не создавалась новая при каждом рендере

	const onChange = ({ target }) => {
		setValue(target.value)
		//onSearch(value)
		debouncedOnSearch(target.value)
	}

	const onSubmit = event => {
		event.preventDefault()
		onSearch(value)
	}

	return (
		<form className={styles.search} onSubmit={onSubmit}>
			<input
				className={styles.inputSearch}
				type="text"
				value={value}
				placeholder="Search..."
				onChange={onChange}
			/>
			{/*<Button type="submit">S</Button>*/}
		</form>
	)
}
