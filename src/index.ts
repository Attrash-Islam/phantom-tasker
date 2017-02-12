import { create as createPhantom } from 'phantom';
import { sleep } from './Utils/index';
import {
    write,
    existsSync as isFileExists,
    createReadStream,
    unlinkSync as removeFile
} from 'fs';
import { createInterface } from 'readline';
import { execSync } from 'child_process';
import config from '../bot.config';
import { resolve as pathResolver } from 'path';
import { IPhantomTasksConfig } from '../Interfaces/IPhantomTasksConfig';
const PHANTOM_BRIDGE = pathResolver(__dirname, '..', '..') + '/phantom-bridge.txt';

export default class PhantomTasker {

    private instance:any;
    private tasksConfig:IPhantomTasksConfig;
    private nodeBotCallback:Function;

    constructor(tasksConfig:IPhantomTasksConfig, nodeBotCallback:Function) {
        this.tasksConfig = tasksConfig;
        this.nodeBotCallback = nodeBotCallback;
    }

    async start() {
        await this.startNodeBot();
        await sleep(this.tasksConfig.BotIntervalInSeconds * 1000);
        await this.startPhantomBot();
        await this.start();
    }

    async startNodeBot() {
        return new Promise((resolve, reject) => {
            console.log(`NodeJS bot is checking phantom-bridge file...`);
            if(isFileExists(PHANTOM_BRIDGE)) {
                console.log(`File exist. Connecting to phantom-bridge..`);
                const rl = createInterface({
                    input: createReadStream(PHANTOM_BRIDGE)
                });

                rl.on('line', (line) => {
                    this.nodeBotCallback(line);
                });

                rl.on('close', () => {
                    removeFile(PHANTOM_BRIDGE);
                    resolve();
                });

            } else {
                console.log(`File is not exist`);
                resolve();
            }
        });
    }


    async startPhantomBot() {
        console.log(`PhantomJS bot started scanning the web...`);
        this.instance = await createPhantom();
        const page = await this.instance.createPage();

        try {

            page.property('onCallback', function(payload, PHANTOM_BRIDGE) {
                var fs = require('fs');
                fs.write(PHANTOM_BRIDGE, JSON.stringify(payload) + '\n', 'a');
            }, PHANTOM_BRIDGE);
            
            for(let i = 0; i < this.tasksConfig.PhantomTasks.length; i++) {
                let task = this.tasksConfig.PhantomTasks[i];
                await new task(page).start();
                await sleep(5000);
            }

        } catch(e) {
            throw e;
        }
    }

}


const app = new PhantomTasker(config, (line) => console.log(line));
app.start();
