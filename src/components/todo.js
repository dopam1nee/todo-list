import { Button } from './button'
import styles from '../app.module.css'

export const Todo = ({
	title,
	completed,
	isEditing,
	onEdit,
	onTitleChange,
	onCompletedChange,
	onSave,
	onRemove,
}) => {
	return (
		<>
			<input
				className={styles.checkboxTodo}
				type="checkbox"
				checked={completed}
				onChange={({ target }) => onCompletedChange(target.checked)}
			/>

			{isEditing ? (
				<input
					className={styles.title}
					type="text"
					value={title}
					onChange={({ target }) => onTitleChange(target.value)}
				/>
			) : (
				<div className={styles.title} onClick={onEdit}>
					{title}
				</div>
			)}
			{isEditing ? (
				<Button onClick={onSave}>Save</Button>
			) : (
				<Button onClick={onRemove}>Del</Button>
			)}
		</>
	)
}
