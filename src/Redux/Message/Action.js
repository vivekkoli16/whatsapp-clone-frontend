import { BASE_API_URL } from "../../config/api";
import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGE } from "./ActionType";


export const createMessage = (messageData) => async(dispatch) => {
    console.log("create message-&&&& ",messageData)
    console.log("MESSAGEEEEEEE ",messageData.data)
    try{
        const res = await fetch(`${BASE_API_URL}/api/messages/create`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${messageData.token}`
            },
            body:JSON.stringify(messageData.data)
        })
        const data = await res.json();
        console.log("create message--- ",data)
        // if(resData.jwt)localStorage.setItem("token", resData.jwt)
        dispatch({type:CREATE_NEW_MESSAGE,payload:data});
    }catch(error){
        console.log("catch error ",error);
    }
}


export const getAllMessages = (reqData) => async(dispatch) => {
    try{
        const res = await fetch(`${BASE_API_URL}/api/messages/chat/${reqData.chatId}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${reqData.token}`
            }
        })
        const data = await res.json();
        console.log("all messages ",data)
        // if(resData.jwt)localStorage.setItem("token", resData.jwt)
        dispatch({type:GET_ALL_MESSAGE,payload:data});
    }catch(error){
        console.log("catch error ",error);
    }
}


