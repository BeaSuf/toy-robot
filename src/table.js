function createTable(xCoordinate = 5, yCoordinate = 5) {
    const x = xCoordinate;
    const y = yCoordinate;

    function getX() {
        return x;
    }

    function getY() {
        return y;
    }

    function isPositionValid(x, y) {
        return isXValid(x) && isYValid(y);
    }

    function isXValid(x) {
        return x >= 0 && x <= getX() - 1;
    }

    function isYValid(y) {
        return y >= 0 && y <= getY() - 1;
    }

    return {
        getX,
        getY,
        isPositionValid
    }
}

module.exports = {
    createTable
}