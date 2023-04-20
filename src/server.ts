import Logger from './helper/Logger';
import { port } from './config';
import app from './app';

app
  .listen(port, () => {
    Logger.info(`server running on port : ${port}`);
    console.log(`server running on port : ${port}`);
  
  })
  .on('error', (e: any) => Logger.error(e));
