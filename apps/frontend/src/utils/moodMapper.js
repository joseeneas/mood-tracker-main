const baseMoodMapper = ({ id, type, createdAt }) => ({
	id,
	mood: type,
	date: createdAt,
})

export const moodMapper = (data) => {
	if (Array.isArray(data)) {
		return data.map((mood) => baseMoodMapper(mood))
	}

	return baseMoodMapper(data)
}
