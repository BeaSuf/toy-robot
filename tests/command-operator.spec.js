const comandOperatorModule = require("../src/command-operator");

beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
    console.log.mockRestore();
});

afterEach(() => {
    console.log.mockClear();
});

describe("Command-Oparator", () => {
    describe("PLACE command", () => {
        test("it should return position matching the 'PLACE' command", () => {
            const commandOperator = comandOperatorModule.createCommandOpperator();

            const position = commandOperator.place(1, 2, "NORTH");

            expect(position.getPositionProperties()).toEqual({x:1, y:2, f:"NORTH"});
        });
    });

    describe("RIGHT command", () => {
        test("it should return position with facing EAST and remain the current x,y coordinates", () => {
            const commandOperator = comandOperatorModule.createCommandOpperator();

            commandOperator.place({x:1, y:2, f:"NORTH"});

            const position = commandOperator.right(1, 2, "NORTH");
            
            expect(position.getPositionProperties()).toEqual({x:1, y:2, f:"EAST"});           
        });
    });

    describe("LEFT command", () => {
        test("it should return position with facing WEST and remain the current x,y coordinates", () => {
            const commandOperator = comandOperatorModule.createCommandOpperator();

            commandOperator.place({x:1, y:2, f:"NORTH"});

            const position = commandOperator.left(1, 2, "NORTH");
            
            expect(position.getPositionProperties()).toEqual({x:1, y:2, f:"WEST"});           
        });
    });

    describe("MOVE command", () => {
        test("it should return position with x=1 and y=3 and remain the current facing NORTH", () => {
            const commandOperator = comandOperatorModule.createCommandOpperator();

            commandOperator.place({x:1, y:2, f:"NORTH"});

            const position = commandOperator.move(1, 2, "NORTH");
            
            expect(position.getPositionProperties()).toEqual({x:1, y:3, f:"NORTH"});           
        });
    });

    describe("REPORT command", () => {
        test("it should return position and remain in the current position", () => {
            const commandOperator = comandOperatorModule.createCommandOpperator();

            commandOperator.place({x:1, y:2, f:"NORTH"});

            const position = commandOperator.report(1, 2, "NORTH");
            
            expect(position.getPositionProperties()).toEqual({x:1, y:2, f:"NORTH"});      
        });

        test("it should console 'Robot's position: 1,2,NORTH' and remain in the current position ", () => {
            const commandOperator = comandOperatorModule.createCommandOpperator();

            commandOperator.place({x:1, y:2, f:"NORTH"});

            const position = commandOperator.report(1, 2, "NORTH");

            expect(global.console.log).toHaveBeenCalledWith("Robot's position: 1,2,NORTH");
            expect(position.getPositionProperties()).toEqual({x:1, y:2, f:"NORTH"});
        }); 
    });
});