import app from './app';
import { startApp } from './database/DB';
import logger from './config/logger';
import { configENV } from './config/config';

const PORT = configENV.port || 3000;

const startServer = async () => {
  try {
    logger.info('🚀 Starting application...');
    await startApp();
    logger.info('📁 Database connected successfully!');
    app.listen(PORT, async () => {
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
