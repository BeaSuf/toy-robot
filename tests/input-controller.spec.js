const inputControllerMOdule = require("../src/input-controller.js");

describe("Input-Controller", () => {
    describe("Initialising", () => {
        test("it should have table property that is not null and has default width and heigh equal to 5", () => { 
            const inputController = inputControllerMOdule.createInputController();
        
            const table = inputController.getTable();
                                   
            expect(table).not.toBeNull();
            expect(table.getWidth()).toEqual(5);
            expect(table.getHeight()).toEqual(5);
        });

        test("it should have commandOperator property that is not null", () => {
            const inputController = inputControllerMOdule.createInputController();
        
            const commandOperator = inputController.getCommandOperatorModule();
                                   
            expect(commandOperator).not.toBeNull();
        });

        test("it should have robot property that is not null but have null position", () => { 
            const inputController = inputControllerMOdule.createInputController();
        
            const robot = inputController.getRobot();
            
            expect(robot).not.toBeNull();            
            expect(robot.getPosition()).toBeNull();
        });
    });

    describe("parseCommand", () => {
        describe("place command", () => {
            test("it should return robot's position matching the 'PLACE' command patern", () => {
                const inputController = inputControllerMOdule.createInputController();

                const position = inputController.parseCommand("PLACE 1,2,NORTH");

                const robot = inputController.getRobot();

                expect(robot.getPosition().getPositionProperties()).toEqual({x:1, y:2, f:"NORTH"});
            });

            test("it should return null for the robot's position if the command does not matches the 'PLACE' command patern", () => {
                const inputController = inputControllerMOdule.createInputController();

                inputController.parseCommand("PLACE_ME 1,2,FACING_NORTH");

                const robot = inputController.getRobot();

                expect(robot.getPosition()).toBeNull();
            });

            test("it should create a robot and place it on the table if position is valid", () => {
                const inputController = inputControllerMOdule.createInputController();

                inputController.parseCommand("PLACE 1,2,NORTH");

                const robot = inputController.getRobot();

                expect(robot).not.toBeNull();
                expect(robot.getPosition()).not.toBeNull();
                expect(robot.getPosition().getPositionProperties()).toEqual({x:1, y:2, f:"NORTH"});
            });
          
            test("it should return true for 'isInPlace' when position is valid", () => {
                const inputController = inputControllerMOdule.createInputController();

                inputController.parseCommand("PLACE 1,2,NORTH");

                const robot = inputController.getRobot();

                expect(robot.isInPlace()).toBeTruthy();                
            });

            test("it should return null for robot property if possition is invalid", () => {
                const inputController = inputControllerMOdule.createInputController();

                inputController.parseCommand("PLACE 5,5,NORTH");

                const robot = inputController.getRobot();

                expect(robot.getPosition()).toBeNull();
                expect(robot.isInPlace()).toBeFalsy();
            });
        });

        describe("Ignore Movement and REPORT commands when the conditions are invalid", () => {

            test("it should ignore any movement or report commands before PLACE command", () => {
                const inputController = inputControllerMOdule.createInputController();
                               
                inputController.parseCommand("REPORT");

                const robot = inputController.getRobot();
                
                expect(robot.getPosition()).toBeNull();
            });

            test("it should ignore any movement or report commands when PLACE commmand is invalid and robot was not placed", () => {
                const inputController = inputControllerMOdule.createInputController();

                inputController.parseCommand("PLACE 5,5,NORTH");
                
                inputController.parseCommand("LEFT");

                const robot = inputController.getRobot();

                expect(robot.getPosition()).toBeNull();
            });

            test("it should ignore any illigal movement or report commands and have the current position", () => {
                const inputController = inputControllerMOdule.createInputController();

                inputController.parseCommand("PLACE 2,2,NORTH");

                inputController.parseCommand("MOVE 1");

                const robot = inputController.getRobot();

                expect(robot.getPosition().getPositionProperties()).toEqual({x:2, y:2 ,f:"NORTH"});
            }); 

            test("it should ignore MOVE command (remain in the same position) when robot's position is out of table limits as a result of potential move when facing NORTH", () => {
                const inputController = inputControllerMOdule.createInputController();

                inputController.parseCommand("PLACE 2,4,NORTH");

                inputController.parseCommand("MOVE");

                const robot = inputController.getRobot();

                expect(robot.getPosition().getPositionProperties()).toEqual({x:2, y:4, f:"NORTH"}) 
            });

            test("it should ignore MOVE command (remain in the same position) when robot's position is out of table limits as a result of potential move when facing EAST", () => {
                const inputController = inputControllerMOdule.createInputController();

                inputController.parseCommand("PLACE 4,2,EAST");

                inputController.parseCommand("MOVE");

                const robot = inputController.getRobot();

                expect(robot.getPosition().getPositionProperties()).toEqual({x:4, y:2, f:"EAST"}) 
            });

            test("it should ignore MOVE command (remain in the same position) when robot's position is out of table limits as a result of potential move when facing SOUTH", () => {
                const inputController = inputControllerMOdule.createInputController();

                inputController.parseCommand("PLACE 2,0,SOUTH");

                inputController.parseCommand("MOVE");

                const robot = inputController.getRobot();

                expect(robot.getPosition().getPositionProperties()).toEqual({x:2, y:0, f:"SOUTH"}) 
            });

            test("it should ignore MOVE command (remain in the same position) when robot's position is out of table limits as a result of potential move when facing WEST", () => {
                const inputController = inputControllerMOdule.createInputController();

                inputController.parseCommand("PLACE 0,2,WEST");

                inputController.parseCommand("MOVE");

                const robot = inputController.getRobot();

                expect(robot.getPosition().getPositionProperties()).toEqual({x:0, y:2, f:"WEST"}) 
            });
        });

        describe("RIGHT command", () => {
            test("it should return position with EAST facing direction when the current direction is NORTH and preserve the x and y coordinates", () => {
                const inputController = inputControllerMOdule.createInputController();

                inputController.parseCommand("PLACE 1,2,NORTH");
                
                inputController.parseCommand("RIGHT");

                const robot = inputController.getRobot();

                expect(robot.getPosition().getPositionProperties()).toEqual({x:1, y:2, f:"EAST"}) 
            });

            test("it should return position with SOUTH facing direction when the current direction is EAST and preserve the x and y coordinates", () => {
                const inputController = inputControllerMOdule.createInputController();

                inputController.parseCommand("PLACE 1,2,EAST");
                
                inputController.parseCommand("RIGHT");

                const robot = inputController.getRobot();
                
                expect(robot.getPosition().getPositionProperties()).toEqual({x:1, y:2, f:"SOUTH"}) 
            });

            test("it should return position with WEST facing direction when the current direction is SOUTH and preserve the x and y coordinates", () => {
                const inputController = inputControllerMOdule.createInputController();

                inputController.parseCommand("PLACE 1,2,SOUTH");
                
                inputController.parseCommand("RIGHT");

                const robot = inputController.getRobot();
                
                expect(robot.getPosition().getPositionProperties()).toEqual({x:1, y:2, f:"WEST"}) 
            });

            test("it should return position with NORTH facing direction when the current direction is WEST and preserve the x and y coordinates", () => {
                const inputController = inputControllerMOdule.createInputController();

                inputController.parseCommand("PLACE 1,2,WEST");
                
                inputController.parseCommand("RIGHT");

                const robot = inputController.getRobot();
                
                expect(robot.getPosition().getPositionProperties()).toEqual({x:1, y:2, f:"NORTH"}) 
            });
        });

        describe("LEFT command", () => {
            test("it should return position with WEST facing direction when the current direction is NORTH and preserve the x and y coordinates", () => {
                const inputController = inputControllerMOdule.createInputController();

                inputController.parseCommand("PLACE 1,2,NORTH");
                
                inputController.parseCommand("LEFT");

                const robot = inputController.getRobot();

                expect(robot.getPosition().getPositionProperties()).toEqual({x:1, y:2, f:"WEST"}) 
            });

            test("it should return position with SOUTH facing direction when the current direction is WEST and preserve the x and y coordinates", () => {
                const inputController = inputControllerMOdule.createInputController();

                inputController.parseCommand("PLACE 1,2,WEST");
                
                inputController.parseCommand("LEFT");

                const robot = inputController.getRobot();
                
                expect(robot.getPosition().getPositionProperties()).toEqual({x:1, y:2, f:"SOUTH"}) 
            });

            test("it should return position with EAST facing direction when the current direction is SOUTH and preserve the x and y coordinates", () => {
                const inputController = inputControllerMOdule.createInputController();

                inputController.parseCommand("PLACE 1,2,SOUTH");
                
                inputController.parseCommand("LEFT");

                const robot = inputController.getRobot();
                
                expect(robot.getPosition().getPositionProperties()).toEqual({x:1, y:2, f:"EAST"}) 
            });

            test("it should return position with NORTH facing direction when the current direction is EAST and preserve the x and y coordinates", () => {
                const inputController = inputControllerMOdule.createInputController();

                inputController.parseCommand("PLACE 1,2,EAST");
                
                inputController.parseCommand("LEFT");

                const robot = inputController.getRobot();
                
                expect(robot.getPosition().getPositionProperties()).toEqual({x:1, y:2, f:"NORTH"}) 
            });
        });

        describe("MOVE command", () => {
            test("it should return positoin with current x coordinate and y+1 coordinate when the current direction is NORTH", () => {
                const inputController = inputControllerMOdule.createInputController();

                inputController.parseCommand("PLACE 1,2,NORTH");

                inputController.parseCommand("MOVE");

                const robot = inputController.getRobot();

                expect(robot.getPosition().getPositionProperties()).toEqual({x:1, y:3, f:"NORTH"}) 
            });

            test("it should return positoin with current y coordinate and x+1 coordinate when the current direction is EAST", () => {
                const inputController = inputControllerMOdule.createInputController();

                inputController.parseCommand("PLACE 1,2,EAST");

                inputController.parseCommand("MOVE");

                const robot = inputController.getRobot();

                expect(robot.getPosition().getPositionProperties()).toEqual({x:2, y:2, f:"EAST"}) 
            });

            test("it should return positoin with current x coordinate and y-1 coordinate when the current direction is SOUTH", () => {
                const inputController = inputControllerMOdule.createInputController();

                inputController.parseCommand("PLACE 1,2,SOUTH");

                inputController.parseCommand("MOVE");

                const robot = inputController.getRobot();

                expect(robot.getPosition().getPositionProperties()).toEqual({x:1, y:1, f:"SOUTH"}) 
            });

            test("it should return positoin with current y coordinate and x-1 coordinate when the current direction is WEST", () => {
                const inputController = inputControllerMOdule.createInputController();

                inputController.parseCommand("PLACE 1,2,WEST");

                inputController.parseCommand("MOVE");

                const robot = inputController.getRobot();

                expect(robot.getPosition().getPositionProperties()).toEqual({x:0, y:2, f:"WEST"}) 
            });
        });

        describe("REPORT command", () => {
            test("it should preserve robot's current position ", () => {
                const inputController = inputControllerMOdule.createInputController();

                inputController.parseCommand("PLACE 1,2,NORTH");

                inputController.parseCommand("REPORT");

                const robot = inputController.getRobot();

                expect(robot.getPosition().getPositionProperties()).toEqual({x:1, y:2, f:"NORTH"})               
            });
        });
    });

});