import { Button } from './button'
import { Search } from './search'
import { Sorting } from './sorting'
import styles from '../app.module.css'

export const ControlPanel = ({ onTodoAdd, onSearch, onSorting }) => {
	return (
		<div className={styles.controlPanel}>
			<Search onSearch={onSearch} />
			<Sorting onSorting={onSorting} />
			<Button onClick={onTodoAdd}>Add</Button>
		</div>
	)
}
