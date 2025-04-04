/** @type {import("eslint").Linter.Config} */
module.exports = {
	extends: ["eslint:recommended", "prettier", "turbo"],
	env: {
		node: true,
	},
	ignorePatterns: [
		// Ignore dotfiles
		".*.js",
		"node_modules/",
		"dist/",
	],
	overrides: [{ files: ["*.js?(x)"] }],
}
