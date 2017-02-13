
/**
 * Phantom Task interface
 * @author Islam Attrash
 */
export interface IPhantomTask {
    /**
     * PhantomJS page instance
     */
    page:any;
    /**
     * The phantom task implementation 
     * @returns Promise <void>
     */
    start():Promise<any>;
}

/**
 * Phantom Task constructor interface
 * @author Islam Attrash
 */
export interface IPhantomTaskConstructor {
    /** Constructor */
    new(page:any):IPhantomTask;
}
