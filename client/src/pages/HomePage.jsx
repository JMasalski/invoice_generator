import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import OnBoarding from "../components/OnBoarding";
import Dashboard from "../components/Dashboard";
import { useInvoiceStore } from "../store/useInvoiceStore";
import { useClientStore } from "../store/useClientStore";

const HomePage = () => {
    const { authUser } = useAuthStore();
    const { invoices, fetchInvoices } = useInvoiceStore();
    const { clients, fetchClients } = useClientStore();

    useEffect(() => {
        const loadData = async () => {
            await fetchClients();
            await fetchInvoices();
        };

        loadData();
    }, []);

    // Obliczanie postępu onboardingowego
    const completedSteps = [
        authUser.address,
        authUser.taxId,
        authUser.companyName,
        authUser.phone,
        authUser.bankAccount,
        invoices.length > 0,
        clients.length > 0,
    ].filter(Boolean).length;

    const totalSteps = 7;
    const progress = (completedSteps / totalSteps) * 100;
    const isOnboardingComplete = completedSteps === totalSteps;

    return (
        <div className="p-1 md:p-3 lg:p-6">
            {isOnboardingComplete ? <Dashboard /> : <OnBoarding progress={progress} completedSteps={completedSteps} totalSteps={totalSteps} authUser={authUser} invoices={invoices} clients={clients} />}
        </div>
    );
};

export default HomePage;
