const Mood = require("./mood.model")

const createMood = async (req, res) => {
	try {
		const { type } = req.body
		if (!["pleasant", "sad", "excited"].includes(type)) {
			return res.status(400).json({ error: "Invalid mood type" })
		}
		const mood = await Mood.create({ type })
		res.status(201).json(mood)
	} catch (error) {
		console.error("Error creating mood:", error)
		res.status(500).json({ error: "Internal server error" })
	}
}

const getMoods = async (_, res) => {
	try {
		const moods = await Mood.findAll()
		res.status(200).json(moods)
	} catch (error) {
		console.error("Error retrieving moods:", error)
		res.status(500).json({ error: "Internal server error" })
	}
}

module.exports = { createMood, getMoods }
