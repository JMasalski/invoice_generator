import React, {useEffect} from 'react'
import {useClientStore} from "../../store/useClientStore.js";

const InvoiceForm = () => {
    const {fetchClient,clients, setSelectedClient,selectedClient} = useClientStore();


    useEffect(() => {
            fetchClient()
        }, [])

    const handleClientChange = (e) =>{
        const client = clients.find(client => client._id === e.target.value)
        setSelectedClient(client)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(selectedClient)
        const { name, email, taxId, companyName, address, bankAccount } = selectedClient || {};
        const invoiceData = {
            clientName: name,
            clientEmail: email,
            clientCompany: companyName,
            clientTaxId: taxId,
            clientAddress: address,
            clientBankAccount: bankAccount
        }
        console.log(invoiceData);

    }
    return (
        <form
        onSubmit={handleSubmit}
        >
            <select onChange={handleClientChange}>
                <option value={null}>
                    Select Client
                </option>
                {clients.map((client) =>(
                    <option key={client._id} value={client._id}>
                        {client.name}
                    </option>
                ))}
            </select>
            <button type="submit">Submit</button>
        </form>
    )
}
export default InvoiceForm
