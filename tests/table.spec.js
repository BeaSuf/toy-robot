const table = require("../src/table.js");

describe("Table", () => {
    describe("Initialising", () => {
        test("it should width property with default value of 5", () => { 
            const testTable = table.createTable();
        
            const received = testTable.getWidth();
            const expected = 5;
            expect(received).toEqual(expected);
        });

        test("it should have height property with default value of 5", () => { 
            const testTable = table.createTable();
        
            const received = testTable.getHeight();
            const expected = 5;
            expect(received).toEqual(expected);
        });
    });

    describe("isPositionValid", () => {
        test("it should be true when x and y coordinates are in a valid limit of the table", () => {
            const testTable = table.createTable();

            const received = testTable.isPositionValid(2, 2);
            expect(received).toBeTruthy();
        });

        test("it should be false when x and y are is less then 0", () => {
            const testTable = table.createTable();

            const received = testTable.isPositionValid(-1, -2);
            expect(received).toBeFalsy();
        });

        test("it should be false when x and y are greater then 4", () => {
            const testTable = table.createTable();

            const received = testTable.isPositionValid(5, 8);
            expect(received).toBeFalsy();
        });

        test("it should be false when x is valid and y is less then 0", () => {
            const testTable = table.createTable();

            const received = testTable.isPositionValid(2, -1);
            expect(received).toBeFalsy();
        });

        test("it should be false when x is valid and y is greater then 4", () => {
            const testTable = table.createTable();

            const received = testTable.isPositionValid(2, 5);
            expect(received).toBeFalsy();
        });

        test("it should be false when x is less then 0 and y is valid", () => {
            const testTable = table.createTable();

            const received = testTable.isPositionValid(-1, 2);
            expect(received).toBeFalsy();
        });

        test("it should be false when x is greater then 4 and y is valid", () => {
            const testTable = table.createTable();

            const received = testTable.isPositionValid(5, 2);
            expect(received).toBeFalsy();
        });
    });
});
