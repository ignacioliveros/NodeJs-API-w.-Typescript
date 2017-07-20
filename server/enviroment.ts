export enum EnviromentOptions {
    development = 'development',
    producction = 'producction',

}

export class Enviroment {

    public static setEnviroment(env: string) {
        process.env.NODE_ENV = env;
        console.log('SERVER IN ' + env + ' ENVIROMENT');
    }
}
