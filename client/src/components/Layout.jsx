import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";



const Layout = () => {


    return (
        <div className="min-h-screen bg-gray-800">
            <Sidebar />
                <div className="mt-4">
                    <Outlet />
                </div>
        </div>
    );
};

export default Layout;
