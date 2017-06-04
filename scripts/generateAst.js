'use strict';

const path = require('path');
const fs = require('fs-extra');

const rootDirectory = path.join(__dirname, '..');
const outputDirectory = path.join(rootDirectory, 'src', 'parsing');
const templateFile = path.join(__dirname, 'template.txt');

function abbreviatedDirectoryName(directory) {
  return directory.replace(rootDirectory, '');
}

function defineType(type, fields) {
  const className = `${type}Expression`;
  const classFile = path.join(outputDirectory, `${className}.js`);

  console.log(` - ${className} : ${fields.join(', ')}`);

  return fs.readFile(templateFile, 'utf8')
    .then((contents) => fs.writeFile(
      classFile,
      contents.replace(/<CLASSNAME>/g, className)
      .replace(/<ARGUMENTS>/, fields.join(', '))
      .replace(/<ASSIGNMENTS>/, fields.map((f) => `    this._${f} = ${f};`).join('\n'))
      .replace(/<FIELDS>/, fields.map((f) => {
        return [
          `  get ${f}() {`,
          `    return this._${f};`,
          `  }`
        ].join('\n');
      }).join('\n\n'))
    ));
}

function defineAst(definitions) {
  return Promise.all(definitions.map((definition) => {
    const parts = definition.split(':').map((p) => p.trim());

    return defineType(parts[0], parts[1].split(',').map((f) => f.trim()));
  }));
}

function main() {
  console.log(`Cleaning out ${abbreviatedDirectoryName(outputDirectory)}...`);

  fs.emptyDir(outputDirectory)
    .then(() => {
      console.log('Generating AST classes...');

      return defineAst([
        'Binary   : left, operator, right',
        'Grouping : expression',
        'Literal  : value',
        'Unary    : operator, right'
      ]);
    })
    .catch((error) => {
      console.log(error);
    });
}

if(require.main === module) {
  main();
}
