import { api, handleApiError } from "@/src/lib/axios"

export const getAllProperties = async (querry?:string) => {
   try {
     const res = await api.get(`/properties/projects?${querry}` )
     return res.data
   } catch (error) {
    throw handleApiError(error)
   }
}