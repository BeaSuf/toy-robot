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
        const place = /^PLACE \d+,\d+$/;

        let action = "";
        
        if(place.test(command)) {
            let [placeAction, x, y]  = command.split(/[\s,]+/);
            action = placeAction;

            if(table.isPositionValid(x, y)) {
                robot = robotEntity.createRobot();
                const position = positiionEntity.createPosition(parseInt(x), parseInt(y));
                robot.setPosition(position);
            }             
        }    

        return action;
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
