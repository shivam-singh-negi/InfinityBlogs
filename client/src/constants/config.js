export const Api_Notification_Messages={
    loading:{
        title:"Loading....",
        message:"data is being loaded. Please wait"
    },
    success:{
        title:"Success",
        message:"Data sucessfully loaded"
    },
    responseFailure:{
        title:"Error",
        message:"An error occurred while fetching response from the server. Please try again"
    },
    requestFailure:{
        title:"Error",
        message:"An error occurred while parsing data"
    },
    networkFailure:{
        title:"Error",
        message:"unable to connect with the server. please check internt or try again later"
    }

}


//sample request
//needed service calls:{url:'/', method:"POST/GET/PUT/DELETE", params:true/false,query:true/false}

export const SERVICE_URLS={
    userSignUp: {url:'/signup',method:'POST'}
}