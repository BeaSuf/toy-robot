function createPosition(xPos, yPos, facing) {
    const position = {
        x: xPos,
        y: yPos,
        f: facing
    }

    function getX() {
        return position.x;
    }

    function getY() {
        return position.y;
    }

    function getF() {
        return position.f;
    }

    function getPosition() {
        return position;
    }

    return {
        getX,
        getY,
        getF,
        getPosition
    }
}

module.exports = {
    createPosition
}