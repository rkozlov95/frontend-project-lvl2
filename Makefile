install:
	npm install
	npm publish --dry-run
	npm link
build:
	npm run build
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npm test -- --coverage
