import {Routes, Route, Navigate} from "react-router-dom";
import AuthPage from "./pages/AuthPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import {useAuthStore} from "./store/useAuthStore.js";
import {useEffect} from "react";

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
                <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/auth"/>}/>
                <Route path="/auth" element={!authUser ? <AuthPage/> : <Navigate to="/"/>}/>
            </Routes>
        </>
    );
}

export default App;