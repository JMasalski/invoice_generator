import {create} from 'zustand'
import {axiosInstance} from "../lib/axiosInstance.js";

import toast from "react-hot-toast";

export const useInvoiceStore = create((set) => ({
    invoices: [],
    loading: false,

    addInvoice: async (invoiceData) => {
        try {
            set({loading: true});
            const res = await axiosInstance.post("/invoice/create-invoice", invoiceData);
            const newInvoice = res.data.invoice;
            set(state => ({invoices: [...state.invoices, newInvoice]}));
            toast.success("Stworzono fakturę");

            const pdfRes = await axiosInstance.get(`/invoice/create-pdf/${newInvoice._id}`, {
                responseType: "blob"
            });
            const pdfBlob = new Blob([pdfRes.data], {type: "application/pdf"});
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

    fetchInvoices: async () => {
        try {
            set({loading: true});
            const res = await axiosInstance.get("invoice/get-invoices");

            set(state => {
                return {invoices: res.data.invoices};
            });

        } catch (e) {
            console.error("Error fetching invoices:", e);
        } finally {
            set({loading: false});
        }
    },

    downloadPDF: async(invoiceId) => {
        try{
            const pdfRes = await axiosInstance.get(`/invoice/create-pdf/${invoiceId}`, {
                responseType: "blob"
            });
            const pdfBlob = new Blob([pdfRes.data], {type: "application/pdf"});
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, "_blank", "noopener,noreferrer");
            setTimeout(() => URL.revokeObjectURL(pdfUrl), 10000);
        }catch(e){
            console.error("Error downloading PDF:", e);
            toast.error(e.response?.data?.message || "Błąd w pobieraniu faktury");
        }
    }

}))