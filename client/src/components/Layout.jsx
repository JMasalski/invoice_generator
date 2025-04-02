import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";



const Layout = () => {


    return (
        <div className="min-h-screen bg-gray-800">
            <Navbar />
                <div className="mt-4">
                    <Outlet />
                </div>
        </div>
    );
};

export default Layout;
