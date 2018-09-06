import errorhandler from 'errorhandler';
import dotenv from 'dotenv'

dotenv.config()

import app from './app';
/**
 * Error Handler. Provides full stack
 */
if (process.env.NODE_ENV == 'development') {
    app.use(errorhandler());
}

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), () => {
    console.log(`Users Service - Devaki Wallet \nVersion: 1.0-alpha\nPort App: ${app.get('port')}`)
});

export default server;
