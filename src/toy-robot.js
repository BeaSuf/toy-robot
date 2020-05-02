const fs = require("fs");
const inputControllerModule = require("./input-controller.js");

/**
 * ToyRobot module
 * Operates the commands read from a test file
 */
const createToyRobot = () => {

    /**
     * Reads list of commands from file 
     * @param {*} fileName - file name (path) to read the commands from
     * @returns {array} commands array
     */
    const readFile = (fileName) => {
        fileName = fileName ? fileName : "./test_data/test.txt";

        const commandsList = fs.readFileSync(fileName).toString()

        return commandsList.split('\n');
    }

    /**
     * Operates the commands from file
     * @param fileName - file name (path) to read the commands from
    */
    const operate = (fileName)  => {
        const inputController = inputControllerModule.createInputController();
        
        const commands = readFile(fileName);
        
        commands.forEach(command => {
            inputController.parseCommand(command);       
        });
    } 

    return {
        operate
    }
}


module.exports = {
    createToyRobot
}

