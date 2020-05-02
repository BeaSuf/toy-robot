# Toy Robot

Toy Robot Simulator written in Node.js and used commander (<https://github.com/tj/commander.js/>) for CLI and jest (<https://jestjs.io/>) for TDD.

***

## Installation
Environment: Built on Ubuntu 18.04.4 using node -v 8.17.0 and npm -v 6.13.4

Clone this Repo
> $ git clone https://github.com/BeaSuf/toy-robot.git

**cd** to the root directory of the package
> $ cd toy-robot

Run **npm install** to install the dependencies
> $ npm install

***

## Usage

Run the application from the root directory with following options:

- Use provided sample test.txt file located at test_data:

> $ node simulator.js test

- Use custom test file:

> $ node simulator.js test -f my_test.txt

- To see help on application usage

> $ node simulator.js help test

***

## Testing

Test by running **npm test** or **npm run watch** (jest/jest-watcher) <https://jestjs.io/>
> $ npm test

> $ npm run watch

Terminal output may look like following:
> PASS  tests/toy-robot.spec.js
> PASS  tests/input-controller.spec.js
> ● Console
>
> console.log
> Robot's position: 1,2,NORTH
> .............................
>
> PASS  tests/table.spec.js
> PASS  tests/robot.spec.js
> PASS  tests/command-operator.spec.js
> PASS  tests/position.spec.js
>
>Test Suites: 5 passed, 5 total
>Tests:       52 passed, 52 total
>Snapshots:   0 total
>Time:        1.101s
>Ran all test suites.

***

## Specifications

The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5 units x 5 units.

There are no other obstructions on the table surface.

The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed.

Create an application that can read in commands of the following (textual) form:

    PLACE X,Y,F
    MOVE
    LEFT
    RIGHT
    REPORT

__PLACE__

- Will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.
- The origin (0,0) can be considered to be the SOUTH WEST most corner.
- The first valid command to the robot is a PLACE command, after that, any sequence of commands may be issued, in any order, including another PLACE command. The application should discard all commands in the sequence until a valid PLACE command has been executed.

__MOVE__

- Will move the toy robot one unit forward in the direction it is currently facing.

__LEFT and RIGHT__

- Will rotate the robot 90 degrees in the specified direction without changing the position of the robot.

__REPORT__

- Will announce the X,Y and F of the robot. This can be in any form, but standard output is sufficient.

A robot that is not on the table can choose to ignore the MOVE, LEFT, RIGHT and REPORT commands.
Input can be from a file, or from standard input, as the developer chooses.
Provide test data to exercise the application.
The application must be a command line application.

### Constraints

- The toy robot must not fall off the table during movement. This also includes the initial placement of the toy robot.
- Any move that would cause the robot to fall must be ignored.

### Example Input and Output

___Example a___

    PLACE 0,0,NORTH
    MOVE
    REPORT

Expected output:

    0,1,NORTH

___Example b___

    PLACE 0,0,NORTH
    LEFT
    REPORT

Expected output:

    0,0,WEST

___Example c___

    PLACE 1,2,EAST
    MOVE
    MOVE
    LEFT
    MOVE
    REPORT

Expected output

    3,3,NORTH

### Deliverables

- Please provide your source code, and any test code/data you using in developing your solution.

- Please engineer your solution to a standard you consider suitable for production. It is not required to provide any graphical output showing the movement of the toy robot.