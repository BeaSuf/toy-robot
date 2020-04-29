const inputController = require("../src/input-controller.js");

describe("Input-Controller", () => {
    describe("Initialising", () => {
        test("it should have table property that is not null and has default width and heigh equal to 5", () => { 
            const testInputController = inputController.createInputController();
        
            const table = testInputController.getTable();
                                   
            expect(table).not.toBeNull();
            expect(table.getWidth()).toEqual(5);
            expect(table.getHeight()).toEqual(5);
        });

        test("it should have null as robot property", () => { 
            const testInputController = inputController.createInputController();
        
            const robot = testInputController.getRobot();
            
            expect(robot).toBeNull();            
        });
    });

    describe("parseCommands", () => {
        describe("place command", () => {
            test("it should return robot's position matching the command the 'PLACE' command", () => {
                const testInputController = inputController.createInputController();

                const received = testInputController.parseCommands("PLACE 1,2,NORTH");

                expect(received).toEqual({x:1, y:2, f:"NORTH"});
            });

            test("it should return null for the robot if the command does not matches the 'PLACE' command patern", () => {
                const testInputController = inputController.createInputController();

                testInputController.parseCommands("PLACE_ME 1,2,FACING_NORTH");

                const robot = testInputController.getRobot();

                expect(robot).toBeNull();
            });

            test("it should create a robot and place it on the table if position is valid", () => {
                const testInputController = inputController.createInputController();

                testInputController.parseCommands("PLACE 1,2,NORTH");

                const robot = testInputController.getRobot();

                expect(robot).not.toBeNull();
            });

            test("it should return robot's position if position is valid", () => {
                const testInputController = inputController.createInputController();

                testInputController.parseCommands("PLACE 1,2,NORTH");

                const robot = testInputController.getRobot();

                expect(robot.getPosition()).not.toBeNull();
                expect(robot.getPosition().getPosition()).toEqual({x: 1, y: 2, f: "NORTH"});
            });
            
            test("it should return true for 'isInPlace' when position is valid", () => {
                const testInputController = inputController.createInputController();

                testInputController.parseCommands("PLACE 1,2,NORTH");

                const robot = testInputController.getRobot();

                expect(robot.isInPlace()).toBeTruthy();                
            });

            test("it should return null for robot property if possition is invalid", () => {
                const testInputController = inputController.createInputController();

                testInputController.parseCommands("PLACE 5,5,NORTH");

                const robot = testInputController.getRobot();

                expect(robot).toBeNull();
            });
        });

        describe("Movement commands", () => {
            test("it should ignore any illigal movement command", () => {
                const testInputController = inputController.createInputController();
                testInputController.parseCommands("MOVE1");

                expect(testInputController.getRobot()).toBeNull();
            }); 

            test("it should ignore any movement command when PLACE commmand is invalid and robot was not placed", () => {
                const testInputController = inputController.createInputController();

                testInputController.parseCommands("PLACE 5,5,NORTH");
                
                testInputController.parseCommands("MOVE");

                expect(testInputController.getRobot()).toBeNull();
            });

            test("it should ignore any movement command before PLACE command", () => {
                const testInputController = inputController.createInputController();
                               
                testInputController.parseCommands("RIGHT");
                
                expect(testInputController.getRobot()).toBeNull();
            });
        });
    });

});