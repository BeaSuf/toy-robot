const positiion = require("../src/position.js");

describe("Position", () => {
    describe("Initialising", () => {
        test("it should have x coordinate", () => {
            const thePosition = positiion.createPosition(2, 2, "NORTH");

            const received = thePosition.getX();

            expect(received).not.toBeNull();
            expect(received).toBeDefined();
            expect(received).not.toBeUndefined();
        });

        test("it should have y coordinate", () => {
            const thePosition = positiion.createPosition(2, 2, "NORTH");

            const received = thePosition.getY();

            expect(received).not.toBeNull();
            expect(received).toBeDefined();
            expect(received).not.toBeUndefined();
        });

        test("it should have f properety", () => {
            const thePosition = positiion.createPosition(2, 2, "NORTH");

            const received = thePosition.getF();

            expect(received).not.toBeNull();
            expect(received).toBeDefined();
            expect(received).not.toBeUndefined();
        });

        test("it should return position", () => {
            const thePosition = positiion.createPosition(2, 2, "NORTH");

            const received = thePosition.getPosition();
            const expected = {x: 2, y: 2, f: "NORTH"};
            expect(received).toEqual(expected);
        })
    });
}); 