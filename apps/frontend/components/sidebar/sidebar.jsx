import { useRouter } from "next/router"
import MoodPreview from "./mood-preview"
import styles from "./sidebar.module.css"

export default function Sidebar({ moodList = [], setShowModal, children }) {
	const router = useRouter()

	const updateSelectedMood = (newMood) => {
		router.query.mood = newMood
		router.push(router)
	}

	return (
		<div className={styles.sidebar} suppressHydrationWarning>
			<div className={styles["sidebar__list"]}>
				<div className={styles.scrollable}>
					{moodList.map(({ mood, date }, index) => (
						<MoodPreview
							key={`mood-preview-${date}-${mood}-${index}`}
							mood={mood}
							date={date}
							updateSelectedMood={updateSelectedMood}
						/>
					))}
					{children}
				</div>
			</div>
			<div className={styles["sidebar__footer"]}>
				<button
					className={styles["sidebar__add_button"]}
					onClick={() => setShowModal((current) => !current)}
				>
					Log Mood
				</button>
			</div>
		</div>
	)
}
