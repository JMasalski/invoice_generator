import React from 'react'
import {useInvoiceStore} from "../store/useInvoiceStore.js";

const Dashboard = () => {
    const {invoices} = useInvoiceStore();
    return (
        <div>{invoices.user}</div>
    )
}
export default Dashboard
