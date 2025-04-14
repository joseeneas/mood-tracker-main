require("dotenv").config()
const sequelize = require("../config/database")
const Mood      = require("../mood/mood.model")

const seed = async () => {
	try {
		await sequelize.sync({ force: true })

		await Mood.bulkCreate([
			{ type: "pleasant" },
			{ type: "sad" },
			{ type: "excited" },
			{ type: "pleasant" },
			{ type: "sad" },
			{ type: "excited" },
			{ type: "pleasant" },
			{ type: "sad" },
			{ type: "excited" },
		])

		console.log("Database seeded!")
		process.exit(0)
	} catch (err) {
		console.error("Error seeding database:", err)
		process.exit(1)
	}
}

seed()
