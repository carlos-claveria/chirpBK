
import fs from 'fs';
import { Config } from "../interfaces/config.interface";


export const cargaConfig = ( configFile : string ) : Config => {
    
    let config = <Config>{};

    if (!fs.existsSync(configFile)) {
        config.ok  = false;
        config.msg = 'No se encuentra el fichero de configuración.';
        return config;
    }

    try {
        config  = JSON.parse(fs.readFileSync(configFile,'utf8'));
    } catch (err) {
        config.ok  = false;
        config.msg = err as string;
        return config;
    }

    config.mode = config.mode.toLowerCase();
    
    if ( (config.mode != 'backup') && (config.mode != 'restore') ) {
        config.ok  = false;
        config.msg = `${config.mode} no es un nombre de operación válido.`;
        return config;
     }

     if ( (config.version != 'LoraServer') && (config.version != 'ChirpStack') ) {
        config.ok  = false;
        config.msg = `${config.version} no es un nombre de versión válido.`;
        return config;
     }

    if (config.url.substr(-1) != '/') config.url += '/';

    config.ok = true;
    return config;
}