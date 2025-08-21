import app from './app';
import { configENV } from './config/config';
import logger from './config/logger';
import { startApp } from './database/DB';

const startServer = async () => {
  const PORT = configENV.port || 5001;
  try {
    logger.info('🚀 Starting application...');
    await startApp();
    logger.info('Database connected successfully!');
    app.listen(configENV.port, () => {
      logger.info(`🛠️ Application ready...Server running on port: ${PORT}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error('❌ Error while starting the server: ', error.message);
      logger.error(error.message);
      setTimeout(() => {
        process.exit(1);
      }, 1000);
    }
  }
};

startServer();
