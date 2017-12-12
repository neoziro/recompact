/* eslint-disable import/no-extraneous-dependencies, no-template-curly-in-string */
import fs from 'fs-extra'
import path from 'path'
import docdown from 'docdown'

const basePath = path.join(__dirname, '..')
const docPath = path.join(basePath, 'docs')
const srcPath = path.join(basePath, 'src')
const readmePath = path.join(docPath, 'README.md')

const pkg = require('../package.json')

const { version } = pkg

const modules = fs
  .readdirSync(srcPath)
  .filter(file => file.match(/\.js$/) && !file.match('index.js'))
  .map(file => file.replace('.js', ''))

const config = {
  title: `<a href="https://github.com/neoziro/recompact/">recompact</a> <span>v${version}</span>`,
  toc: 'categories',
  style: 'github',
  files: modules.map(name => ({
    path: path.join(basePath, 'src', `${name}.js`),
    url: `https://github.com/neoziro/recompact/blob/v${version}/src/${name}.js`,
  })),
  sourceLink: '[&#x24C8;](${sourceHref})',
  tocLink: '',
}

/**
 * Post-process `markdown` to make adjustments.
 *
 * @private
 * @param {string} markdown The markdown to process.
 * @returns {string} Returns the processed markdown.
 */
function postprocess(markdown) {
  return (
    markdown
      // Wrap symbol property identifiers in brackets.
      .replace(/\.(Symbol\.(?:[a-z]+[A-Z]?)+)/g, '[$1]')
      // Remove br
      .replace(/\n<br>/g, '')
      .replace(/(<\/h3>)/g, '$1\n')
  )
}

/*----------------------------------------------------------------------------*/

/**
 * Creates the documentation markdown formatted for 'github' or 'site'.
 *
 * @private
 */
function build() {
  const markdown = docdown(config)
  fs.writeFile(readmePath, postprocess(markdown), error => {
    if (error) {
      throw error
    }
  })
}

build()
