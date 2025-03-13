import {create} from 'zustand'
import {axiosInstance} from "../lib/axiosInstance.js";
import toast from "react-hot-toast";

export const useProductStore = create((set) => ({
    products: [],
    loading: false,
    productLoading: false,

    getProducts: async () => {
        try {
            set({loading: true})
            const res = await axiosInstance.get("product/get-all-products")
            set({products: res.data.products})
            console.log(res.data.products)
        } catch (e) {
            console.log(e.response.data.message)
            toast.error(e.response.data.message)
        } finally {
            set({loading: false})
        }
    },
    addProduct: async (product) => {
        try {
            set({productLoading: true});
            const res = await axiosInstance.post("product/create", product);
            const newProduct = res.data.product
            set(state=>({products:[...state.products,newProduct]}))
            toast.success(res.data.message);
            console.log(newProduct);
        } catch (e) {
            console.log(e.response.data.message);
            toast.error(e.response?.data?.message || "Error adding product");
        }finally {
            set({productLoading: false})
        }

    },
    deleteProduct: async (id) => {
        try {
            set({ loading: true });
            const res = await axiosInstance.delete(`product/delete-product/${id}`);
            set({ products: res.data.products });
            toast.success(res.data.message);
            console.log(res.data.products);
        } catch (e) {
            console.log(e.response.data.message);
            toast.error(e.response?.data?.message || "Error deleting product");
        } finally {
            set({ loading: false });
        }
    }

}))
