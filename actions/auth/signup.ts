"use server"

import { fetchApiClient } from "@/lib/oneentry"
import { IAttributes } from "oneentry/dist/base/utils"

export const getSignupFormData=async ():Promise<IAttributes[]>=>{
    try{
        const apiClient=await fetchApiClient()
       
        const response=await apiClient.Forms.getFormByMarker("sign-up-live");
        return response?.attributes as unknown as IAttributes[]
    }
    catch(error:any){
        console.error(error)
        throw new Error("Fetching form data failed")
    }
}

export const handleSignupSubmit=async (inputValues:{
    "email-live":string,
    "password-live":string,
    "name-live":string;
})=>{
    try{
        const apiClient=await fetchApiClient()
        const data={
            formIdentifier:"sign-up-live",
            authData:[
                {
                    marker:"email-live",
                    value:inputValues["email-live"],
                },
                {
                    marker:"password-live",
                    value:inputValues["password-live"]
                },
            ],
            formData:[
                {
                    marker:"name-live",
                    type:"string",
                    value:inputValues["name-live"],
                },
            ],
            notificationData:{
                email:inputValues["email-live"],
                phonePush:["+99999999999"],
                phoneSMS:"+99999999999",
            },
            };
        
        const value=await apiClient.AuthProvider.signUp("email-live",data)
        return value
    }
    catch(error:any){
        console.error(error)
        if(error?.statusCode===400){
            return {message:error?.message}
        }
        throw new Error("Account Creation Failed. Please try again later")
    }
}