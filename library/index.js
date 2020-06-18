var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());



const Engineer = require("./Engineer");
const Intern = require("./Intern");
const Manager = require("./Manager");
const inquirer = require("inquirer");
const path = require("path")
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

app.get("/", function(res, res) {
  res.sendFile(path.join(__dirname, "htmlTemplate"))
})




const render = require("./htmlTemplate");

const teamArray = [];
const idArray = [];

function executeQuestions() {

    function createManager() {
        console.log("Please Build your Team")
        inquirer.prompt([
            {
                type: "input",
                name: "managersname",
                message: "What is your manager´s name?"

                // validate: answer => {
                // if(answer !== "") {
                //     return true;
                // }
                // return "Enter at least one character"
                // }
            },
            {
                type: "input",
                name: "managerId",
                message: "What is your manager's id?",
                // validate: answer => {
                // const validation = answer.match(
                //     /^[1-9]\d*$/
                // );
                // if (validation) {
                //     return true;
                // }
                //     return "Please enter a positive number greater than zero.";
                // }       
            },
            {
                type: "input",
                name: "managersemail",
                message: "What is your manager´s e-mail?"
            },
            {
                type: "input",
                name: "managersnumber",
                message: "What is your manager´s office number?"
            }
            
        ]).then(response => {
            const manager = new Manager(response.managersname, response.managerId, response.managersemail, response.managersnumber);
            teamArray.push(manager);
            console.log(teamArray);
            idArray.push(manager.managerID);
            createTeam();
        })
    }

    function createTeam() {

        inquirer.prompt([
          {
            type: "list",
            name: "memberChoice",
            message: "Which type of team member would you like to add?",
            choices: [
              "Engineer",
              "Intern",
              "I don't want to add any more team members"
            ]
          }
        ]).then(userChoice => {
          switch(userChoice.memberChoice) {
          case "Engineer":
            addEngineer();
            break;
          case "Intern":
            addIntern();
            break;
          default:
            buildTeam();
          }
        });
      }

    function buildTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
          }
          fs.writeFileSync(outputPath, render(teamArray), "utf-8");
    }
    createManager();
}

executeQuestions();



