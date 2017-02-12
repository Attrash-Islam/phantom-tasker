import { IPhantomTask } from '../../Interfaces/IPhantomTask';

export default class GetUserName implements IPhantomTask {

    public page:any;
    constructor(page) {
        this.page = page;
    }

    async start() {
        this.page.evaluate(function() {
            const welcomeFBBox = <HTMLElement> document.querySelector('.fbxWelcomeBoxSmallRow');
            if (welcomeFBBox) {
                (window as any).callPhantom({type: 'facebook-welcome-box', value: welcomeFBBox.innerText.trim()});
                (window as any).callPhantom({type: 'USE_REDUCERS_ACTION_PAYLOADS'}); // All reducers action payload can ge into callPhantom
            }
        });
        return this.page;
    }

}

