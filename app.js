const inquirer = require('inquirer')

inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    }
  ])
  .then(answers => console.log(answers))

/*
commenting out this code since we don't need it for the rest of this lesson

const fs = require('fs')
const generatePage = require('./src/page-template.js')

const pageHTML = generatePage(name, github)

fs.writeFile('./index.html', pageHTML, err => {
  // creates an exception and stops the execution of the remaining code
  if (err) throw err

  console.log('Portfolio complete! Check out index.html to see the output.')
})
*/
