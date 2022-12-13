import WebSocket, {RawData, WebSocketServer} from "ws";
import logger from "jet-logger";
import jwtUtil from "@src/util/jwt-util";
import userModels from "@src/mongo/userModels";
import {TokenDecoded} from "@src/types/global";
import verifyAuthorizationHeader from "@src/util/verify-auth";
import {User} from "@src/types/User";

const client_ws: Array<WebSocket> = [];
let Users : User[] = [];

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

  // Setup handlers
  ws.on("message", (data) => onMessageHandler(ws, data));
  ws.on("close", () => onCloseHandler(ws));
  ws.onerror = () => onErrorHandler(ws);

};

const onMessageHandler = (ws: WebSocket, data: RawData) => {
  logger.info(`✉️ Client has sent us: ${data}`);
};

const onCloseHandler = (ws: WebSocket) => {
  logger.info("💔 A client was disconnected");
};

const onErrorHandler = (ws: WebSocket) => {
  logger.err("❌ Some error occurred");
};

