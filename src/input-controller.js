const tableEntity = require("../src/table.js");
const robotEntity = require("../src/robot.js");
const positiionEntity = require("../src/position.js");

function createInputController() {
    const table = tableEntity.createTable();
    let robot = null;

    function getTable() {
        return table;
    }

    function getRobot() {
        return robot;
    }

    function parseCommands(command) {
        const place = /^PLACE\s{1}\d+,\d+,(WEST|NORTH|EAST|SOUTH)$/;
        const actions = ["MOVE", "RIGHT", "LEFT", "REPORT"];
                    
        if(!place.test(command) && !actions.includes(command)) {        
            return null;
        }
        
        if(place.test(command)){
            placeCommand(command);
        }

        // If position was not valid, the robot was not created and placed, it should ignore any movement action
        if(robot === null) {
            return null;
        }

        return robot.getPosition().getPosition();
    }

    function placeCommand(command) {
        let [placeAction, x, y, f]  = command.split(/[\s,]+/);
      
        if(table.isPositionValid(x, y)) {
            robot = robotEntity.createRobot();
            const position = positiionEntity.createPosition(parseInt(x), parseInt(y), f);
            robot.setPosition(position); 
        }
    }

    return {
        getTable,
        getRobot,
        parseCommands        
    }
}

module.exports = {
    createInputController
}
