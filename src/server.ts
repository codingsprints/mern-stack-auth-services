import app from './app';
import { configENV } from './config/config';
import { startApp } from './database/DB';

const startServer = async () => {
  try {
    await startApp();
    app.listen(configENV.port, () => {
      console.log(
        `🛠️ Application ready...Server running on port: ${configENV.port}`,
      );
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log('❌ Error while starting the server: ', error.message);
      console.log(error.message);
    }
  }
};

startServer();
