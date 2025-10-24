import { api, handleApiError } from "@/src/lib/axios"

export const getAllProperties = async (querry?:string) => {
   try {
     const res = await api.get(`/properties/projects?portal=ownerPortal&${querry}` )
     return res.data
   } catch (error) {
    throw handleApiError(error)
   }
}
export const getPropertyById = async (id:string) => {
   try {
     const res = await api.get(`/properties/projects?portal=ownerPortal&project_id=${id}` )
     return res.data
   } catch (error) {
    throw handleApiError(error)
   }
}