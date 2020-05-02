/**
 * Robot module
 * Represents the toy robot
 */
const createRobot = () => {
    let position = null;

    /**
     * Getter for position property
     * @returns {position} - position module
     */
    const getPosition = () => {
        return position;
    }

    /**
     * Setter for position property
     * @param {position} - position module
     */
    const setPosition = (newPosition) => {
        position = newPosition;
    }

    /**
     * Checks if the toy robot have been placed by validating position is not null
     */
    const isInPlace = () => {
        return position !== null;
    }

    return {
        getPosition,
        setPosition,
        isInPlace        
    }
}

module.exports = {
    createRobot
}
