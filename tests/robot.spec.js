const robotModule = require("../src/robot.js");
const positionModule = require("../src/position.js");

describe("Robot", () => {
    describe("Initialising", () => {
        test("it should have null as an initial position", () => {
            const robot = robotModule.createRobot();
    
            const position = robot.getPosition();
            
            expect(position).toBeNull();
        });
    });

    describe("Position Handlers", () => {
        test("it should set robot's position to a new position", () => {
            const robot = robotModule.createRobot();

            const position = positionModule.createPosition(0, 0, "NORTH");
            
            robot.setPosition(position.getPositionProperties());
            
            const robotPosition = robot.getPosition();
                    
            expect(robotPosition).toEqual({x: 0, y: 0, f: "NORTH"});
        });

        test("it should return robot's position as null if new position is null", () => {
            const robot = robotModule.createRobot();

            const position = null;
            
            robot.setPosition(position);
            
            const robotPosition = robot.getPosition();
            
            expect(robotPosition).toBeNull();
        });
    });

    describe("isInPlace", () => {
        test("it should return true if position is not null", () => {
            const robot = robotModule.createRobot();

            const position = positionModule.createPosition(0, 0, "NORTH");
            
            robot.setPosition(position.getPositionProperties());
            
            expect(robot.isInPlace()).toBeTruthy();
        });

        test("it should return false if position is null", () => {
            const robot = robotModule.createRobot();

            expect(robot.isInPlace()).toBeFalsy();
        });
    });
});