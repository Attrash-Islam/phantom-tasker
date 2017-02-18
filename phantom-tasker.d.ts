
export default PhantomTasker;

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
declare class PhantomTasker {
    /**
     * PhantomTasker constructor
     * @param tasksConfig
     * @param nodeBotCallback
     */
    constructor(tasksConfig:IPhantomTasksConfig, nodeBotCallback:Function);
    /**
     * Starts the bot based on the passed configuration object
     * It will start the node bot to check the bridge file, and wait for some seconds (configured in configuration)
     * and then start the phantomjs bot that will scan and fetch data from websites
     * and then start all over again in infinite way
     * @returns Promise <void>
     */
    start():Promise<any>;
}


/**
 * PhantomJS Tasks Configuration interface
 * @author Islam Attrash
 */
interface IPhantomTasksConfig {
    /**
     * Bot interval in seconds
     * It will run the bot infinite every @BotIntervalInSeconds duration
     */
    BotIntervalInSeconds: number,
    /**
     * PhantomJS Tasks to run synchronously one after another
     */
    PhantomTasks: Array<IPhantomTask>
}



/**
 * Phantom Task interface
 * @author Islam Attrash
 */
interface IPhantomTask {
    /**
     * PhantomJS page instance
     */
    page:any;
    /**
     * The phantom task implementation 
     * @returns Promise <void>
     */
    start():Promise<any>;
}

/**
 * Phantom Task Class interface
 * @author Islam Attrash
 */
interface IPhantomTaskClass {
    new():IPhantomTask
}
