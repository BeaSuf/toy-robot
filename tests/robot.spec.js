const robot = require("../src/robot.js");
const position = require("../src/position.js");

describe("Robot", () => {
    describe("Initialising", () => {
        test("it should have null as an initial position", () => {
            const testRobot = robot.createRobot();
    
            const received = testRobot.getPosition();
            expect(received).toBeNull();
        });
    });

    describe("Position Handlers", () => {
        test("it should set robot's position to a new position", () => {
            const testRobot = robot.createRobot();

            const newPosition = position.createPosition(0, 0);
            
            testRobot.setPosition(newPosition.getPosition());
            
            const received = testRobot.getPosition();
            const expected = newPosition.getPosition();
            expect(received).toEqual(expected);
            expect(received).toEqual({x: 0, y:0});
        });

        test("it should return robot's position as null if new position is null", () => {
            const testRobot = robot.createRobot();

            const newPosition = null;
            
            testRobot.setPosition(newPosition);
            
            const received = testRobot.getPosition();
            expect(received).toBeNull();
        });
    });

    describe("isInPlace", () => {
        test("it should return true if position is not null", () => {
            const testRobot = robot.createRobot();

            const newPosition = position.createPosition(0, 0);
            
            testRobot.setPosition(newPosition.getPosition());
            
            expect(testRobot.isInPlace()).toBeTruthy();
        });

        test("it should return false if position is null", () => {
            const testRobot = robot.createRobot();

            expect(testRobot.isInPlace()).toBeFalsy();
        });
    });
});