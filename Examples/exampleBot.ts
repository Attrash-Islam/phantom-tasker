import config from './bot.config';
import PhantomTasker from '../src/index';

// Console log every payload object node is receiving from phantom environment
const app = new PhantomTasker(config, (line) => console.log(line));
app.start();

