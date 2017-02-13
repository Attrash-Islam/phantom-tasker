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
import { resolve as pathResolver } from 'path';
import { IPhantomTasksConfig } from '../Interfaces/IPhantomTasksConfig';
const PHANTOM_BRIDGE = pathResolver(__dirname) + '/phantom-bridge.txt';

/**
 * Phantom tasker class
 * This class will receive the tasks configuration and a onCallback
 * It will run all the tasks passed in synchronously and then it will pass in every window.callPhantom a payload object
 * in JSON format to the node environment, and node environment will receive it as stringifyed object.
 * 
 * Basically I call window.callPhantom with a payload object and then pass these payloads into a reducers to
 * execute some functionality
 * @author Islam Attrash
 */
export default class PhantomTasker {

    /**
     * PhantomJS instance
     */
    private instance:any;
    /**
     * Phantom tasks configuration
     * Defined as object of type: IPhantomTasksConfig
     */
    private tasksConfig:IPhantomTasksConfig;
    /**
     * Callback to be executed in node environment after passing the phantom-tasker output
     * to a file phantom-bridge.txt that will be the bridge between the two processes
     */
    private nodeBotCallback:Function;

    /**
     * PhantomTasker constructor
     * @param tasksConfig
     * @param nodeBotCallback
     */
    constructor(tasksConfig:IPhantomTasksConfig, nodeBotCallback:Function) {
        this.tasksConfig = tasksConfig;
        this.nodeBotCallback = nodeBotCallback;
    }

    /**
     * Starts the bot based on the passed configuration object
     * It will start the node bot to check the bridge file, and wait for some seconds (configured in configuration)
     * and then start the phantomjs bot that will scan and fetch data from websites
     * and then start all over again in infinite way
     * @returns Promise <void>
     */
    async start() {
        await this.startNodeBot();
        await sleep(this.tasksConfig.BotIntervalInSeconds * 1000);
        await this.startPhantomBot();
        await this.start();
    }

    /**
     * Start the node bot to fetch the bridge file content and execute the @nodeBotCallback
     * @returns Promise<{}>
     */
    private async startNodeBot() {
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

    /**
     * Start the phantomjs bot to scan and fetch data from websites and create the bridge files that will be
     * the link between the two environments
     * @returns Promise<void>
     */
    private async startPhantomBot() {
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
