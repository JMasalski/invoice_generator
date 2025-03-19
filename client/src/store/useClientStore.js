import {create} from 'zustand'
import {axiosInstance} from "../lib/axiosInstance.js";

import toast from "react-hot-toast";

export const useClientStore = create((set) => ({
    clients: [],
    loading: false,

    addClient: async (clientData) => {
        try {
            set({loading: true})
            const res = await axiosInstance.post("/client/create-client", clientData)
            const newClient = res.data.client
            set(state => ({clients: [...state.clients, newClient]}))
            toast.success(res.data.message)
            console.log(newClient)
        } catch (e) {
            console.log(e.response.data.message);
            toast.error(e.response?.data?.message || "Error adding product");
        } finally {
            set({loading: false})
        }
    },

    fetchClient: async () =>{
        try{
            set({loading:true})
            const res = await axiosInstance.get("client/get-all-clients")
            set({clients: res.data.clients})
            console.log(res.data.clients)
        }catch (e) {

        }finally {
            set({loading: false})
        }
    },

    deleteClient: async(cid) =>{
        try{
            const res = await axiosInstance.delete(`client/delete-client/${cid}`)
            set({clients: res.data.clients});
            toast.success(res.data.message)
        }
        catch(e){
            console.log(e.response.data.message)
            toast.error(e.response?.data?.message || "Error deleting client")
        }
    }

}))