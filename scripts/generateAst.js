'use strict';

const path = require('path');
const fs = require('fs-extra');
const klaw = require('klaw');

const rootDirectory = path.join(__dirname, '..');
const outputDirectory = path.join(rootDirectory, 'src', 'parsing');
const gitIgnoreFile = path.join(outputDirectory, '.gitignore');

function abbreviatedDirectoryName(directory) {
  return directory.replace(rootDirectory, '');
}

function defineType(type, fields) {
  const className = `${type}Expression`;
  const classFile = path.join(outputDirectory, `${className}.js`);

  console.log(` - ${type} : ${fields.join(', ')} -> ${abbreviatedDirectoryName(classFile)}`);

  const fileContents = [
    `'use strict';`,
    ``,
    `class ${className} {`,
    `  constructor(${fields.join(', ')}) {`,
    fields.map((f) => `    this._${f} = ${f};`).join('\n'),
    `  }`,
    ``,
    fields.map((f) => {
      return [
        `  get ${f}() {`,
        `    return this._${f};`,
        `  }`
      ].join('\n');
    }).join('\n\n'),
    `}`,
    ``,
    `module.exports = ${className};`
  ];

  return fs.ensureFile(classFile)
    .then(() => fs.appendFile(classFile, `${fileContents.join('\n')}\n`));
}

function defineAst(definitions) {
  return Promise.all(definitions.map((definition) => {
    const parts = definition.split(':').map((p) => p.trim());

    return defineType(parts[0], parts[1].split(',').map((f) => f.trim()));
  }));
}

function main() {
  new Promise((resolve) => {
      const items = [];

      klaw(outputDirectory)
        .on('readable', function() {
          let item;

          while((item = this.read())) {
            if(item.path === outputDirectory || item.path === gitIgnoreFile) {
              continue;
            }
            items.push(item.path);
          }
        })
        .on('end', () => {
          resolve(items);
        });
    })
    .then((paths) => {
      console.log(`Cleaning out ${abbreviatedDirectoryName(outputDirectory)}...`);

      return Promise.all(paths.map((p) => fs.remove(p)));
    })
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
