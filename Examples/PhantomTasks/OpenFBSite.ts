import { IPhantomTask } from '../../Interfaces/IPhantomTask';

/**
 * Open Facebook website
 * @author Islam Attrash
 */
export default class OpenFBSite implements IPhantomTask {

    public page:any;

    constructor(page) {
        this.page = page;
    }

    async start() {
        await this.page.open('https://www.facebook.com/');
    }

}
