const createRobot = () => {
    let position = null;

    const getPosition = () => {
        return position;
    }

    const setPosition = (newPosition) => {
        position = newPosition;
    }

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
