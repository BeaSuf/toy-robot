const createTable = (tableWidth = 5, tableHeight = 5) => {
    const width = tableWidth;
    const height = tableHeight;
        
    const getWidth = () => {
        return width;
    }

    const getHeight = () => {
        return height;
    }

    const isPositionValid = (x, y) => {
        return isXValid(x) && isYValid(y);
    }

    // "private"
    const isXValid = (x) => {
        return x >= 0 && x <= getWidth() - 1;
    }

    const isYValid = (y) => {
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