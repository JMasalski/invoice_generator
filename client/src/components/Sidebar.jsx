import React from "react";
import {useAuthStore} from "../store/useAuthStore.js";
import {LogOut, Settings} from "lucide-react";
import {useNavigate} from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate()
    const handleNav = (path) => {
        navigate(path)
    }
    const {logout, authUser} = useAuthStore()
    return (
        <aside className="w-fit h-screen bg-blue-700 text-white p-4">
            <nav className="flex flex-col h-full justify-between">
                <div>
                    <h2 className="text-xl font-bold mb-4" onClick={() => handleNav("/")}>Billify</h2>
                    <ul>
                        <li className="py-2">Dashboard</li>
                        <li className="py-2">Invoices</li>
                        <li className="py-2">Settings</li>
                    </ul>
                </div>
                <div className="flex flex-col mt-auto space-y-5 bg-blue-800 p-2 md:p-3 lg:p-5 rounded-xl">
                    <button
                        onClick={() => handleNav("/settings")}
                        className="flex items-center text-white hover:text-gray-500 rounded-full  gap-x-5"
                    >
                        <Settings size={35}/>
                        <span
                            className="hidden items-center justify-center hover:text-gray-300 lg:flex text-white">
                            Settings
                        </span>
                    </button>

                    <button onClick={logout} className="flex items-center rounded-full text-white gap-x-5 hover:text-red-500">
                        <LogOut size={35}/>
                        <span
                            className="hidden items-center justify-center  xl:flex ">
                            Logout
                        </span>
                    </button>
                </div>
            </nav>
        </aside>

    );
};

export default Sidebar;
