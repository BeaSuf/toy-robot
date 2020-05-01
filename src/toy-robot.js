const fs = require("fs");
const inputControllerEntity = require("../src/input-controller.js");

function readFile(){
    const fileName = process.argv.slice(2)[0];
    
    return fs.readFileSync(fileName).toString();
}

function operate(commandsList) {
    const inputController = inputControllerEntity.createInputController();
    
    const commands = commandsList.split('\n');

    commands.forEach(command => {
        command = command.trim();
        if(command !== '') {
            inputController.parseCommands(command);
        }
    });
} 

const commandsList = readFile();
operate(commandsList);
