const express = require("express")
const bodyParser = require("body-parser")
const moodRoutes = require("./mood/mood.routes")
const sequelize = require("./config/database")
const authenticate = require("./authMiddleware")
const dotenv = require("dotenv")

dotenv.config()

const env = process.env.NODE_ENV || "development"
dotenv.config({ path: `.env.${env}` })

const app = express()

app.use(bodyParser.json())
app.use(authenticate)
app.use("/", moodRoutes)

sequelize
	.sync()
	.then(() => console.log("Database connected 🚀"))
	.catch((err) => console.error("apps: Unable to connect to the database:", err))

module.exports = app
