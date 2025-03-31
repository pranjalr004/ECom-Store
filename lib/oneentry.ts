import retrieveRefreshToken from "@/actions/auth/retrieveRefreshToken";
import storeRefreshToken from "@/actions/auth/storeRefreshToken";
import {defineOneEntry} from "oneentry"

export type ApiClientType=ReturnType<typeof defineOneEntry> | null

let apiClient:ApiClientType=null

async function setupApiClient() : Promise<ReturnType<typeof defineOneEntry>> {
    const apiUrl=process.env.ONEENTRY_PROJECT_URL;
    console.log({apiUrl, token:process.env.ONEENTRY_TOKEN})
    if(!apiUrl){
        throw new Error("ONEENTRY_PROJECT_URL env var is missing")
    }

   if(!apiClient){
    try{
        const refreshToken=await retrieveRefreshToken()
        apiClient=defineOneEntry(apiUrl,{
            token:process.env.ONEENTRY_TOKEN,
            langCode:"en_US",
            auth:{
                refreshToken:refreshToken || undefined,
                customAuth:false,
                saveFunction:async(newToken:string)=>{
                    await storeRefreshToken(newToken)
                }
            }
        })
    }
    catch(error){
        console.error("Error fetching refresh token",error)
   }
}

    if(!apiClient){
        throw new Error("Failed to initialize API Client")
    }

return apiClient
}

export async function fetchApiClient():Promise<ReturnType<typeof defineOneEntry>>{
    if(!apiClient){
        await setupApiClient()
    }
    if(!apiClient){
        throw new Error("Api Client is still null after setup")
    }
    return apiClient 
}