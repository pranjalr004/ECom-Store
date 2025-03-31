"use server"

import { fetchApiClient } from "@/lib/oneentry"
import { IAttributes } from "oneentry/dist/base/utils"

export const getSigninFormData=async ():Promise<IAttributes[]>=>{
    try{
        const apiClient=await fetchApiClient()
        const response=await apiClient.Forms.getFormByMarker("sign-in-live");
        return response?.attributes as unknown as IAttributes[]
    }
    catch(error:any){
        console.error(error)
        throw new Error("Fetching form data failed")
    }
}