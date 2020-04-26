function createRobot() {
    let position = null;

    function getPosition() {
        return position;
    }

    function setPosition(newPosition) {
        position = newPosition;
    }

    return {
        getPosition,
        setPosition        
    }
}

module.exports = {
    createRobot
}
