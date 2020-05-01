const positiionModule = require("../src/position.js");

describe("Position", () => {
    describe("Initialising", () => {
        test("it should have x coordinate", () => {
            const position = positiionModule.createPosition(2, 2, "NORTH");

            const xCoordinate = position.getX();

            expect(xCoordinate).not.toBeNull();
            expect(xCoordinate).toBeDefined();
            expect(xCoordinate).not.toBeUndefined();
        });

        test("it should have y coordinate", () => {
            const position = positiionModule.createPosition(2, 2, "NORTH");

            const yCoordinate = position.getY();

            expect(yCoordinate).not.toBeNull();
            expect(yCoordinate).toBeDefined();
            expect(yCoordinate).not.toBeUndefined();
        });

        test("it should have f properety", () => {
            const position = positiionModule.createPosition(2, 2, "NORTH");

            const facingDirection = position.getF();

            expect(facingDirection).not.toBeNull();
            expect(facingDirection).toBeDefined();
            expect(facingDirection).not.toBeUndefined();
        });

        test("it should return position", () => {
            const position = positiionModule.createPosition(2, 2, "NORTH");

            const positionProperties = position.getPositionProperties();
            
            expect(positionProperties).toEqual({x: 2, y: 2, f: "NORTH"});
        })
    });
}); 