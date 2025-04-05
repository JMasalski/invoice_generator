import React, {useState} from 'react'
import {useClientStore} from '../store/useClientStore.js'
import {LoaderCircle, Plus} from "lucide-react";

const ClientForm = () => {
    const {addClient, loading} = useClientStore();
    const [clientData, setClientData] = useState({
        name: "",
        companyName: "",
        taxId: "",
        address: {
            street: "",
            city: "",
            postalCode: "",
            country: "",
        },
        bankAccount: "",
    })
    return (
        <form
            onSubmit={() => addClient(clientData)}
            className="text-white p-2 md:p-4 lg:p-5"
        >
            <h3 className="font-bold text-xl leading-tight">
                Dane personalne
            </h3>
            <div className="border-b-2 border-gray-400 mb-5"/>
            <div className=" flex flex-col mb-3">
                <label htmlFor='name' className=" text-md fond-medium  font-semibold">Imię i nazwisko</label>
                <div className="mb-4">
                    <input
                        type="text"
                        name="name"
                        value={clientData.name}
                        onChange={(e) => setClientData({...clientData, name: e.target.value})}
                        className="input input-bordered border-indigo-400 bg-slate-950 focus:ring-2 focus:ring-teal-400  focus:outline-none w-full"
                    />
                </div>

            </div>
            <h3 className="font-bold text-xl leading-tight">
                Informacje o firmie
            </h3>
            <div className="border-b-2 border-gray-400 mb-5"/>
            <div className="flex justify-between gap-x-4">
                <div className=" flex flex-col mb-3 flex-1">
                    <label htmlFor='companyName' className=" text-md fond-medium  font-semibold">Nazwa firmy</label>
                    <input
                        id="companyName"
                        type="text"
                        value={clientData.companyName}
                        onChange={(e) => setClientData({...clientData, companyName: e.target.value})}
                        className="w-full input input-bordered border-indigo-400 bg-slate-950 focus:ring-2 focus:ring-teal-400  focus:outline-none"
                    />
                </div>
                <div className="flex flex-col mb-3 flex-1">
                    <label htmlFor='taxId' className=" text-md fond-medium  font-semibold">NIP</label>
                    <input
                        id="taxId"
                        type="text"
                        value={clientData.taxId}
                        onChange={(e) => setClientData({...clientData, taxId: e.target.value})}
                        className="w-full input input-bordered border-indigo-400 bg-slate-950 focus:ring-2 focus:ring-teal-400  focus:outline-none"
                    />
                </div>
                <div className=" flex flex-col mb-3 flex-1">
                    <label htmlFor='bankAccount' className=" text-md fond-medium  font-semibold">Numer konta</label>
                    <input
                        id="bankAccount"
                        type="text"
                        value={clientData.bankAccount}
                        onChange={(e) => setClientData({...clientData, bankAccount: e.target.value})}
                        className="w-full input input-bordered border-indigo-400 bg-slate-950 focus:ring-2 focus:ring-teal-400  focus:outline-none"
                    />
                </div>
            </div>

            {/*Adress*/}
            <h3 className="font-bold text-xl leading-tight">
                Adres
            </h3>
            <div className="border-b-2 border-gray-400 mb-5"/>
            <div className="grid grid-cols-2 gap-x-4">
                <div className=" flex flex-col mb-3">
                    <label htmlFor='city' className=" text-md fond-medium  font-semibold">Miasto</label>
                    <input
                        id="city"
                        type="text"
                        value={clientData.address.city}
                        onChange={(e) => setClientData({
                            ...clientData,
                            address: {...clientData.address, city: e.target.value}
                        })}
                        className="w-full input input-bordered border-indigo-400 bg-slate-950 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                    />
                </div>
                <div className=" flex flex-col mb-3">
                    <label htmlFor='street' className=" text-md fond-medium  font-semibold">Ulica</label>
                    <input
                        id="street"
                        type="text"
                        value={clientData.address.street}
                        onChange={(e) => setClientData({
                            ...clientData,
                            address: {...clientData.address, street: e.target.value}
                        })}
                        className="w-full input input-bordered border-indigo-400 bg-slate-950 focus:ring-2 focus:ring-teal-400  focus:outline-none"
                    />
                </div>
                <div className="flex flex-col mb-3 ">
                    <label htmlFor='postalCode' className=" text-md fond-medium  font-semibold">Kod pocztowy</label>
                    <input
                        id="postalCode"
                        type="text"
                        value={clientData.address.postalCode}
                        onChange={(e) => setClientData({
                            ...clientData,
                            address: {...clientData.address, postalCode: e.target.value}
                        })}
                        className="w-full input input-bordered border-indigo-400 bg-slate-950 focus:ring-2 focus:ring-teal-400  focus:outline-none"
                    />
                </div>
                <div className=" flex flex-col mb-3">
                    <label htmlFor='taxId' className=" text-md fond-medium  font-semibold">Kraj</label>
                    <input
                        id="taxId"
                        type="text"
                        value={clientData.address.country}
                        onChange={(e) => setClientData({
                            ...clientData,
                            address: {...clientData.address, country: e.target.value}
                        })}
                        className="w-full input input-bordered border-indigo-400 bg-slate-950 focus:ring-2 focus:ring-teal-400  focus:outline-none"
                    />
                </div>
            </div>
            <button
                type="submit"
                disabled={loading}
                className="bg-slate-800 rounded-md w-full flex items-center justify-center p-2 cursor-pointer hover:bg-slate-700 transition duration-200"
            >
                {loading ? <LoaderCircle className="animate-spin"/> : <Plus/>}
            </button>
        </form>
    )
}


export default ClientForm
