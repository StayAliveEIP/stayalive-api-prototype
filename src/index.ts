import './pre-start'; // Must be the first import
import logger from 'jet-logger';

import EnvVars from '@src/declarations/major/EnvVars';
import server from './server';
import mongoose from "mongoose";

// **** Connect to mongoDB **** //
mongoose.connect(EnvVars.mongo.uri).then(() => {
    logger.info('🔫 Connected to MongoDB, the fastest database in the world.');


    // **** Start server **** //

    const msg = ('🚀 Express server started on port: ' + EnvVars.port.toString());
    server.listen(EnvVars.port, () => logger.info(msg));
}).catch((err) => {
    logger.err(err);
    logger.err("❌ Error while connecting to MongoDB", err);
    process.exit(1);
});
