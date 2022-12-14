import {Coordinate} from "calculate-distance-between-coordinates";
import {WebSocket} from "ws";

export type User = {
  id: number,
  position: Coordinate,
  name: string,
  ws : WebSocket,

  active: boolean,
}
