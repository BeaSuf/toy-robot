const positionModule = require("../src/position.js");

/**
 * CommandOpperator module
 * Commands for the toy robot
 */
const createCommandOpperator = () => {

    /**
     * Will put the toy robot on the table in position x,y and f (facing)  NORTH, SOUTH, EAST or WEST.
     * @param {} x - current x coordinate
     * @param {*} y - current y coordinate 
     * @param {*} f - current facing direction 
     * @returns {position} Position module
     */
    const place = (x, y, f) => {        
        return positionModule.createPosition(x, y, f);
    };

    /**
     * Will rotate the robot 90 degrees clockwise direction without changing the position of the robot.
     * @param {} x - current x coordinate
     * @param {*} y - current y coordinate 
     * @param {*} f - current facing direction 
     * @returns {position} Position module
     */
    const right = (x, y, f) => {
        return positionModule.createPosition(x, y, turning["right"](f)); 
    };

    /**
     * Will rotate the robot 90 degrees counter-clockwise direction without changing the position of the robot.
     * @param {} x - current x coordinate
     * @param {*} y - current y coordinate 
     * @param {*} f - current facing direction 
     * @returns {position} Position module
     */
    const left = (x, y, f) => {
        return positionModule.createPosition(x, y, turning["left"](f)); 
    };

    /**
     * Will move the toy robot one unit forward in the direction it is currently facing.
     * @param {} x - current x coordinate
     * @param {*} y - current y coordinate 
     * @param {*} f - current facing direction 
     * @returns {position} Position module
     */
    const move = (x, y, f) => {
        const {_x, _y} = moving[f.toLowerCase()](x, y, 1);
        
        return positionModule.createPosition(_x, _y, f);        
    };

    /**
     * Will announce the x,y and f (facing) of the robot. 
     * @param {} x - current x coordinate
     * @param {*} y - current y coordinate 
     * @param {*} f - current facing direction 
     * @returns {position} Position module
     */
    const report = (x, y, f) => {
        console.log(`Robot's position: ${x},${y},${f}`);

        return positionModule.createPosition(x, y, f);
    };


    // "private"

    /**
     * Determines the facing direction when turning
     */
    const turning = {
        /**
         * Determines the facing direction when turning right (clockwise)
         * @param {string} f 
         * @returns {string} - the facing direction for each of the options of original (received) facing directions 
         */        
        right(f) {
            
            const directions = {
                NORTH: "EAST",
                EAST: "SOUTH",
                SOUTH: "WEST",
                WEST: "NORTH"
            };

            return directions[f];            
        },

        /**
         * Determines the facing direction when turning left (counter-clockwise)
         * @param {string} f 
         * @returns {string} - the facing direction for each of the options of original (received) facing directions 
         */     
        left(f) {
            
            const directions = {
                NORTH: "WEST",
                WEST: "SOUTH",
                SOUTH: "EAST",
                EAST: "NORTH"
            };

            return directions[f];
        }
    };

    /**
     * Determines the x or y coordinates when moving on the table top for the current facing direction
     */
    const moving = {
        /**
         * Will increment y coordinate by number of units when fasing NORTH.
         * @param {} x - current x coordinate
         * @param {*} y - current y coordinate 
         * @param {*} unit - number of steps to move
         */
        north(x, y, unit) {
            const coordinates = {
                _x: x,
                _y: y += unit 
            };

            return coordinates;
        },

        /**
         * Will increment x coordinate by number of units when fasing EAST.
         * @param {} x - current x coordinate
         * @param {*} y - current y coordinate 
         * @param {*} unit - number of steps to move
         */
        east(x, y, unit) {
            const coordinates = {
                _x: x += unit,
                _y: y 
            };

            return coordinates;
        },

        /**
         * Will decrement y coordinate by number of units when fasing SOUTH.
         * @param {} x - current x coordinate
         * @param {*} y - current y coordinate 
         * @param {*} unit - number of steps to move
         */
        south(x, y, unit) {
            const coordinates = {
                _x: x,
                _y: y -= unit
            };

            return coordinates;
        },

         /**
         * Will decrement x coordinate by number of units when fasing WEST.
         * @param {} x - current x coordinate
         * @param {*} y - current y coordinate 
         * @param {*} unit - number of steps to move
         */
        west(x, y, unit) {
            const coordinates = {
                _x: x -= unit,
                _y: y 
            };

            return coordinates;
        }
    };

    return {
        place,
        right,
        left,
        move,
        report
    };
}

module.exports = {
    createCommandOpperator
};