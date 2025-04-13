require("dotenv").config()
const sequelize = require("../config/database")

const migrate = async () => {
	try {
		await sequelize.sync()
		const transaction = await sequelize.transaction()

		try {
			await sequelize.query(
				`
				CREATE TABLE IF NOT EXISTS moods (
					id SERIAL PRIMARY KEY,
					type VARCHAR(50) NOT NULL,
					created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
				);
			`,
				{ transaction },
			)

			await transaction.commit()
			console.log("Migration completed successfully.")
		} catch (error) {
			await transaction.rollback()
			console.error("Error during migration, transaction rolled back:", error)
		}
	} catch (error) {
		console.error("dbmigrate: Unable to connect to the database:", error)
		process.exit(1)
	} finally {
		await sequelize.close()
	}
}

migrate()
