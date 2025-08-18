import { api, handleApiError } from "@/src/lib/axios"

export const getAllCommunities = async (page: number = 1, size: number = 100) => {
   try {
     const res = await api.get(`/locations/communities/ordered?page=${page}&size=${size}&include_unordered=false`)
     return res.data
   } catch (error) {
    throw handleApiError(error)
   }
}