
export interface IPhantomTask {
    page:any;
    start():Promise<any>;
}


export interface IPhantomTaskConstructor {
    new(page:any):IPhantomTask;
}
