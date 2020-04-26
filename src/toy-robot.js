const table = require("../src/table.js");
const robot = require("../src/robot.js");

// create table
const theTable = table.createTable();

// is the table position of (0, 0) is valid?
console.log(theTable.isPositionValid(0,0));

// create robot
const theRobot = robot.createRobot();

// Initial position of the robot is null
theRobot.getPosition();