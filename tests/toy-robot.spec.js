const toyRobotModule = require("../src/toy-robot");
beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
    console.log.mockRestore();
});

afterEach(() => {
    console.log.mockClear();
});

describe("ToyRobot ", () => {
    describe("operate", () => {
        test("it should console log 'Robot's position: 0,0,NORTH' as per test file and called once (1 time)", () => {
            const toyRobot = toyRobotModule.createToyRobot();

            toyRobot.operate("./test_data/test_for_spec.txt");

            expect(global.console.log).toHaveBeenCalledWith("Robot's position: 0,0,NORTH");
            expect(global.console.log).toHaveBeenCalledTimes(1);
        });

        test("it should console log reported robot positions as per test file and called 12 time", () => {
            const toyRobot = toyRobotModule.createToyRobot();

            toyRobot.operate("./test_data/test.txt");

            expect(global.console.log).toHaveBeenCalledTimes(12);
        });
    });
});