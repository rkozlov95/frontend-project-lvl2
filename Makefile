install:
	npm install
	npm publish --dry-run
	npm link
start:
	npm run build
lint:
	npx eslint .
