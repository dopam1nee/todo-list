import { useState } from 'react'
import styles from '../app.module.css'

export const Sorting = ({ onSorting }) => {
	const [isEnabled, setIsEnabled] = useState(false)

	const onChange = ({ target }) => {
		setIsEnabled(target.checked)
		onSorting(target.checked)
	}

	return (
		<>
			<input
				className={styles.checkboxSort}
				id="sorting-button"
				type="checkbox"
				checked={isEnabled}
				onChange={onChange}
			/>
			{/*<label htmlFor="sorting-button">↓</label>*/}
		</>
	)
}
