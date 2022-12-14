import WebSocket, {RawData, WebSocketServer} from "ws";
import logger from "jet-logger";
import jwtUtil from "@src/util/jwt-util";
import userModels from "@src/mongo/userModels";
import {TokenDecoded} from "@src/types/global";
import verifyAuthorizationHeader from "@src/util/verify-auth";
import {User} from "@src/types/User";

const client_ws: Array<WebSocket> = [];
export const Users : User[] = [];

export const startWebSocketServer = () => {
  const wss = new WebSocketServer({ port: 8080 });

  // Creating connection using websocket
  wss.on("connection", onConnectionHandler);



  logger.info("🚂️The WebSocket server is running on port 8080");
};

const onConnectionHandler = async (ws: WebSocket, request: any) => {

  request.headers;
  const headerAuthorization = request.headers.authorization;
  const errorMessage = await verifyAuthorizationHeader(headerAuthorization);
  if (errorMessage !== null && errorMessage !== undefined) {
    const errorJson = {error: errorMessage};
    ws.send(JSON.stringify(errorJson));
    ws.close();
    logger.info("⛔️ A client try to connect to the WebSocket server with a wrong token");
    return;
  }

  logger.info("💚 New client connected to the WebSocket server");

  const newClient : User = { ws: ws, id: Users.length + 1, name: "user" + (Users.length + 1), position: {lat: 0, lon: 0}, active: false};
  Users.push(newClient);
  // Setup handlers
  ws.on("message", (data) => onMessageHandler(ws, data));
  ws.on("close", () => onCloseHandler(ws));
  ws.onerror = () => onErrorHandler(ws);

};

const onMessageHandler = (ws: WebSocket, data: RawData) => {
  const message = JSON.parse(data.toString());
  if (!message["type"] || !message["position"])
    return;
  if (message.type === "position") {
    Users.forEach((user, index) => {
      if (user.ws === ws) {
        Users[index].position = message.position;
      }
    });
  }
  logger.info("📨 New message from a client: " + message);
};

const onCloseHandler = (ws: WebSocket) => {
  Users.forEach((user, index) => {
    if (user.ws === ws) {
      Users.splice(index, 1);
    }
  });
  logger.info("💔 A client was disconnected");
};

const onErrorHandler = (ws: WebSocket) => {
  logger.err("❌ Some error occurred");
};
