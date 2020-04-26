function createPosition(xPos, yPos) {
    const position = {
        x: xPos,
        y: yPos
    }

    function getX() {
        return position.x;
    }

    function getY() {
        return position.y;
    }

    function getPosition() {
        return position;
    }

    return {
        getX,
        getY,
        getPosition
    }
}

module.exports = {
    createPosition
}