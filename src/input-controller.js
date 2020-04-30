const tableEntity = require("../src/table.js");
const robotEntity = require("../src/robot.js");
const positiionEntity = require("../src/position.js");

function createInputController() {
    const table = tableEntity.createTable();
    let robot = null;

    const place = /^PLACE\s{1}\d+,\d+,(WEST|NORTH|EAST|SOUTH)$/;
    const actions = ["MOVE", "RIGHT", "LEFT", "REPORT"];

    function getTable() {
        return table;
    }

    function getRobot() {
        return robot;
    }

    function parseCommands(command) {
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

        const robotCurrentPosition = robot.getPosition().getPosition();

        switch (command) {
            case "RIGHT":
            case "LEFT":
                turn(command, robotCurrentPosition);
                break;  
            case "MOVE":
                move(robotCurrentPosition);       
                break;
            case "REPORT":   
                report();
                break;
            default:
                break;
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

    function turn(command, {x, y, f}) {
        const newFacingDirection = turning[command.toLowerCase()](f);

        const position = positiionEntity.createPosition(x, y, newFacingDirection);
                
        if(table.isPositionValid(x, y)) {
            robot.setPosition(position); 
        }
    }

    const turning = {        
        right(f) {
            let newFacingDirection = "";

            switch (f) {
                case "NORTH":
                    newFacingDirection = "EAST";
                    break;
                case "EAST":
                    newFacingDirection = "SOUTH";
                    break;
                case "SOUTH":
                    newFacingDirection = "WEST";
                    break;
                case "WEST":
                    newFacingDirection = "NORTH";
                    break;                
            
                default:
                    break;
            }

            return newFacingDirection;
        },

        left(f) {
            let newFacingDirection = "";

            switch (f) {
                case "NORTH":
                    newFacingDirection = "WEST";
                    break;
                case "WEST":
                    newFacingDirection = "SOUTH";
                    break;
                case "SOUTH":
                    newFacingDirection = "EAST";
                    break;
                case "EAST":
                    newFacingDirection = "NORTH";
                    break;                
            
                default:
                    break;
            }

            return newFacingDirection;
        }
    }

    function move({x, y, f}) {
        
        switch (f) {
            case "NORTH":
                y++;
                break;
            case "EAST":
                x++;
                break;
            case "SOUTH":
                y--;
                break;
            case "WEST":
                x--;
                break; 
            default:
                break;
        }

        const position = positiionEntity.createPosition(x, y, f);
        
        if(table.isPositionValid(x, y)) {
            robot.setPosition(position); 
        }
    }

    function report() {
        const {x, y, f} = robot.getPosition().getPosition();
        console.log(`Robot's position: ${x},${y},${f}`);        
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
