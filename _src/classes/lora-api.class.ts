import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { GlobalInfo } from '../services/global-data';
import { NetworkServer } from '../interfaces/lora-bk.interface';




export class LoraApi {

    http        : AxiosInstance;
    axiosConfig : AxiosRequestConfig; 
    msg         : string = '';
    
    constructor( private globalInfo : GlobalInfo) {

        this.axiosConfig = {
            baseURL: globalInfo.config.url,
            timeout: 3000,
        } 

        this.http = axios.create(this.axiosConfig);

    }

    login() : Promise<boolean> {

        // Con username y email vale tanto para LoraServer como para ChirpStack

        const  log = {
            password : this.globalInfo.config.password,
            username : this.globalInfo.config.login,
            email    : this.globalInfo.config.login
        }
            
       return new Promise<boolean>( (resolve) => {

            this.http.post('/api/internal/login',log)
            .then( ({status,data}) => { 

                if (status === 200) {
                    this.axiosConfig.headers = { 'Grpc-Metadata-Authorization' : data.jwt };
                    this.msg = '';
                    resolve(true);
                    return
                }

                this.msg = `Error de validación: ${status}`;
                resolve(false);

            })
            .catch( (err : AxiosError) => { 

                this.msg = err.message;
                resolve(false); 
            
            } )


       });
       
    }


    network() : Promise<boolean> {

        return new Promise<boolean>( (resolve) => {

            this.http.get('/api/network-servers?limit=10',this.axiosConfig)
            .then( ({status,data}) => {

                if (status != 200) {
                    this.msg = `Error de validación: ${status}`;
                    resolve(false);
                    return
                }

                const numElem = +data.totalCount;

                if (numElem == 0)  {
                    this.msg = `No hay network servers definidos.`;
                    resolve(false);
                    return
                }

                this.globalInfo.serverBK.networkServers = [];
               
                data.result.forEach( (x : NetworkServer, index : number) => { 

                    this.http.get(`/api/n-etwork-servers/${x.id}`,this.axiosConfig)
                    .then( (net) => {

                        if (net.status == 200) {
                            this.globalInfo.serverBK.networkServers.push(net.data.networkServer);
                        }


                        if (index == (numElem-1) ) {
                            this.msg = '';
                            resolve(true);
                            return
                        }
                    })
                    .catch( (err :AxiosError) => {
                        this.msg = 'netServer: '+err.message;
                        resolve(false);
                    });
                    
                });
                
            })
            .catch( (err :AxiosError) => {
                this.msg = err.message;
                resolve(false);
            });
        })

    } 


}