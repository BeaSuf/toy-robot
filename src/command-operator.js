const positionModule = require("../src/position.js");

const createCommandOpperator = () => {

    const place = (x, y, f) => {        
        return positionModule.createPosition(x, y, f);
    }

    const right = (x, y, f) => {
        return positionModule.createPosition(x, y, turning["right"](f)); 
    }

    const left = (x, y, f) => {
        return positionModule.createPosition(x, y, turning["left"](f)); 
    }

    const move = (x, y, f) => {
        const {_x, _y} = moving[f.toLowerCase()](x, y, 1);
        
        return positionModule.createPosition(_x, _y, f);        
    }

    const report = (x, y, f) => {
        console.log(`Robot's position: ${x},${y},${f}`);

        return positionModule.createPosition(x, y, f);
    }


    // "private"
    const turning = {        
        right(f) {
            
            const directions = {
                NORTH: "EAST",
                EAST: "SOUTH",
                SOUTH: "WEST",
                WEST: "NORTH"
            };

            return directions[f];            
        },

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

    const moving = {
        north(x, y, unit) {
            const coordinates = {
                _x: x,
                _y: y += unit 
            };

            return coordinates;
        },

        east(x, y, unit) {
            const coordinates = {
                _x: x += unit,
                _y: y 
            };

            return coordinates;
        },

        south(x, y, unit) {
            const coordinates = {
                _x: x,
                _y: y -= unit
            };

            return coordinates;
        },

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
    }
}

module.exports = {
    createCommandOpperator
}