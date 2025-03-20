import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuthStore } from "../store/useAuthStore";
import { useSidebarStore } from "../store/useSidebarStore";

const Layout = () => {
    const { authUser } = useAuthStore();
    const { open } = useSidebarStore();

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className={`flex-1 p-4 transition-all duration-300 ${open ? 'ml-72' : 'ml-20'}`}>
                <header className="flex flex-col items-end w-full border-b-2 border-gray-200 space-y-2">
                    <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-end">
                        Welcome to <span className="font-bold text-blue-500">Billify</span>
                    </h1>
                    <h3 className="text-md md:text-lg lg:text-xl font-bold">
                        {authUser.name.split(" ")[0]}
                    </h3>
                </header>
                <div className="mt-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
