import {Coordinate} from "calculate-distance-between-coordinates";
import computeDistance from "@src/util/compute-distance";
import {User} from "@src/types/User";

export function getNearestUser (Coord : Coordinate) : User {

  const user1 : User = {
    id: 1,
    position: {lat: 48.829260, lon: 2.323080},
    name: "user1",
  };

  const user2 : User = {
    id: 2,
    position: {lat: 48.829260, lon: 2.353080},
    name: "user2",
  };

  const user3 : User = {
    id: 3,
    position: {lat: 48.829260, lon: 2.37880},
    name: "user3",
  };

  const Users : User[] = [user1, user2, user3];

  let bestUser : User = Users[0];
  for  (let i = 0; i < Users.length; i++) {
    const distance = computeDistance(Coord, Users[i].position);
    if (distance < computeDistance(Coord, bestUser.position)) {
      bestUser = Users[i];
    }
  }
    return bestUser;
}
