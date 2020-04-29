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
        const move = /^MOVE$/;
        const left = /^LEFT$/;
        const right = /^RIGHT$/;
        const report = /^REPORT$/;

        let action = "";
        let robotPlaced = false;
        
        if(place.test(command)) {
            let [placeAction, x, y, f]  = command.split(/[\s,]+/);
            action = `${placeAction} ${x},${y},${f}`;

            if(table.isPositionValid(x, y)) {
                robot = robotEntity.createRobot();
                const position = positiionEntity.createPosition(parseInt(x), parseInt(y), f);
                robot.setPosition(position);
                robotPlaced = robot.isInPlace();
            }             
        }    

        if(robotPlaced){
            //TODO implement the commands instead of stubs 
            if(move.test(command)) {
                action = command;
            }

            if(left.test(command)) {
                action = command;
            }

            if(right.test(command)) {
                actoin = command;
            }

            if(report.test(command)) {
                action = command;
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
