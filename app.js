const inquirer = require('inquirer')
const fs = require('fs')
// this expression assigns the anonymous HTML template function in page-template.js to the variable generatePage
const generatePage = require('./src/page-template.js')

// MOCK DATA START
/*
const mockData = {
  name: 'Lernantino',
  github: 'lernantino',
  confirmAbout: true,
  about:
    'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
  projects: [
    {
      name: 'Run Buddy',
      description:
        'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
      languages: ['HTML', 'CSS'],
      link: 'https://github.com/lernantino/run-buddy',
      feature: true,
      confirmAddProject: true
    },
    {
      name: 'Taskinator',
      description:
        'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
      languages: ['JavaScript', 'HTML', 'CSS'],
      link: 'https://github.com/lernantino/taskinator',
      feature: true,
      confirmAddProject: true
    },
    {
      name: 'Taskmaster Pro',
      description:
        'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
      languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
      link: 'https://github.com/lernantino/taskmaster-pro',
      feature: false,
      confirmAddProject: true
    },
    {
      name: 'Robot Gladiators',
      description:
        'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
      languages: ['JavaScript'],
      link: 'https://github.com/lernantino/robot-gladiators',
      feature: false,
      confirmAddProject: false
    }
  ]
}
*/
// MOCK DATA END

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
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an \'About\' section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true
        } else {
          return false
        }
      }
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
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData)
      } else {
        return portfolioData
      }
    })
}

// adding mockData call to skip manual data entry for testing
// const pageHTML = generatePage(mockData)

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    const pageHTML = generatePage(portfolioData)

    fs.writeFile('./index.html', pageHTML, err => {
      // creates an exception and stops the execution of the remaining code
      if (err) throw err

      console.log('Portfolio complete! Check out index.html to see the output.')
    })
  })
