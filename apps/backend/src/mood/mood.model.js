const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Mood = sequelize.define(
	"mood",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		type: {
			type: DataTypes.ENUM("pleasant", "sad", "excited"),
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: false,
		},
	},
	{
		timestamps: false,
	},
)

module.exports = Mood
