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

        describe("Movement and REPORT commands", () => {
            test("it should ignore any illigal movement or report command", () => {
                const testInputController = inputController.createInputController();
                testInputController.parseCommands("MOVE 1");

                expect(testInputController.getRobot()).toBeNull();
            }); 

            test("it should ignore any movement or report command when PLACE commmand is invalid and robot was not placed", () => {
                const testInputController = inputController.createInputController();

                testInputController.parseCommands("PLACE 5,5,NORTH");
                
                testInputController.parseCommands("LEFT");

                expect(testInputController.getRobot()).toBeNull();
            });

            test("it should ignore any movement or report command before PLACE command", () => {
                const testInputController = inputController.createInputController();
                               
                testInputController.parseCommands("REPORT");
                
                expect(testInputController.getRobot()).toBeNull();
            });

            test("it should ignore MOVE command (remain in the same position) when robot's position is out of table limits as a result of potential move when facing NORTH", () => {
                const testInputController = inputController.createInputController();

                testInputController.parseCommands("PLACE 2,4,NORTH");

                testInputController.parseCommands("MOVE");

                const robot = testInputController.getRobot();

                expect(robot.getPosition().getPosition()).toEqual({x:2, y:4, f:"NORTH"}) 
            });

            test("it should ignore MOVE command (remain in the same position) when robot's position is out of table limits as a result of potential move when facing EAST", () => {
                const testInputController = inputController.createInputController();

                testInputController.parseCommands("PLACE 4,2,EAST");

                testInputController.parseCommands("MOVE");

                const robot = testInputController.getRobot();

                expect(robot.getPosition().getPosition()).toEqual({x:4, y:2, f:"EAST"}) 
            });

            test("it should ignore MOVE command (remain in the same position) when robot's position is out of table limits as a result of potential move when facing SOUTH", () => {
                const testInputController = inputController.createInputController();

                testInputController.parseCommands("PLACE 2,0,SOUTH");

                testInputController.parseCommands("MOVE");

                const robot = testInputController.getRobot();

                expect(robot.getPosition().getPosition()).toEqual({x:2, y:0, f:"SOUTH"}) 
            });

            test("it should ignore MOVE command (remain in the same position) when robot's position is out of table limits as a result of potential move when facing WEST", () => {
                const testInputController = inputController.createInputController();

                testInputController.parseCommands("PLACE 0,2,WEST");

                testInputController.parseCommands("MOVE");

                const robot = testInputController.getRobot();

                expect(robot.getPosition().getPosition()).toEqual({x:0, y:2, f:"WEST"}) 
            });
        });

        describe("RIGHT command", () => {
            test("it should return position with EAST facing direction when the current direction is NORTH and preserve the x and y coordinates", () => {
                const testInputController = inputController.createInputController();

                testInputController.parseCommands("PLACE 1,2,NORTH");
                
                testInputController.parseCommands("RIGHT");

                const robot = testInputController.getRobot();

                expect(robot.getPosition().getPosition()).toEqual({x:1, y:2, f:"EAST"}) 
            });

            test("it should return position with SOUTH facing direction when the current direction is EAST and preserve the x and y coordinates", () => {
                const testInputController = inputController.createInputController();

                testInputController.parseCommands("PLACE 1,2,EAST");
                
                testInputController.parseCommands("RIGHT");

                const robot = testInputController.getRobot();
                
                expect(robot.getPosition().getPosition()).toEqual({x:1, y:2, f:"SOUTH"}) 
            });

            test("it should return position with WEST facing direction when the current direction is SOUTH and preserve the x and y coordinates", () => {
                const testInputController = inputController.createInputController();

                testInputController.parseCommands("PLACE 1,2,SOUTH");
                
                testInputController.parseCommands("RIGHT");

                const robot = testInputController.getRobot();
                
                expect(robot.getPosition().getPosition()).toEqual({x:1, y:2, f:"WEST"}) 
            });

            test("it should return position with NORTH facing direction when the current direction is WEST and preserve the x and y coordinates", () => {
                const testInputController = inputController.createInputController();

                testInputController.parseCommands("PLACE 1,2,WEST");
                
                testInputController.parseCommands("RIGHT");

                const robot = testInputController.getRobot();
                
                expect(robot.getPosition().getPosition()).toEqual({x:1, y:2, f:"NORTH"}) 
            });
        });

        describe("LEFT command", () => {
            test("it should return position with WEST facing direction when the current direction is NORTH and preserve the x and y coordinates", () => {
                const testInputController = inputController.createInputController();

                testInputController.parseCommands("PLACE 1,2,NORTH");
                
                testInputController.parseCommands("LEFT");

                const robot = testInputController.getRobot();

                expect(robot.getPosition().getPosition()).toEqual({x:1, y:2, f:"WEST"}) 
            });

            test("it should return position with SOUTH facing direction when the current direction is WEST and preserve the x and y coordinates", () => {
                const testInputController = inputController.createInputController();

                testInputController.parseCommands("PLACE 1,2,WEST");
                
                testInputController.parseCommands("LEFT");

                const robot = testInputController.getRobot();
                
                expect(robot.getPosition().getPosition()).toEqual({x:1, y:2, f:"SOUTH"}) 
            });

            test("it should return position with EAST facing direction when the current direction is SOUTH and preserve the x and y coordinates", () => {
                const testInputController = inputController.createInputController();

                testInputController.parseCommands("PLACE 1,2,SOUTH");
                
                testInputController.parseCommands("LEFT");

                const robot = testInputController.getRobot();
                
                expect(robot.getPosition().getPosition()).toEqual({x:1, y:2, f:"EAST"}) 
            });

            test("it should return position with NORTH facing direction when the current direction is EAST and preserve the x and y coordinates", () => {
                const testInputController = inputController.createInputController();

                testInputController.parseCommands("PLACE 1,2,EAST");
                
                testInputController.parseCommands("LEFT");

                const robot = testInputController.getRobot();
                
                expect(robot.getPosition().getPosition()).toEqual({x:1, y:2, f:"NORTH"}) 
            });
        });

        describe("MOVE command", () => {
            test("it should return positoin with current x coordinate and y+1 coordinate when the current direction is NORTH", () => {
                const testInputController = inputController.createInputController();

                testInputController.parseCommands("PLACE 1,2,NORTH");

                testInputController.parseCommands("MOVE");

                const robot = testInputController.getRobot();

                expect(robot.getPosition().getPosition()).toEqual({x:1, y:3, f:"NORTH"}) 
            });

            test("it should return positoin with current y coordinate and x+1 coordinate when the current direction is EAST", () => {
                const testInputController = inputController.createInputController();

                testInputController.parseCommands("PLACE 1,2,EAST");

                testInputController.parseCommands("MOVE");

                const robot = testInputController.getRobot();

                expect(robot.getPosition().getPosition()).toEqual({x:2, y:2, f:"EAST"}) 
            });

            test("it should return positoin with current x coordinate and y-1 coordinate when the current direction is SOUTH", () => {
                const testInputController = inputController.createInputController();

                testInputController.parseCommands("PLACE 1,2,SOUTH");

                testInputController.parseCommands("MOVE");

                const robot = testInputController.getRobot();

                expect(robot.getPosition().getPosition()).toEqual({x:1, y:1, f:"SOUTH"}) 
            });

            test("it should return positoin with current y coordinate and x-1 coordinate when the current direction is WEST", () => {
                const testInputController = inputController.createInputController();

                testInputController.parseCommands("PLACE 1,2,WEST");

                testInputController.parseCommands("MOVE");

                const robot = testInputController.getRobot();

                expect(robot.getPosition().getPosition()).toEqual({x:0, y:2, f:"WEST"}) 
            });
        });
    });

});