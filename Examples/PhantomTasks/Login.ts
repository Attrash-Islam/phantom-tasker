import { IPhantomTask } from '../../Interfaces/IPhantomTask';

/**
 * Log in to Facebook with  username (fustuq.store@gmail.com) 
 * @author Islam Attrash
 */
export default class Login implements IPhantomTask {
    
    public page:any;
    constructor(page) {
        this.page = page;
    }

    async start() {

        this.page.evaluate(function() {
            const emailInput = <HTMLInputElement> document.querySelector('#email');
            const passwordInput = <HTMLInputElement> document.querySelector('#pass');
            const loginButton = <HTMLElement> document.querySelector('#loginbutton');
            if(emailInput && passwordInput && loginButton) {
                emailInput.value = 'fustuq.store@gmail.com';
                passwordInput.value = 'xxxxxxx';
                loginButton.click();
                (window as any).callPhantom({type: 'LoginStatus', value: 'In Facebook!'});
            } else {
                (window as any).callPhantom({type: 'Error', value: 'Not in Login page!'});
            }
        });
        return this.page;

    }
}

