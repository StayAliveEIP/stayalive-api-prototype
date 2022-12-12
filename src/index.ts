import './pre-start'; // Must be the first import
import logger from 'jet-logger';
import WebSocket, { WebSocketServer } from 'ws';
import {startWebSocketServer} from "@src/websocket";

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
    startWebSocketServer();
  });
}).catch((err) => {
  logger.err(err);
  logger.err("❌ Error while connecting to MongoDB", err);
  process.exit(1);
});
