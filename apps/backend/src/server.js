require("dotenv").config()
const app = require("./app")
const PORT = process.env.PORT || 1847

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
