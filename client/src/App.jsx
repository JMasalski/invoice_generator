import {Routes, Route, Navigate} from "react-router-dom";
import AuthPage from "./pages/AuthPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import {useAuthStore} from "./store/useAuthStore.js";
import {useEffect} from "react";
import {Toaster} from "react-hot-toast";
import Layout from "./components/Layout.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import InvoicePage from "./pages/InvoicePage.jsx";
import ClientsList from "./pages/ClientsList.jsx";
import ClientForm  from "./pages/ClientForm.jsx";
import InvoiceList from "./components/InvoiceList.jsx";

function App() {
    const {checkingAuth, authUser, checkAuth} = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (checkingAuth) return null;

    return (
        <>
            <Routes>

                <Route path="/" element={authUser ? <Layout /> : <Navigate to="/auth" />}>
                    <Route index element={<HomePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/invoices/add" element={<InvoicePage />} />
                    <Route path="/invoices" element={<InvoiceList />} />
                    <Route path="/clients" element={<ClientsList />} />
                    <Route path="/clients/add" element={<ClientForm />} />
                </Route>

                <Route path="/auth" element={!authUser ? <AuthPage /> : <Navigate to="/" />} />

                <Route path="*" element={<Navigate to={authUser ? "/" : "/auth"} />} />
            </Routes>
            <Toaster />
        </>

    );
}

export default App;