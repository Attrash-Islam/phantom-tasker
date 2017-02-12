import config from '../bot.config';
import PhantomTasker from '../src/index';

const app = new PhantomTasker(config, (line) => console.log(line));
app.start();

