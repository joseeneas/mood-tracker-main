/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	extends: ["@repo/eslint-config/next.js", "plugin:prettier/recommended"],
	parserOptions: {
		project: true,
		sourceType: "module",
		ecmaVersion: 2022,
	},
}
