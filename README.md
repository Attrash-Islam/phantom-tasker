# Phantom Tasker

PhantomJS Tasker that run tasks synchronized with simple API with bridge to node environment Using Redux-like action payloads, which sent to the node process as JSON objects.

# Install
```
$ npm i --save phantom-tasker
```

# Usage

```ts
import PhantomTasker from 'phantom-tasker';
import config from './bot.config';
// See "Examples" Folder. bot.config.ts file content which contains an array of tasks

// Console log every payload object node is receiving from phantom environment
const app = new PhantomTasker(config, (line) => console.log(line));
app.start();
```

# Concept

The idea is to build a tasker that runs tasks synchronized one after another in interval loop for a configurable period of time. The main problem between phantom environment and node environment is that there's no link between the both, and some people have taken the mocking of console.log approach which I don't prefer it. The concept here is to write to a bridge file which will contain all stringified ```window.callPhantom``` calls (We pass JSON objects - Redux-like payloads), and then after finishing the tasks the node will fetch the bridge file "line-by-line" and will parse them again to JSON objects that can give data, commands and more.

See Examples in "Examples" folder

# Video
<a href="https://www.youtube.com/watch?v=n5ANnYK4iMw">
  <img src="https://i.ytimg.com/vi/n5ANnYK4iMw/hqdefault.jpg?custom=true&w=336&h=188&stc=true&jpg444=true&jpgq=90&sp=68&sigh=cWMD-VZXm3USk6DBNns_K-jjz38"/>
</a>

# Developer Section
```
$ git clone ...
$ cd phantom-takser
$ npm i
$ npm run build
```
