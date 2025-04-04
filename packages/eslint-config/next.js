/** @type {import("eslint").Linter.Config} */
module.exports = {
	extends: [
		"eslint:recommended",
		require.resolve("@vercel/style-guide/eslint/next"),
		"turbo",
		"next/core-web-vitals",
		"plugin:react/recommended",
		"prettier",
	],
	globals: {
		React: true,
		JSX: true,
	},
	env: {
		node: true,
		browser: true,
	},
	parser: "@babel/eslint-parser",
	parserOptions: {
		requireConfigFile: false,
		babelOptions: {
			presets: ["next/babel"],
		},
	},
	ignorePatterns: [
		// Ignore dotfiles
		".*.js",
		"node_modules/",
	],
	overrides: [{ files: ["*.js?(x)"] }],
	plugins: ["react"],
	rules: {
		"react/react-in-jsx-scope": "off",
		"react/prop-types": "off",
	},
	settings: {
		react: {
			version: "detect",
		},
	},
}
