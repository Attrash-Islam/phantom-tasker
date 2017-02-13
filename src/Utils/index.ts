
/**
 * Sleep for milliseconds
 * @param ms - Duration of sleep in milliseconds
 * @returns Promise<{}>
 * @author Islam Attrash
 */
export const sleep = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));
