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

        test("it should have obsticle property with default value of empty array", () => { 
            const table = tableModule.createTable();
        
            const obsticles = table.getObsticles();
            
            expect(obsticles.length).toEqual(0);
        });
    });

    describe("setObsticles", () => {
        test("it should return 1 at position [1][1] if the obsticle was set at x=1/y=1", () => {
            const table = tableModule.createTable();
            
            table.setObsticles(1, 1);
        
            expect(table.getObsticles()[1][1]).toEqual(1);            
        });

        test("it should not set the obsticle at invalid position. return undefined at [5]", () => {
            const table = tableModule.createTable();
            
            table.setObsticles(5, 5);
        
            expect(table.getObsticles()[5]).toBeUndefined();
        });
    });

    describe("isObsticle", () => {
        test("it should return true if the obsticle was set at x=1/y=1", () => {
            const table = tableModule.createTable();
            
            table.setObsticles(1, 1);
                    
            expect(table.isObsticle(1,1)).toBeTruthy();
        });

        test("it should return false if the obsticle was set at invalid position x=-1/y=-1", () => {
            const table = tableModule.createTable();
            
            table.setObsticles(-1, -1);
                    
            expect(table.isObsticle(-1,-1)).toBeFalsy();
        });
    });

    describe("isPositionValid", () => {
        describe("No obsticles on table", () => {
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
});
