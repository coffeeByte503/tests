export function clickCollision(object, clickX, clickY) {
    return clickX >= object.left &&
        clickX <= object.right &&
        clickY >= object.top &&
        clickY <= object.bottom;
}