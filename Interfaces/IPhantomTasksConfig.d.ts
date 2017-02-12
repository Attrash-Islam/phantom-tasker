import { IPhantomTaskConstructor } from './IPhantomTask';

export interface IPhantomTasksConfig {
    BotIntervalInSeconds: number,
    PhantomTasks: Array<IPhantomTaskConstructor>
}
