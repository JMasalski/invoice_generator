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
            className="mt-5"
        >
            <h3 className="font-bold text-xl leading-tight">
                Personal information
            </h3>
            <div className="border-b-2 border-gray-400 mb-5"/>
            <div className=" flex flex-col mb-3">
                <label htmlFor='name' className=" text-md fond-medium text-gray-800 font-semibold">Name</label>
                <input
                    id="name"
                    type="text"
                    value={clientData.name}
                    onChange={(e) => setClientData({...clientData, name: e.target.value})}
                    className="w-full px-3 py-2 text-blue-700 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-700 focus:outline-hidden"
                />
            </div>
            <h3 className="font-bold text-xl leading-tight">
                Company information
            </h3>
            <div className="border-b-2 border-gray-400 mb-5"/>
            <div className=" flex flex-col mb-3">
                <label htmlFor='companyName' className=" text-md fond-medium text-gray-800 font-semibold">Company
                    name</label>
                <input
                    id="companyName"
                    type="text"
                    value={clientData.companyName}
                    onChange={(e) => setClientData({...clientData, companyName: e.target.value})}
                    className="w-full px-3 py-2 text-blue-700 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-700 focus:outline-hidden"
                />
            </div>
            <div className=" flex flex-col mb-3">
                <label htmlFor='taxId' className=" text-md fond-medium text-gray-800 font-semibold">Tax id</label>
                <input
                    id="taxId"
                    type="text"
                    value={clientData.taxId}
                    onChange={(e) => setClientData({...clientData, taxId: e.target.value})}
                    className="w-full px-3 py-2 text-blue-700 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-700 focus:outline-hidden"
                />
            </div>
            <div className=" flex flex-col mb-3">
                <label htmlFor='bankAccount' className=" text-md fond-medium text-gray-800 font-semibold">IBAN
                    code</label>
                <input
                    id="bankAccount"
                    type="text"
                    value={clientData.bankAccount}
                    onChange={(e) => setClientData({...clientData, bankAccount: e.target.value})}
                    className="w-full px-3 py-2 text-blue-700 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-700 focus:outline-hidden"
                />
            </div>

            {/*Adress*/}
            <h3 className="font-bold text-xl leading-tight">
                Address
            </h3>
            <div className="border-b-2 border-gray-400 mb-5"/>
            <div className="grid grid-cols-2 gap-x-2">
                <div className=" flex flex-col mb-3">
                    <label htmlFor='city' className=" text-md fond-medium text-gray-800 font-semibold">City</label>
                    <input
                        id="city"
                        type="text"
                        value={clientData.address.city}
                        onChange={(e) => setClientData({
                            ...clientData,
                            address: {...clientData.address, city: e.target.value}
                        })}
                        className="w-full px-3 py-2 text-blue-700 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-700 focus:outline-hidden"
                    />
                </div>
                <div className=" flex flex-col mb-3">
                    <label htmlFor='street' className=" text-md fond-medium text-gray-800 font-semibold">Street</label>
                    <input
                        id="street"
                        type="text"
                        value={clientData.address.street}
                        onChange={(e) => setClientData({
                            ...clientData,
                            address: {...clientData.address, street: e.target.value}
                        })}
                        className="w-full px-3 py-2 text-blue-700 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-700 focus:outline-hidden"
                    />
                </div>
                <div className=" flex flex-col mb-3">
                    <label htmlFor='postalCode' className=" text-md fond-medium text-gray-800 font-semibold">Postal
                        Code</label>
                    <input
                        id="postalCode"
                        type="text"
                        value={clientData.address.postalCode}
                        onChange={(e) => setClientData({
                            ...clientData,
                            address: {...clientData.address, postalCode: e.target.value}
                        })}
                        className="w-full px-3 py-2 text-blue-700 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-700 focus:outline-hidden"
                    />
                </div>
                <div className=" flex flex-col mb-3">
                    <label htmlFor='taxId' className=" text-md fond-medium text-gray-800 font-semibold">Country</label>
                    <input
                        id="taxId"
                        type="text"
                        value={clientData.address.country}
                        onChange={(e) => setClientData({
                            ...clientData,
                            address: {...clientData.address, country: e.target.value}
                        })}
                        className="w-full px-3 py-2 text-blue-700 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-700 focus:outline-hidden"
                    />
                </div>
            </div>
            <button
                type="submit"
                disabled={loading}
                className="bg-blue-200 text-blue-700 rounded-md w-full flex items-center justify-center p-2"
            >
                {loading ? <LoaderCircle className="animate-spin"/> : <Plus/>}
            </button>
        </form>
    )
}


export default ClientForm
