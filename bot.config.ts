import Login from './src/PhantomTasks/Login';
import GetUserName from './src/PhantomTasks/GetUserName';

export default {
    BotIntervalInSeconds: 5,
    PhantomTasks: [
        Login,
        GetUserName
    ]
}
