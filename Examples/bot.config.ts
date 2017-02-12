import Login from './PhantomTasks/Login';
import GetUserName from './PhantomTasks/GetUserName';
import { IPhantomTasksConfig } from '../Interfaces/IPhantomTasksConfig';
import OpenFBSite from './PhantomTasks/OpenFBSite';

const conf:IPhantomTasksConfig =  {
    BotIntervalInSeconds: 5,
    PhantomTasks: [
        OpenFBSite,
        Login,
        GetUserName
    ]
};

export default conf;
