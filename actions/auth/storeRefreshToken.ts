"use server"

import { cookies } from "next/headers"

export default async function storeRefreshToken(token:string){
    return (await cookies()).set("refresh_token",token)
}