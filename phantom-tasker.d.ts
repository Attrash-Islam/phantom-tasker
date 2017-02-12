
export default PhantomTasker;

declare class PhantomTasker {
    constructor(tasksConfig:IPhantomTasksConfig, nodeBotCallback:Function);
    start():Promise<any>;
}


interface IPhantomTasksConfig {
    BotIntervalInSeconds: number,
    PhantomTasks: Array<IPhantomTaskConstructor>
}

interface IPhantomTask {
    page:any;
    start():Promise<any>;
}


interface IPhantomTaskConstructor {
    new(page:any):IPhantomTask;
}
