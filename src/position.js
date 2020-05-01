const createPosition = (xPos, yPos, facing) => {
    const positionProperties = {
        x: xPos,
        y: yPos,
        f: facing
    }

    const getX = () => {
        return positionProperties.x;
    }

    const getY = () => {
        return positionProperties.y;
    }

    const getF = () => {
        return positionProperties.f;
    }

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