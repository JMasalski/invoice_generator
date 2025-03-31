import {create} from 'zustand'
import {axiosInstance} from "../lib/axiosInstance.js";

import toast from "react-hot-toast";

export const useInvoiceStore =create ((set) => ({
    invoices: [],
    loading: false,

    addInvoice: async (invoiceData) => {
        try {
            set({loading: true});
            const res = await axiosInstance.post("/invoice/create-invoice", invoiceData);
            const newInvoice = res.data.invoice;
            console.log("Dane zwrotne",newInvoice);
            set(state => ({invoices: [...state.invoices, newInvoice]}));
            toast.success("Invoice added successfully");

            const pdfRes = await axiosInstance.get(`/invoice/create-pdf/${newInvoice._id}`, {
                responseType: "blob" // Pobiera dane jako plik binarny (PDF)
            });
            const pdfBlob = new Blob([pdfRes.data], { type: "application/pdf" });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, "_blank", "noopener,noreferrer");
            setTimeout(() => URL.revokeObjectURL(pdfUrl), 10000);
        } catch (e) {
            console.log(e.response.data.message);
            toast.error(e.response?.data?.message || "Error adding invoice");
        } finally {
            set({loading: false});
        }
    },

    fetchInvoice: async () =>{
        try{
            set({loading:true})
            const res = await axiosInstance.get("invoice/get-all-invoices")
            set({invoices: res.data.invoices})
            console.log(res.data.invoices)
        }catch (e) {

        }finally {
            set({loading: false})
        }
    },

    deleteInvoice: async(invoiceId) =>{
        try{
            const res = await axiosInstance.delete(`invoice/delete-invoice/${invoiceId}`)
            set({invoices: res.data.invoices});
            toast.success(res.data.message)
        }
        catch(e){
            console.log(e.response.data.message)
            toast.error(e.response?.data?.message || "Error deleting invoice")
        }
    },

}))