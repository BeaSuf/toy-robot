const tableModule = require("../src/table.js");
const robotModule = require("../src/robot.js");
const commandOperatorModule = require("../src/command-operator");

/**
 * InputController module
 * Parses and triggers the commands for the toy robot
 */
const createInputController = () => {
    const commandOperator = commandOperatorModule.createCommandOpperator();
    const table = tableModule.createTable();
    const robot = robotModule.createRobot();

    /**
     * Commands patterns and options
     */
    const place = /^PLACE\s{1}\d+,\d+,(WEST|NORTH|EAST|SOUTH)$/;
    const actions = ["MOVE", "RIGHT", "LEFT", "REPORT"];

    /**
     * Getter for command-opperator module property
     * @returns {command-opperator} - command-opperator module
     */
    const getCommandOperatorModule = () => {
        return commandOperatorModule;
    }

    /**
     * Getter for table module property
     * @returns {table} - table module
     */
    const getTable = () => {
        return table;
    }

    /**
     * Getter for robot module property
     * @returns {robot} - robot module
     */
    const getRobot = () => {
        return robot;
    }

    /**
     * Parses command. Verifies command's validity. 
     * Ignores invalid command (invalid form or when the robot is nor placed yet and can't respond to the command).
     * @param {string} command 
     */
    const parseCommand = (command) => {
        if(place.test(command)) {
            let [placeAction, x, y, f]  = command.split(/[\s,]+/);       

            triggerCommand(placeAction, parseInt(x), parseInt(y), f);
        }

        if(robot.isInPlace() && actions.includes(command)) {
            const {x, y, f} = robot.getPosition().getPositionProperties();
                            
            triggerCommand(command, x, y, f);
        }               
    }

    /**
     * Triggers command. Verifies command's validity in terms of position. 
     * Ignores invalid command (when command effects robot's position so it extend's table top limits and it can't be triggered because of it).
     * @param {string} command 
     */
    const triggerCommand = (command, x, y, f) => {
        const newPosition = commandOperator[command.toLowerCase()](x, y, f);

        const positionProps = newPosition.getPositionProperties();

        if(table.isPositionValid(positionProps.x, positionProps.y)) {
            robot.setPosition(newPosition);                       
        }
    }

    return {
        getCommandOperatorModule,
        getTable,
        getRobot,
        parseCommand        
    }
}

module.exports = {
    createInputController
}
