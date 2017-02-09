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
const PHANTOM_BRIDGE = pathResolver(__dirname, '..', '..') + '/phantom-bridge.txt';

class App {

    private instance:any;

    constructor() {

    }

    async start() {
        await this.startNodeBot();
        await sleep(config.BotIntervalInSeconds * 1000);
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
                    const payload = JSON.parse(line);
                    console.log(line);
                    // rootReducer(payload); [DEAL with Phantom env. output]
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

            //Phantom Bot
            await page.open('https://www.facebook.com/');


            page.property('onCallback', function(payload, PHANTOM_BRIDGE) {
                var fs = require('fs');
                fs.write(PHANTOM_BRIDGE, JSON.stringify(payload) + '\n', 'a');
            }, PHANTOM_BRIDGE);
            
            for(let i = 0; i < config.PhantomTasks.length; i++) {
                let task = config.PhantomTasks[i];
                await new task(page).start();
                await sleep(5000);
            }

        } catch(e) {
            throw e;
        }
    }

}


const app = new App();
app.start();
