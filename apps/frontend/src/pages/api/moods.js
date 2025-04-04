import { moodMapper } from "../../utils/moodMapper"

export default async function handler(req, res) {
	const { method } = req

	const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:1847"
	const apiKey = process.env.STATIC_API_KEY

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`,
		},
	}

	try {
		if (method === "GET") {
			const response = await fetch(`${apiUrl}/moods`, config)

			if (!response.ok) {
				throw new Error(`Fetch failed with status: ${response.status}`)
			}

			const data = await response.json()
			return res.status(200).json(moodMapper(data))
		}

		if (method === "POST") {
			const { type } = req.body
			const response = await fetch(`${apiUrl}/moods`, {
				...config,
				method: "POST",
				body: JSON.stringify({ type }),
			})
			if (!response.ok) {
				throw new Error(`Fetch failed with status: ${response.status}`)
			}

			const data = await response.json()
			return res.status(201).json(moodMapper(data))
		}

		res.setHeader("Allow", ["GET", "POST"])
		return res.status(405).end(`Method ${method} Not Allowed`)
	} catch (error) {
		console.error(
			"Error handling request:",
			error.response?.data || error.message,
		)

		return res.status(500).json({ error: "Internal Server Error" })
	}
}
