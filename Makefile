install:
	npm install
	npm publish --dry-run
	npm link
start:
	npm run build
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npm test -- --coverage
run:
	dist/bin/gendiff.js __fixtures__/before.ini __fixtures__/after.ini
