import React from 'react'
import {useInvoiceStore} from "../store/useInvoiceStore.js";
import MonthlyInvoiceChart from "./MonthlyInvoiceChart.jsx";
import CountUp from "react-countup";
import {useClientStore} from "../store/useClientStore.js";
import RecentInvoicesList from "./RecentInvoices.jsx";

const Dashboard = () => {
    const {invoices} = useInvoiceStore();
    const {clients} = useClientStore()
    const totalIncome = invoices.reduce((acc, invoice) => {
        const amount = Number(invoice.totalGrossAmount);
        return acc + (isNaN(amount) ? 0 : amount);
    }, 0);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4 md:p-6 lg:p-8">
            <div className="flex flex-col gap-y-4">
                <h1 className="text-2xl font-bold text-white text-center">
                    Przychody z ostatnich 3 miesięcy
                </h1>
                <div className="w-full">
                    <MonthlyInvoiceChart invoices={invoices}/>
                </div>
            </div>

            {/* Statystyki */}
            <div className="flex justify-center items-center col-span-1 md:col-span-1">
                <div
                    className="stats stats-vertical bg-slate-700 text-white shadow-xl p-2 md:p-4 lg:p-6 rounded-2xl w-full max-w-md gap-6">
                    <div className="stat">
                        <div className="stat-title text-xl text-gray-200">Przychód ogółem</div>
                        <div className="stat-value text-3xl">
                            <CountUp end={totalIncome} duration={5} decimals={2} prefix="PLN "/>
                        </div>
                    </div>

                    <div className="stat">
                        <div className="stat-title text-xl text-gray-200">Liczba wystawionych faktur</div>
                        <div className="stat-value text-3xl">
                            <CountUp end={invoices.length} duration={5}/>
                        </div>
                    </div>

                    <div className="stat">
                        <div className="stat-title text-xl text-gray-200">Liczba klientów</div>
                        <div className="stat-value text-3xl">
                            <CountUp end={clients.length} duration={5}/>
                        </div>
                    </div>
                </div>
            </div>
            <RecentInvoicesList invoices={invoices}/>
        </div>
    );

}
export default Dashboard
