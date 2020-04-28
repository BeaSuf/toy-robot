function createTable(tableWidth = 5, tableHeight = 5) {
    const width = tableWidth;
    const height = tableHeight;
    
    
    function getWidth() {
        return width;
    }

    function getHeight() {
        return height;
    }

    function isPositionValid(x, y) {
        return isXValid(x) && isYValid(y);
    }

    function isXValid(x) {
        return x >= 0 && x <= getWidth() - 1;
    }

    function isYValid(y) {
        return y >= 0 && y <= getHeight() - 1;
    }

    return {
        getWidth,
        getHeight,
        isPositionValid
    }
}

module.exports = {
    createTable
}