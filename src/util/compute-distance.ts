import {Coordinate, getDistanceBetweenTwoPoints} from "calculate-distance-between-coordinates";

/**
 * This method compute the distance between two coordinates
 * and return the distance in kilometers.
 * @param positionA The first position (latitude and longitude).
 * @param positionB The second position (latitude and longitude).
 */
export default (positionA: Coordinate, positionB: Coordinate): number => {
    return (getDistanceBetweenTwoPoints(positionA, positionB, 'km'));
}
