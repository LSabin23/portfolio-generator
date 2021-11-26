const inquirer = require('inquirer')

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true
        } else {
          console.log('Please enter your name!')
          return false
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username. (Required)',
      validate: gitHubUsername => {
        if (gitHubUsername) {
          return true
        } else {
          console.log('Please enter your GitHub Username!')
          return false
        }
      }
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:'
    }
  ])
}

const promptProject = portfolioData => {
  // if there is no 'projects' array, create one
  if (!portfolioData.projects) {
    portfolioData.projects = []
  }
  console.log(`
=================
Add a New Project
=================
`)
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project? (Required)',
        validate: projNameInput => {
          if (projNameInput) {
            return true
          } else {
            console.log('Please enter the name of your project!')
            return false
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: projDescInput => {
          if (projDescInput) {
            return true
          } else {
            console.log('Please enter your project description!')
            return false
          }
        }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: gitHubLink => {
          if (gitHubLink) {
            return true
          } else {
            console.log('Please provide the GitHub Link for your project.')
            return false
          }
        }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
    .then(projectData => {
      portfolioData.projects.push(projectData)
      if(projectData.confirmAddProject) {
        return promptProject(portfolioData)
      } else {
        return portfolioData
      }
    })
}

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData)
  })

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
