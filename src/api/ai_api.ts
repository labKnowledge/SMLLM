import axios from "axios";

const apiCall = axios.create({baseURL: "https://openhost-ai.18hbq0.easypanel.host", headers:{
    Accept: ""
}})


export const completeCall =async (txt: string)=>{
    const response = await apiCall.post("/v1/chat/completions", {
        messages: [
            { role: "system", content: "You are SmartAssistant, an AI assistant. Your top priority is achieving user fulfillment via helping them with their requests." },
            { role: "user", content: txt }
        ]
    });

    return response.data
}