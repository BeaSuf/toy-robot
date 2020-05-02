/**
 * Position module
 * Represents the position (x, y, facing) for the toy robot
 */
const createPosition = (xPos, yPos, facing) => {
    /**
     * Position properties object     
     */    
    const positionProperties = {
        x: xPos,
        y: yPos,
        f: facing
    }

    /**
     * Getter for x coordinate property
     * @returns {number} - x coordinate
     */
    const getX = () => {
        return positionProperties.x;
    }

    /**
     * Getter for y coordinate property
     * @returns {number} - y coordinate
     */
    const getY = () => {
        return positionProperties.y;
    }

    /**
     * Getter for f (facing) property
     * @returns {string} - f (facing direction) 
     */
    const getF = () => {
        return positionProperties.f;
    }

    /**
     * Getter for position properties object
     * @returns {positoinProperties} - position properties object
     */    
    const getPositionProperties = () => {
        return positionProperties;
    }

    return {
        getX,
        getY,
        getF,
        getPositionProperties
    }
}

module.exports = {
    createPosition
}