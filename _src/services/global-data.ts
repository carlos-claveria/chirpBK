import { Config } from "../interfaces/config.interface";
import { LoraBK } from '../interfaces/lora-bk.interface';

interface GlobalInfoInterface {
    config   : Config;
    serverBK : LoraBK;
}

export class GlobalInfo implements GlobalInfoInterface {


    config   : Config; 
    serverBK : LoraBK;

    private static instance: GlobalInfo;

    private constructor() {

        this.serverBK = <LoraBK>{}

        this.config = {

            ok       : false,
            msg      : 'Valores sin inicializar',
            mode     : '',
            version  : '',
            url      : '',
            login    : '',
            password : '',
            outDir   : ''
        }

    };

    public static getInstance(): GlobalInfo {
        if (!GlobalInfo.instance) {
            GlobalInfo.instance = new GlobalInfo();
        }

        return GlobalInfo.instance;
    }




}

