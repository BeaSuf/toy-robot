const tableModule = require("../src/table.js");
const robotModule = require("../src/robot.js");
const commandOperatorModule = require("../src/command-operator");

const createInputController = () => {
    const commandOperator = commandOperatorModule.createCommandOpperator();
    const table = tableModule.createTable();
    const robot = robotModule.createRobot();;

    const place = /^PLACE\s{1}\d+,\d+,(WEST|NORTH|EAST|SOUTH)$/;
    const actions = ["MOVE", "RIGHT", "LEFT", "REPORT"];

    const getCommandOperatorModule = () => {
        return commandOperatorModule;
    }

    const getTable = () => {
        return table;
    }

    const getRobot = () => {
        return robot;
    }

    const parseCommands = (command) => {
        if(place.test(command)) {
            let [placeAction, x, y, f]  = command.split(/[\s,]+/);       

            triggerCommands(placeAction, parseInt(x), parseInt(y), f);
        }

        if(robot.isInPlace() && actions.includes(command)) {
            const {x, y, f} = robot.getPosition().getPositionProperties();
                            
            triggerCommands(command, x, y, f);
        }               
    }

    const triggerCommands = (command, x, y, f) => {
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
        parseCommands        
    }
}

module.exports = {
    createInputController
}
