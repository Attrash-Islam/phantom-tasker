import Login from './PhantomTasks/Login';
import GetUserName from './PhantomTasks/GetUserName';
import { IPhantomTasksConfig } from '../Interfaces/IPhantomTasksConfig';
import OpenFBSite from './PhantomTasks/OpenFBSite';

const conf:IPhantomTasksConfig =  {
    // Run every 5 seconds
    BotIntervalInSeconds: 5,
    // PhantomJS tasks to run
    // Order is so important since they run synchronously, one after another
    PhantomTasks: [
        OpenFBSite,
        Login,
        GetUserName
    ]
};

export default conf;
