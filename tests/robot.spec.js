const robot = require("../src/robot.js");

describe("Robot", () => {
    describe("Initialising", () => {
        test("it should have null as an initial position", () => {
            const testRobot = robot.createRobot();
    
            const received = testRobot.getPosition();
            const expected = null;
            expect(received).toEqual(expected);
        });
    });
});