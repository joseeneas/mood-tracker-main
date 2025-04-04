import { Player } from "@lottiefiles/react-lottie-player"
import { useRouter } from "next/router"
import Fallback from "./fallback"

import clsx from "clsx"
import BackgroundExcited from "../backgrounds/background-excited"
import BackgroundPleasant from "../backgrounds/background-pleasant"
import BackgroundSad from "../backgrounds/background-sad"
import styles from "./mood.module.css"

const moodsAvailable = {
	pleasant: {
		title: "You're feeling pleasant",
		message:
			"Feeling on top of the world, are we? Must be all those endorphins doing their happy dance!",
	},
	excited: {
		title: "You're feeling excited",
		message:
			"Buckle up, buttercup! Someone's got an extra sparkle in their step today!",
	},
	sad: {
		title: "You're feeling sad",
		message:
			"Got the blues, huh? Remember, even clouds have silver linings. We're here for you.",
	},
}

export default function Mood() {
	const router = useRouter()
	const userMood = router.query.mood
	const isValidMood = Object.keys(moodsAvailable).includes(userMood)

	if (!isValidMood) return <Fallback />

	const currentMood = moodsAvailable[userMood]

	return (
		<div className={clsx(styles.mood, styles[userMood])}>
			<div className={styles.foreground}>
				<div className={styles.content}>
					<p className={styles.eyebrow}>Current Mood</p>
					<p className={styles.title}>{currentMood.title}</p>
					<p className={styles.message}>{currentMood.message}</p>
				</div>
				<div className={styles.video}>
					<div className={styles["emoji-group"]}>
						{Object.keys(moodsAvailable).map((mood) => (
							<Player
								autoplay
								loop
								key={mood}
								src={`/assets/animations/${mood}.json`}
								style={{ height: "300px", widthpx: "300px" }}
								className={clsx(styles.emoji, {
									[styles["emoji--active"]]: mood === userMood,
								})}
							/>
						))}
					</div>
				</div>
			</div>
			<div className={styles.background}>
				<BackgroundPleasant isActive={userMood === "pleasant"} />
				<BackgroundSad isActive={userMood === "sad"} />
				<BackgroundExcited isActive={userMood === "excited"} />
			</div>
		</div>
	)
}
