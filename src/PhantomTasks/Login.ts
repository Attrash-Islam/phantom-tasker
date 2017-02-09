
export default class Login {
    
    private page:any;
    constructor(page) {
        this.page = page;
    }

    async start() {

        this.page.evaluate(function() {
            const emailInput = <HTMLInputElement> document.querySelector('#email');
            const passwordInput = <HTMLInputElement> document.querySelector('#pass');
            const loginButton = <HTMLElement> document.querySelector('#loginbutton');
            if(emailInput && passwordInput && loginButton) {
                emailInput.value = 'xxxx@yyyy.zzzz';
                passwordInput.value = 'xxxxx';
                loginButton.click();
                window.callPhantom({type: 'LoginStatus', value: 'In Facebook!'});
            } else {
                window.callPhantom({type: 'Error', value: 'Not in Login page!'});
            }
        });
        return this.page;

    }
}

