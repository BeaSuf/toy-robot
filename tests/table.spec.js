const tableModule = require("../src/table.js");

describe("Table", () => {
    describe("Initialising", () => {
        test("it should width property with default value of 5", () => { 
            const table = tableModule.createTable();
        
            const width  = table.getWidth();
            
            expect(width).toEqual(5);
        });

        test("it should have height property with default value of 5", () => { 
            const table = tableModule.createTable();
        
            const height = table.getHeight();
            
            expect(height).toEqual(5);
        });
    });

    describe("isPositionValid", () => {
        test("it should be true when x and y coordinates are in a valid limit of the table", () => {
            const table = tableModule.createTable();

            const isPositionValid = table.isPositionValid(2, 2);

            expect(isPositionValid).toBeTruthy();
        });

        test("it should be false when x and y are less then 0", () => {
            const table = tableModule.createTable();

            const isPositionValid = table.isPositionValid(-1, -2);

            expect(isPositionValid).toBeFalsy();
        });

        test("it should be false when x and y are greater then 4", () => {
            const table = tableModule.createTable();

            const isPositionValid = table.isPositionValid(5, 8);

            expect(isPositionValid).toBeFalsy();
        });

        test("it should be false when x is valid and y is less then 0", () => {
            const table = tableModule.createTable();

            const isPositionValid = table.isPositionValid(2, -1);

            expect(isPositionValid).toBeFalsy();
        });

        test("it should be false when x is valid and y is greater then 4", () => {
            const table = tableModule.createTable();

            const isPositionValid = table.isPositionValid(2, 5);

            expect(isPositionValid).toBeFalsy();
        });

        test("it should be false when x is less then 0 and y is valid", () => {
            const table = tableModule.createTable();

            const isPositionValid = table.isPositionValid(-1, 2);

            expect(isPositionValid).toBeFalsy();
        });

        test("it should be false when x is greater then 4 and y is valid", () => {
            const table = tableModule.createTable();

            const isPositionValid = table.isPositionValid(5, 2);

            expect(isPositionValid).toBeFalsy();
        });
    });
});
