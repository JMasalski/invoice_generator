import {create} from 'zustand'
import {axiosInstance} from '../lib/axiosInstance.js'
import toast from "react-hot-toast";


export const useAuthStore = create((set) => ({
    authUser: null,
    checkingAuth: true,
    loading: false,

    signUp: async (signUpData) => {
        try {
            set({loading: true})
            const res = await axiosInstance.post("/auth/sign-up", signUpData)
            set({authUser: res.data.user})
        } catch (e) {
            console.log(e.response.data.message)
            toast.error(e.response.data.message)
        } finally {
            set({loading: false})
        }
    },
    login: async (loginData) => {
        try {
            set({loading: true})
            const res = await axiosInstance.post("/auth/sign-in", loginData)
            set({authUser: res.data.user})
            console.log("Logged in user:", res.data.user)
        } catch (e) {
            console.log(e.response.data.message)
            toast.error(e.response.data.message)
        } finally {
            set({loading: false})
        }

    },
    logout: async () => {
        try {
            const res = await axiosInstance.post("/auth/sign-out");
            if (res.status === 200) set({ authUser: null });
        } catch (error) {
            console.log(error.response.data.message)
            toast.error(error.response.data.message)
        }
    },
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/current-user")
            set({authUser: res.data.user})
        } catch (e) {
            set({authUser: null})
            console.log(e)
        } finally {
            set({checkingAuth: false})
        }
    }
}))