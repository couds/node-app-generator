#!/usr/bin/env node

const inquirer = require('inquirer');
const mkdirp = require('mkdirp');
const fs = require('fs');
const exec = require('child_process').execSync;

const CURR_DIR = process.cwd();
const CHOICES = fs.readdirSync(`${__dirname}/templates`);

function createDirectoryContents (projectName, templatePath, newProjectPath) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;
    
    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8').replace(/project__name__/g, projectName);
      
      file = file.replace(/^_/, '');

      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, {
        encoding: 'utf8',
        mode: '0755',
      });
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`, { mode: '0755' });
      
      // recursive call
      createDirectoryContents(projectName, `${templatePath}/${file}`, `${newProjectPath}/${file}`);
    }
  });
}

const QUESTIONS = [
  {
    name: 'project-choice',
    type: 'list',
    message: 'What project template would you like to generate?',
    choices: CHOICES
  },
  {
    name: 'project-name',
    type: 'input',
    message: 'Project name:',
    validate: function (input) {
      if (/^([a-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include lowercase letters, numbers, underscores and hashes.';
    }
  },
  {
    name: 'project-folder',
    type: 'input',
    message: 'Project folder:',
    default: (answers) => {

      return `${answers['project-name']}`;
    },
    validate: function (input) {
      if (/^([a-z\-\_\/\d])+$/.test(input)) return true;
      else return 'Project folder may only include lowercase letters, numbers, underscores and hashes.';
    }
  }
];

inquirer.prompt(QUESTIONS)
  .then(async (answers) => {
    const projectChoice = answers['project-choice'];
    const projectName = answers['project-name'];
    const projectFolder = answers['project-folder'];
    const templatePath = `${__dirname}/templates/${projectChoice}`;

    try {
      mkdirp.sync(`${CURR_DIR}/${projectFolder}`);
    } catch (e) {
      
    }

    createDirectoryContents(projectName, templatePath, projectFolder);

    exec(`cd ${projectFolder} && git init && git add . && git commit -m "initial boilerplate" && git tag 0.0.1-0 -a -m "initial boilerplate 0.0.1-beta1"`);

    console.log(`
    The project was created successfully in ${projectFolder}.
    `)
  });