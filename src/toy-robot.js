const fs = require("fs");
const inputControllerModule = require("../src/input-controller.js");

const readFile = () => {
    const fileName = process.argv.slice(2)[0];
    
    return fs.readFileSync(fileName).toString();
}

const operate = (commandsList)  => {
    const inputController = inputControllerModule.createInputController();
    
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
