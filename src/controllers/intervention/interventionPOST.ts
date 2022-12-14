import express, {NextFunction} from "express";
import {compare} from "@src/util/pwd-util";
import {sign} from "@src/util/jwt-util";
import userModels from "@src/mongo/userModels";
import {UserType} from "@src/types/mongo/user";
import {getCoordinatesFromAdress} from "@src/util/geocoding";
import computeDistance from "@src/util/compute-distance";
import {Coordinate} from "calculate-distance-between-coordinates";
import {User} from "@src/types/User";
import {getNearestUser} from "@src/util/get_nearest_user";
import {Users} from "@src/websocket";

/**
 * This route should follow the documentation here
 * https://github.com/StayAliveEIP/stayalive-backend/wiki/Request-for-help-call-center
 * @param req The request
 * @param res The response
 */
export default async (req: express.Request, res: express.Response) => {
  try {
    const position  = req.body.position;
    const location : string = req.body.location;
    if (position)
      if (position.lat && position.lng) {
        return (res.status(200).json({message: "Position received"}));
      } else {
        res.status(400).json({error: "Position must have lat and lng"});
      }
    if (!location && !position)
      return res.status(400).json({error: "Missing location or position"});
    const data : object =  await getCoordinatesFromAdress(location);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const coord : Coordinate = {lat: data.data[0].latitude, lon: data.data[0].longitude};
    const nearest : User | null = getNearestUser(coord);
    if (nearest == null)
      return (res.status(404).json({error: "NO_USER_AVAILABLE"}));
    nearest.ws.send(JSON.stringify({
      type: "alert",
      location: location,
    },
    ));
    const cleanUser = {
      id: nearest.id,
      name: nearest.name,
      position: nearest.position,
    };
    return res.status(200).json({message: "Location received", nearest: cleanUser});
  } catch (e) {
    console.error(e);
    return res.status(500).json({error: "Internal server error"});
  }
};
