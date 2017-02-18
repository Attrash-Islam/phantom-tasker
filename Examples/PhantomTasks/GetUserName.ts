import { IPhantomTask } from '../../Interfaces/IPhantomTask';

/**
 * Get Facebook username from the welcome box in the left corner
 * @author Islam Attrash
 */
export default class GetUserName implements IPhantomTask {

    public page:any;

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

