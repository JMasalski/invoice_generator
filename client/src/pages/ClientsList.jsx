import React, {useEffect, useState} from 'react'

import {useClientStore} from "../store/useClientStore";
import {FileX, Loader, Pencil, UserRound} from "lucide-react";
import EditClientModal from "../components/Forms/EditClientModal.jsx";
import {Link} from "react-router-dom";

const ClientsList = () => {
    const {fetchClients, loading, clients, deleteClient} = useClientStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

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
            <div className="badge badge-info p-2 md:p-5 ">
                <h1 className="text-lg md:text-3xl leading-tight flex items-center gap-x-4">
                    <UserRound/>
                    Twoi klienci
                </h1>
            </div>
            <div className="flex gap-5 justify-center">
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-slate-950 mt-5 ">
                    {loading && (
                        <div
                            className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-70 z-50">
                            <Loader className="animate-spin text-blue-500" size={48}/>
                        </div>
                    )}
                    {clients.length === 0 ? (
                        <div className="p-2 md:p-4 lg:p-6 flex flex-col bg-amber-400  text-black">
                            Brak klientów
                            <Link to={'/invoices/add'} className="link link-hover">Dodaj klienta</Link>
                        </div>
                    ) : (
                        <table className="table text-white text-md md:text-2xl ">
                            <thead className="text-white text-md md:text-3xl ">
                            <tr className="text-center">
                                <th className="px-12 py-2">Imię</th>
                                <th className="px-12 py-2">Nazwa firmy</th>
                                <th className="px-12 py-2">NIP</th>
                                <th className="px-12 py-2">Adres</th>
                                <th className="px-12 py-2">Edytuj/Usuń</th>
                            </tr>
                            </thead>
                            <tbody>
                            {clients.map((client) => (
                                <tr key={client.id} className="text-center">
                                    <td className="px-12 py-2 ">{client.name}</td>
                                    <td className="px-12 py-2 ">{client.companyName}</td>
                                    <td className="px-12 py-2 ">{client.taxId}</td>
                                    <td className="px-12 py-2 ">{client.address.city}, {client.address.street}</td>
                                    <td className="px-12 py-2 flex justify-center space-x-3">
                                        <button
                                            className="bg-indigo-400 p-2 text-white rounded-md cursor-pointer"
                                            onClick={() => openEditModal(client)}
                                        >
                                            <Pencil />
                                        </button>
                                        <button
                                            className="bg-pink-400 p-2 text-white rounded-md cursor-pointer"
                                            onClick={() => handleDeleteClient(client._id)}
                                        >
                                            <FileX />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
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

export default ClientsList