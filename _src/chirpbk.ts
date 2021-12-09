/**
    SM - DIC 2021
    ----------------------------------------------
    BACKUP TOOL FOR LORASERVER & CHIRPSTACK
*/
import axios, { AxiosResponse } from 'axios';

import { cargaConfig } from './tools/carga-config';
import { LoraApi } from './classes/lora-api.class';
import { GlobalInfo } from './services/global-data';

const CONFIG_FILE = './config.json';
const globalInfo = GlobalInfo.getInstance();
globalInfo.config = cargaConfig(CONFIG_FILE);

if (!globalInfo.config.ok) {
  console.log(globalInfo.config.msg);
  process.exit(1);
}

console.clear();
console.log("------------------------------");
console.log("   chirpBK v.0.0.1 2021       ");
console.log("   (c) Silicon Media, S.L.    ");
console.log("------------------------------");

main();

// --------------------------------------------------------------------------------------


async function main() {

  
  try {
    const la = new LoraApi(globalInfo);
    
    if (!await la.login()) {
        console.log(la.msg);
        return
    }

    if (globalInfo.config.mode.toLowerCase() === "backup") {
      console.log("backup");

      // TODO: FACTORIZAR 

      // NETWORK
      // const {status,data} : AxiosResponse = await la.network();

      // console.log(status,data);
      
     if (!await la.network()) {
      console.log(la.msg);
      return
     }

      // PROFILES
      // ORGANIZATIONS
      // USERS
      // SERVICE PROFILES
      // DEVICE  PROFILES
      // GATEWAYS
      // DEVICES
      // MULTICAST GROUPS


    } else 
    if (globalInfo.config.mode.toLowerCase() === "restore") {
    }
  } catch (err) {


    if (axios.isAxiosError(err)) {
        console.log('Error en petición: ');
        console.log('  ',err.response?.config.url);
        console.log('  ',err.message);
    } else {
        console.log(err);
    }

    process.exit(2);
  
  }
}

