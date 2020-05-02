const fs = require("fs");
const inputControllerModule = require("./input-controller.js");

const createToyRobot = () => {
    /**
     * readFile function
     * @param - file name (path) to read the commands from
     * @returns array of commands
     */
    const readFile = (fileName) => {
        fileName = fileName ? fileName : "./test_data/test.txt";

        const commandsList = fs.readFileSync(fileName).toString()

        return commandsList.split('\n');
    }

    /**
     * Operate function - operates the commands for the robot
     * @param fileName - file name (path) to read the commands from
    */
    const operate = (fileName)  => {
        const inputController = inputControllerModule.createInputController();
        
        const commands = readFile(fileName);
        
        commands.forEach(command => {
            inputController.parseCommands(command);       
        });
    } 

    return {
        operate
    }
}


module.exports = {
    createToyRobot
}

