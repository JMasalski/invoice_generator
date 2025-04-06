import React, {useEffect} from 'react'
import {useInvoiceStore} from "../store/useInvoiceStore.js";
import { Loader} from "lucide-react";
import {Link} from "react-router-dom";


const InvoiceList = () => {
    const {invoices,fetchInvoices,loading} =useInvoiceStore();
    useEffect(() => {
        fetchInvoices();
    }, []);

    console.log(invoices);

    return (
        <div className="flex gap-5 justify-center">
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-slate-950 mt-5 ">
                {loading && (
                    <div
                        className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-70 z-50">
                        <Loader className="animate-spin text-blue-500" size={48}/>
                    </div>
                )}
                {invoices.length === 0 ? (
                    <div className="p-2 md:p-4 lg:p-6 flex flex-col bg-amber-400  text-black">
                        Brak faktur
                        <Link to={'/clients/add'} className="link link-hover">Stwórz fakturę</Link>
                    </div>
                ) : (
                    <table className="table text-white">
                        <thead className="text-white">
                        <tr>
                            <th className="px-4 py-2">Nr faktury</th>
                            <th className="px-4 py-2">Data wystawienia</th>
                            <th className="px-4 py-2">Klient</th>
                            <th className="px-4 py-2">Kwota</th>
                            <th className="px-4 py-2">Termin płatności</th>
                            <th className="px-4 py-2">Pobierz PDF</th>
                        </tr>
                        </thead>
                        <tbody>
                        {invoices.map((invoice) => (
                            <tr key={invoice.id}>
                                <td className="px-4 py-2 ">{invoice.invoiceNumber}</td>
                                <td className="px-4 py-2 ">{invoice.issueDate.split("T")[0]}</td>
                                <td className="px-4 py-2 ">{invoice.client?.companyName || "Brak danych"}</td>
                                <td className="px-4 py-2 ">{invoice.totalGrossAmount}</td>
                                <td className="px-4 py-2 ">{invoice.dueDate.split("T")[0]}</td>

                                <td className="px-4 py-2 flex space-x-3">
                                    {/*<button*/}
                                    {/*    className="bg-indigo-400 p-2 text-white rounded-md cursor-pointer"*/}
                                    {/*    onClick={() => openEditModal(client)}*/}
                                    {/*>*/}
                                    {/*    <Pencil size={15}/>*/}
                                    {/*</button>*/}
                                    {/*<button*/}
                                    {/*    className="bg-pink-400 p-2 text-white rounded-md cursor-pointer"*/}
                                    {/*    onClick={() => handleDeleteClient(client._id)}*/}
                                    {/*>*/}
                                    {/*    <FileX size={15}/>*/}
                                    {/*</button>*/}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
export default InvoiceList
