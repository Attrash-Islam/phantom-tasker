import { IPhantomTaskConstructor } from './IPhantomTask';

/**
 * PhantomJS Tasks Configuration interface
 * @author Islam Attrash
 */
export interface IPhantomTasksConfig {
    /**
     * Bot interval in seconds
     * It will run the bot infinite every @BotIntervalInSeconds duration
     */
    BotIntervalInSeconds: number,
    /**
     * PhantomJS Tasks to run synchronously one after another
     */
    PhantomTasks: Array<IPhantomTaskConstructor>
}
