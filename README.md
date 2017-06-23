# [nlox](https://github.com/h2oboi89/nlox)

Lox interpreter written in Node JS.

Based on Bob Nystrom's Lox book
 - website: <a href="http://craftinginterpreters.com/">Crafting Interpreters</a>
 - github:  <a href="https://github.com/munificent/craftinginterpreters">munificent/craftinginterpreters</a>

## Setup
 - Run `npm install` to install all dependencies

## Running

### File
`node index.js <FILE>`

### REPL
`node index.js`

## Scripts
Following are called via `npm run`:
- `test` to run all tests and generate coverage report
- `test -- -i` same as `test` but ignores linter warnings
- `docClone` to clone your documentation repository
- `docGenerate` to generate documentation locally
- `docPublish` to generate and publish documentation on GitHub Pages
