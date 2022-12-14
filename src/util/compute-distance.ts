import {Coordinate, getDistanceBetweenTwoPoints} from "calculate-distance-between-coordinates";
import {stringify} from "flatted";

/**
 * This method compute the distance between two coordinates
 * and return the distance in kilometers.
 * @param positionA The first position (latitude and longitude).
 * @param positionB The second position (latitude and longitude).
 */
export default (positionA: Coordinate, positionB: Coordinate): number => {
  console.log(positionA);
  console.log(positionB);
  return (getDistanceBetweenTwoPoints(positionA, positionB, 'km'));
};
