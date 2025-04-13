import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import clsx from "clsx"
import { Inter } from "next/font/google"
import Modal from "../../components/modal/modal"
import Mood from "../../components/mood/mood"
import Sidebar from "../../components/sidebar/sidebar"

const inter = Inter({ subsets: ["latin"] })
// ----------
// Comment #2
// Recommendation: #3
// ----------
async function createMood(newMood) {
	try {
		const response = await fetch("/api/moods", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ type: newMood }),
		})
		// ----------
		// Comment #3
		// Recommendation: #2
		// ----------
		if (!response.ok) {
			throw new Error("Failed to create mood")
		}
		const data = await response.json()
		return data
	} catch (error) {
		console.error("Error creating mood:", error)
	}
}

export default function Home() {
	// ----------
	// Comment #4
	// ----------
	const [moodList, setMoodList] = useState([])
	const [showModal, setShowModal] = useState(false)
	const router = useRouter()
	// ----------
	// Comment #5
	// Comment #9
	// Recommendation: #1
	// ----------
	const scollToRef = useRef(null)
	useEffect(() => {
		// ----------
		// Recommendation: #5
		// ----------
		async function fetchMoods() {
			try {
				const response = await fetch("/api/moods")
				const data = await response.json()
				if (data) setMoodList(data)
			} catch (error) {
				console.error("Error fetching moods:", error)
			}
		}
		fetchMoods()
	}, [])
	// This function is called when the user selects a mood from the modal
	const setNewMood = async (newMood) => {
		const date = new Date()
		const createdMood = await createMood(newMood)
		if (createdMood) {
			// ----------
			// Comment #6
			// Recommendation: #6
			// ----------
			setMoodList((currentMood) => [...currentMood, { mood: newMood, date }])
			// ----------
			// Comment #7
			// Recommendation: #4
			// ----------
			router.query.mood = newMood
			router.push(router)
			setShowModal(false)
			scollToRef.current.scrollIntoView()
		}
	}
	return (
		// ----------
		// Comment #8
		// ----------
		<main className={clsx(inter.className, "main")}>
			<Modal
				showModal={showModal}
				setNewMood={setNewMood}
				closeModal={() => setShowModal(false)}
			/>
			<Mood />
			<Sidebar moodList={moodList} setShowModal={setShowModal}>
				<div ref={scollToRef} />
			</Sidebar>
		</main>
	)
}
