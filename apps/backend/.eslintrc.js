/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	extends: ["@repo/eslint-config/library.js"],
	parserOptions: {
		project: true,
		sourceType: "module",
		ecmaVersion: 2022,
	},
}
