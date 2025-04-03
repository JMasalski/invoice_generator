import React, {useEffect, useState} from 'react'

import {useClientStore} from "../store/useClientStore";
import {FileX, Loader, Pencil} from "lucide-react";
import EditClientModal from "../components/Forms/EditClientModal.jsx";

const ClientsPage = () => {
    const {fetchClients, loading, clients, deleteClient} = useClientStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null); // Dodano brakujący stan

    const openEditModal = (client) => {
        setSelectedClient(client);
        setIsModalOpen(true);
        document.getElementById('edit_client_modal').showModal();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.getElementById('edit_client_modal').close();
    };

    const handleDeleteClient = (cid) => {
        deleteClient(cid)
    }

    useEffect(() => {
        fetchClients()
    }, [fetchClients])

    return (
        <div className="p-2 md:p-4 text-base-200 lg:p-6 ">
            <h1 className="text-3xl leading-tight ">Twoi klienci</h1>
            <div className="flex gap-5 justify-center">
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-slate-950 mt-5 ">
                    {loading && (
                        <div
                            className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-70 z-50">
                            <Loader className="animate-spin text-blue-500" size={48}/>
                        </div>
                    )}
                    <table className="table">
                        <thead className="text-white">
                        <tr>
                            <th className="px-4 py-2">Imię</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Company Name</th>
                            <th className="px-4 py-2">Tax ID</th>
                            <th className="px-4 py-2">Address</th>
                            <th className="px-4 py-2">Phone</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clients.map((client) => (
                            <tr key={client.id}>
                                <td className="px-4 py-2 ">{client.name}</td>
                                <td className="px-4 py-2 ">{client.email}</td>
                                <td className="px-4 py-2 ">{client.companyName}</td>
                                <td className="px-4 py-2 ">{client.taxId}</td>
                                <td className="px-4 py-2 ">{client.address.city}, {client.address.street}</td>
                                <td className="px-4 py-2 ">{client.phone}</td>
                                <td className="px-4 py-2 flex space-x-3">
                                    <button
                                        className="bg-indigo-400 p-2 text-white rounded-md cursor-pointer"
                                        onClick={() => openEditModal(client)}
                                    >
                                        <Pencil size={15}/>
                                    </button>
                                    <button
                                        className="bg-pink-400 p-2 text-white rounded-md cursor-pointer"
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
            <EditClientModal
                isOpen={isModalOpen}
                client={selectedClient}
                onClose={closeModal}
            />
        </div>
    )
}
export default ClientsPage