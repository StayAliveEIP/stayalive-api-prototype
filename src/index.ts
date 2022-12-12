import './pre-start'; // Must be the first import
import logger from 'jet-logger';
import { WebSocketServer } from 'ws';

import EnvVars from '@src/declarations/major/EnvVars';
import server from '@src/server';
import mongoose from "mongoose";

// **** Connect to mongoDB **** //
mongoose.set('strictQuery', true);
mongoose.connect(EnvVars.mongo.uri).then(() => {
  logger.info('🔫 Connected to MongoDB, the fastest database in the world');

  // **** Start server **** //

  const msg = ('🚀 Express server started on port: ' + EnvVars.port.toString());
  server.listen(EnvVars.port, () => {
    logger.info(msg);
    runWebSocketServeur();
  });
}).catch((err) => {
  logger.err(err);
  logger.err("❌ Error while connecting to MongoDB", err);
  process.exit(1);
});

const runWebSocketServeur = () => {
  const wss = new WebSocketServer({ port: 8080 });

  // Creating connection using websocket
  wss.on("connection", ws => {
    logger.info("💚New client connected");
    // sending message
    ws.on("message", data => {
      logger.info(`Client has sent us: ${data}`);
    });
    // handling what to do when clients disconnects from server
    ws.on("close", () => {
      logger.info("💔The client has diconnected");
    });
    // handling client connection error
    ws.onerror = function () {
      logger.err("Some Error occurred");
    };
  });
  logger.info("🚂️The WebSocket server is running on port 8080");
};
