import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"

import clsx from "clsx"
import { Inter } from "next/font/google"
import Modal from "../../components/modal/modal"
import Mood from "../../components/mood/mood"
import Sidebar from "../../components/sidebar/sidebar"

const inter = Inter({ subsets: ["latin"] })

async function createMood(newMood) {
	try {
		const response = await fetch("/api/moods", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ type: newMood }),
		})
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
	const [moodList, setMoodList] = useState([])
	const [showModal, setShowModal] = useState(false)
	const router = useRouter()
	const scollToRef = useRef(null)

	useEffect(() => {
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
			setMoodList((currentMood) => [...currentMood, { mood: newMood, date }])
			router.query.mood = newMood
			router.push(router)
			setShowModal(false)
			scollToRef.current.scrollIntoView()
		}
	}

	return (
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
