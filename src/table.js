/**
 * Table module
 * Represents the table top
 * @param {number} tableWidth - table width. Default is 5.
 * @param {number} tableHeight - table height. Deafult is 5. 
 */
const createTable = (tableWidth = 5, tableHeight = 5) => {
    const width = tableWidth;
    const height = tableHeight;

    /**
     * Getter for width property
     * @returns {number} - table width
     */
    const getWidth = () => {
        return width;
    }

    /**
     * Getter for height property
     * @returns {number} - table height
     */
    const getHeight = () => {
        return height;
    }

    /**
     * Validates if position is valid and not excides table top limits
     * @param {number} x - x coordinate
     * @param {number} y - y coordinate
     */
    const isPositionValid = (x, y) => {
        return isXValid(x) && isYValid(y);
    }

    // "private"

    /**
     * Validates if x coordinate is valid and not excides table width
     * @param {number} x - x coordinate
     */
    const isXValid = (x) => {
        return x >= 0 && x <= getWidth() - 1;
    }

    /**
     * Validates if y coordinate is valid and not excides table height
     * @param {number} x - x coordinate
     */
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