import React from 'react'
import InvoiceForm from "../components/Forms/InvoiceForm.jsx";
import {useAuthStore} from "../store/useAuthStore.js";


const InvoicePage = () => {
    const {authUser} = useAuthStore();
    return (
        <div className="p-2 md:p-4 lg:p-6">
            <div className="flex justify-around ">
                <div>
                    <h1 className="text-xl font-semibold ">
                        Issuer
                    </h1>
                    <div className="text-gray-600">
                        <p >
                            {authUser.companyName}
                        </p>
                        <p >
                            Tax ID: {authUser.taxId}
                        </p>
                        <p>
                            IBAN:{authUser.bankAccount}
                        </p>
                        <p>
                            {authUser.address.postalCode} {authUser.address.city}
                        </p>
                        <p>
                            {authUser.address.street}
                        </p>
                    </div>
                </div>
                <div>
                    <h1 className="text-xl font-semibold ">
                        Recipient
                    </h1>
                </div>
            </div>
            <div className="border-b-2 border-gray-200 my-5"/>
            <InvoiceForm/>
        </div>
    )
}
export default InvoicePage
