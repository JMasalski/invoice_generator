import {Routes, Route, Navigate} from "react-router-dom";
import AuthPage from "./pages/AuthPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import {useAuthStore} from "./store/useAuthStore.js";
import {useEffect} from "react";
import {Toaster} from "react-hot-toast";
import Layout from "./components/Layout.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import InvoicePage from "./pages/InvoicePage.jsx";
import ClientsPage from "./pages/ClientsPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";

function App() {
    const {checkingAuth, authUser, checkAuth} = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        console.log("Auth user:", authUser);
    }, [authUser]);

    if (checkingAuth) return null;

    return (
        <>
            <Routes>
                <Route path="/" element={authUser ? <Layout /> : <Navigate to="/auth" />}>
                    <Route index element={<HomePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    {/*<Route path="/invoices" element={<InvoicePage />} />*/}
                    <Route path="/invoices/new" element={<InvoicePage />} />
                    <Route path="/clients" element={<ClientsPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                </Route>
                <Route path="/auth" element={!authUser ? <AuthPage /> : <Navigate to="/" />} />
                <Route path="*" element={<Navigate to={authUser ? "/" : "/auth"} />} />
            </Routes>
            <Toaster/>
        </>
    );
}

export default App;