const fs = require('fs')
const generatePage = require('./src/page-template.js')

const profileDataArgs = process.argv.slice(2, process.argv.length)

const [name, github] = profileDataArgs

fs.writeFile('./index.html', generatePage(name, github), err => {
  // creates an exception and stops the execution of the remaining code
  if (err) throw new Error(err)

  console.log('Portfolio complete! Check out index.html to see the output.')
})
