import { api, handleApiError } from "@/src/lib/axios"

export const getAllCommunities = async (querry?:string) => {
   try {
     const res = await api.get(`/locations/communities?${querry}` )
     return res.data
   } catch (error) {
    throw handleApiError(error)
   }
}