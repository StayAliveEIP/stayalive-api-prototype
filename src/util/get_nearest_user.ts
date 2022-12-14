import {Coordinate} from "calculate-distance-between-coordinates";
import computeDistance from "@src/util/compute-distance";
import {User} from "@src/types/User";
import {Users} from "@src/websocket";
import {stringify} from "flatted";
import WebSocket from "ws";
export function getNearestUser (Coord : Coordinate) : User {

  let bestUser : User = Users[0];
  for  (let i = 0; i < Users.length; i++) {
    {
      const distance = computeDistance(Coord, Users[i].position);
      console.log("Distance : " + distance);
      Users[i].distance = distance;
      if (distance < computeDistance(Coord, bestUser.position)) {
        bestUser = Users[i];
      }
    }
  }
  const cleanedUser : object = {
    id: bestUser.id,
    position: bestUser.position,
    name: bestUser.name,
    distance: bestUser.distance,
  };
  return cleanedUser as User;
}
