import React, { useState, useEffect } from 'react';
import {useClientStore} from "../../store/useClientStore.js";

const EditClientModal = ({ client,  onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        companyName: "",
        taxId: "",
        address: {
            street: "",
            city: "",
            postalCode: "",
            country: "",
        },
        bankAccount: "",
    });
    const {editClient} = useClientStore();
    // Aktualizuj dane formularza, gdy zmieni się klient
    useEffect(() => {
        if (client) {
            setFormData({
                name: client.name || "",
                email: client.email || "",
                companyName: client.companyName || "",
                taxId: client.taxId || "",
                address: {
                    street: client.address?.street || "",
                    city: client.address?.city || "",
                    postalCode: client.address?.postalCode || "",
                    country: client.address?.country || "",
                },
                bankAccount: client.bankAccount || "",
            });
        }
    }, [client]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Sprawdź, czy pole jest zagnieżdżone (address)
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editClient(formData, client._id);
        onClose();
    };


    const openModal = () => {
        document.getElementById('edit_client_modal').showModal();
    };

    return (
        <dialog id="edit_client_modal" className="modal modal-middle">
            <div className="modal-box bg-slate-800">
                <h3 className="font-bold text-lg">Edytuj klienta</h3>
                <form onSubmit={handleSubmit}>
                    <div className="py-4">
                        {/* Dane osobowe */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Imię i nazwisko</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="input input-bordered border-indigo-400 bg-slate-950 w-full"
                            />
                        </div>

                        {/* Dane firmowe */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Nazwa firmy</label>
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                className="input input-bordered border-indigo-400 bg-slate-950 w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">NIP</label>
                            <input
                                type="text"
                                name="taxId"
                                value={formData.taxId}
                                onChange={handleChange}
                                className="input input-bordered border-indigo-400 bg-slate-950 w-full"
                            />
                        </div>

                        {/* Adres - pola zagnieżdżone */}
                        <div className="mb-4">
                            <h4 className="font-medium text-sm mb-2">Adres</h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Ulica</label>
                                    <input
                                        type="text"
                                        name="address.street"
                                        value={formData.address.street}
                                        onChange={handleChange}
                                        className="input input-bordered border-indigo-400 bg-slate-950 w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Miasto</label>
                                    <input
                                        type="text"
                                        name="address.city"
                                        value={formData.address.city}
                                        onChange={handleChange}
                                        className="input input-bordered border-indigo-400 bg-slate-950 w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Kod pocztowy</label>
                                    <input
                                        type="text"
                                        name="address.postalCode"
                                        value={formData.address.postalCode}
                                        onChange={handleChange}
                                        className="input input-bordered border-indigo-400 bg-slate-950 w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Kraj</label>
                                    <input
                                        type="text"
                                        name="address.country"
                                        value={formData.address.country}
                                        onChange={handleChange}
                                        className="input input-bordered border-indigo-400 bg-slate-950 w-full"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Dane bankowe */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Numer konta bankowego</label>
                            <input
                                type="text"
                                name="bankAccount"
                                value={formData.bankAccount}
                                onChange={handleChange}
                                className="input input-bordered border-indigo-400 bg-slate-950 w-full"
                            />
                        </div>
                    </div>

                    <div className="modal-action">
                        <button type="submit" className="btn bg-teal-400">Zapisz</button>
                        <button
                            type="button"
                            className="btn"
                            onClick={onClose}
                        >
                            Anuluj
                        </button>
                    </div>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>zamknij</button>
            </form>
        </dialog>
    );
};

export default EditClientModal;