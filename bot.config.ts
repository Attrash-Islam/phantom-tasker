import Login from './src/PhantomTasks/Login';
import GetUserName from './src/PhantomTasks/GetUserName';
import { IPhantomTasksConfig } from './Interfaces/IPhantomTasksConfig';
import OpenFBSite from './src/PhantomTasks/OpenFBSite';

const conf:IPhantomTasksConfig =  {
    BotIntervalInSeconds: 5,
    PhantomTasks: [
        OpenFBSite,
        Login,
        GetUserName
    ]
};

export default conf;
