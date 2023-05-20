import axios from 'axios';
import { Api_Notification_Messages,SERVICE_URLS } from '../constants/config.js';

const Api_Url='http://localhost:8000';

const axiosInstance=axios.create({
   baseURL:Api_Url,
    timeout:10000,
    headers:{"Content-Type":"application/json"}

});

axiosInstance.interceptors.request.use(
    function(config){
        return config;
    },
    function(error ){
        return Promise.reject(error);
    }
)


axiosInstance.interceptors.response.use(
    function(response){
        //stop the global loader 
        return processResponse(response);
    },
    function (error ){
        //stop the loader here 
        return Promise.reject(processError(error));
    }
)

//if sucess->return{isSucess:true,data:object}
//if fail->return {isFailure:true,status:string,msg:string,code:int}
const processResponse=(response)=>{
    if(response?.status===200){
        return {isSuccess:true,data:response.data}
    }
    else{
        return {isFailure:true,status:response?.status,msg:response?.msg,code:response?.code}
    }

}





const processError=(error)=>{
    if(error.response){
        //request made and server responded with different code
        console.log('error in response: ',error.toJSON());
        return {isError:true,msg:Api_Notification_Messages.responseFailure,code:error.response.status}
    }
    else if(error.request){
        //request made but no respond from server
        console.log('error in request: ',error.toJSON());
        return {isError:true,msg:Api_Notification_Messages.requestFailure,code:""}
    }
    else{//something happend in setting up request 

        console.log('error in network: ',error.toJSON());
        return {isError:true,msg:Api_Notification_Messages.networkFailure,code:""}

    }

}


const API={};
for(const  [key,value] of Object.entries(SERVICE_URLS)){
    API[key]=(body,showUploadProgress,showDownloadProgress)=> 
        axiosInstance({
            method:value.method,
            url:value.url,
            data:body,
            responseType:value.responseType,
            onUploadProgress:function(progressEvent){
                if(showUploadProgress){
                    let PercentageCompleted=Math.round((progressEvent.loaded*100)/progressEvent.total)
                    showUploadProgress(PercentageCompleted)
                }
            },

            onDownloadProgress:function(progressEvent){
                if(showDownloadProgress){
                    let PercentageCompleted=Math.round((progressEvent.loaded*100)/progressEvent.total)
                    showDownloadProgress(PercentageCompleted)
                }
            }
        })
    
};

export {API};