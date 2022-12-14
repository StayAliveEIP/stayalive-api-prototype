import {Coordinate} from "calculate-distance-between-coordinates";
import computeDistance from "@src/util/compute-distance";
import {User} from "@src/types/User";
import {Users} from "@src/websocket";
import {stringify} from "flatted";
import WebSocket from "ws";
export function getNearestUser (coordinate : Coordinate) : User | null {
  console.log(Users.length)
  let bestUser : User | null = null;
  for  (let i = 0; i < Users.length; i++) {
    const tmpUser = Users[i];

    if (bestUser == null) {
      bestUser = tmpUser;
      continue;
    }

    const distance = computeDistance(coordinate, tmpUser.position);
    Users[i].distance = distance;
    if (distance < computeDistance(coordinate, bestUser.position)) {
      bestUser = Users[i];
    }
  }
  if (bestUser == null)
    return null;
  const cleanedUser : object = {
    id: bestUser.id,
    position: bestUser.position,
    name: bestUser.name,
    distance: bestUser.distance,
  };
  return cleanedUser as User;
}
