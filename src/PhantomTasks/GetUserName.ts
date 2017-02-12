import { IPhantomTask } from '../../Interfaces/IPhantomTask';

export default class GetUserName implements IPhantomTask {

    public page:any;
    constructor(page) {
        this.page = page;
    }

    async start() {
        this.page.evaluate(function() {
            window.callPhantom({type: 'facebook-welcome-box', value: document.querySelector('.fbxWelcomeBoxSmallRow').innerText.trim()});
            window.callPhantom({type: 'USE_REDUCERS_ACTION_PAYLOADS'}); // All reducers action payload can ge into callPhantom
        });
        return this.page;
    }

}

