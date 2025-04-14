const express                  = require("express")
const { createMood, getMoods } = require("./mood.controller")
const router                   = express.Router()

router.post("/moods", createMood)
router.get("/moods", getMoods)

module.exports = router
