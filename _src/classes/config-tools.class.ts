import fs from 'fs';
import { Config } from "../interfaces/config.interface"

// TODO


export class ConfigTools {
    infoProceso : string = '';
    private _config : Config;

    constructor( config : Config) {
        this._config = config;
    }

    // TODO
    validaConf = () : Config | null  => {

        // Arreglo url
        if (this._config.url.substr(-1) != '/') this._config.url += '/';
    
    
    
        return this._config
    }
    
    creaDir = () : boolean => {
        try {
            if (!fs.existsSync(this._config.outDir)) {
                fs.mkdirSync(this._config.outDir);
            }
            return true;
        } catch (err) {
            this.infoProceso = err as string;
            return false;
        }
    }
}
