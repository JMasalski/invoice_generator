import React, {useEffect} from 'react'
import ClientForm from "../components/Forms/ClientForm";
import {useClientStore} from "../store/useClientStore";
import {FileX, Loader, Pencil} from "lucide-react";

const ClientsPage = () => {
    const {fetchClients, loading, clients,deleteClient} = useClientStore();

    const handleDeleteClient = (cid) => {
        deleteClient(cid)
    }

    useEffect(() => {
        fetchClients()
    }, [fetchClients])
    return (
        <div className="flex flex-col md:flex-row gap-5 pt-1 md:pt-2 lg:pt-4">
            {/* Left side */}
            <div className="flex-1 gap-5">
                <h1 className="text-3xl leading-tight">Add New Client</h1>
                <ClientForm/>
            </div>
            {/* Right side */}
            <div>
                <h1 className="text-3xl leading-tight">Your Clients</h1>
                <div className="flex flex-1 gap-5">
                    <div className="mt-4 overflow-auto">
                        {loading && (
                            <div
                                className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-70 z-50">
                                <Loader className="animate-spin text-blue-500" size={48}/>
                            </div>
                        )}
                        <table className="table-auto border-separate border-spacing-y-2">
                            <thead>
                            <tr>
                                <th className="px-4 py-2 border-b-2">Name</th>
                                <th className="px-4 py-2 border-b-2">Email</th>
                                <th className="px-4 py-2 border-b-2">Company Name</th>
                                <th className="px-4 py-2 border-b-2">Tax ID</th>
                                <th className="px-4 py-2 border-b-2">Address</th>
                                <th className="px-4 py-2 border-b-2">Bank Account</th>
                                <th className="px-4 py-2 border-b-2">Phone</th>
                                <th className="px-4 py-2 border-b-2">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {clients.map((client) => (
                                <tr key={client.id}>
                                    <td className="px-4 py-2 border-b">{client.name}</td>
                                    <td className="px-4 py-2 border-b">{client.email}</td>
                                    <td className="px-4 py-2 border-b">{client.companyName}</td>
                                    <td className="px-4 py-2 border-b">{client.taxId}</td>
                                    <td className="px-4 py-2 border-b">{client.address.city}</td>
                                    <td className="px-4 py-2 border-b">{client.bankAccount}</td>
                                    <td className="px-4 py-2 border-b">{client.phone}</td>
                                    <td className="px-4 py-2 flex space-x-3">
                                        <button
                                            className="bg-blue-500 p-2 text-white rounded-md"
                                            // onClick={() => openEditModal(product)}
                                        >
                                            <Pencil size={15}/>
                                        </button>
                                        <button
                                            className="bg-red-500 p-2 text-white rounded-md"
                                            onClick={() => handleDeleteClient(client._id)}
                                        >
                                            <FileX size={15}/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ClientsPage
