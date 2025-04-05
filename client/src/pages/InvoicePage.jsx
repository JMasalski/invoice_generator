import React from 'react'
import InvoiceForm from "../components/Forms/InvoiceForm.jsx";
import {useAuthStore} from "../store/useAuthStore.js";
import {useClientStore} from "../store/useClientStore.js";


const InvoicePage = () => {
    const {authUser} = useAuthStore();
    const {selectedClient} = useClientStore();
    return (
        <div className="p-2 md:p-4 lg:p-6">
            <div className="flex flex-col md:flex-row space-y-3 justify-around text-white ">
                <div>
                    <h1 className="text-xl md:text-2xl font-semibold ">
                        Sprzedawca
                    </h1>
                    <div className="text-md lg:text-lg text-slate-700">
                        {authUser.address &&
                        authUser.taxId &&
                        authUser.companyName &&
                        authUser.phone &&
                        authUser.bankAccount ? (
                            <>
                                <p>{authUser.companyName}</p>
                                <p>NIP: {authUser.taxId}</p>
                                <p>IBAN: {authUser.bankAccount}</p>
                                <p>{authUser.address.postalCode} {authUser.address.city}</p>
                                <p>{authUser.address?.street}</p>
                            </>
                        ) : (
                            <p>Brak danych. Uzupełnij jest w <a className="text-blue-400" href={'/settings'}>ustawieniach</a>.</p>
                        )
                        }
                </div>
            </div>
            <div>
                <h1 className=" text-xl md:text-2xl font-semibold ">
                    Nabywca
                </h1>
                {selectedClient && (
                    <div className="text-sm lg:text-lg text-gray-600">
                        <p>{selectedClient.companyName}</p>
                        <p>NIP: {selectedClient.taxId}</p>
                        <p>IBAN: {selectedClient.bankAccount}</p>
                        <p>{selectedClient.address.postalCode} {selectedClient.address.city}</p>
                        <p>{selectedClient.address.street}</p>
                    </div>
                )}

            </div>
        </div>
    <div className="border-b-2 border-gray-200 my-5"/>
    <InvoiceForm/>
</div>
)
}
export default InvoicePage
