const program = require("commander");
const toyRobotModule = require('./src/toy-robot');


/**
 * commander - command line interface package
 * used to configure the app usage
 */
program
.version("0.0.1")
.description("Command line Toy Robot Simulator")

program    
.command("test")
.option("-f,--file <test_file_path>", "use external test file located at test_file_path")
.description("test the robot. use test -h for help")
.action(opts => {    
        const toyRobot = toyRobotModule.createToyRobot()
        toyRobot.operate(opts.file)
    });

program.parse(process.argv);