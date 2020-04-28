function createRobot() {
    let position = null;

    function getPosition() {
        return position;
    }

    function setPosition(newPosition) {
        position = newPosition;
    }

    function isInPlace() {
        return position != null;
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
