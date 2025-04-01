
import {useAuthStore} from "../store/useAuthStore.js";
import {ArrowLeft, LogOut} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {sidebarLinks} from "../constants/sidebarLinks.js";
import {useSidebarStore} from "../store/useSidebarStore.js";

const Sidebar = () => {
    const navigate = useNavigate()
    const { open, toggleSidebar } = useSidebarStore();
    const handleNav = (path) => {
        navigate(path)
    }
    const isActive = (path) => {
        return location.pathname === path ? "bg-blue-700" : ""
    }

    const {logout} = useAuthStore()
    return (
        <aside className={` ${open ? 'w-72' : 'w-20'} fixed top-0 left-0 h-screen bg-blue-500 text-white p-5 pt-8 duration-300`}>

            <ArrowLeft className={`${!open && 'rotate-180'} transition-transform duration-500 absolute -right-3 
            top-8 size-8 rounded-full bg-blue-900  border-2 border-black cursor-pointer
            `}
                       onClick={toggleSidebar}
            />

            <div className="flex items-center gap-x-4 cursor-pointer" onClick={() => handleNav('/')}>
                <img src='logo.png' width="30" height="30" className="ml-1" alt="logo"/>
                <h1 className={`origin-left font-bold text-3xl duration-300 ${!open && 'scale-0'}`}>Billify</h1>
            </div>

            <ul className="flex flex-col h-[95%] mt-5 gap-y-3">
                {sidebarLinks.map((link) => (
                    <li
                        key={link.name}
                        className={`flex rounded-md p-2 cursor-pointer hover:bg-blue-700 text-sm items-center gap-x-4 ${isActive(link.path)} ${
                            link.isBottom ? "mt-auto" : "mt-2"
                        }`}
                        onClick={() => handleNav(link.path)}
                    >
                        <link.icon className="size-6" />
                        <span className={`${!open && 'hidden'}`}>{link.name}</span>
                    </li>

                ))}
                <li className="flex rounded-md p-2 cursor-pointer hover:bg-blue-700 hover:text-red-500 text-sm items-center gap-x-4" onClick={logout} >
                    <LogOut className="size-6"/>
                    <span className={`${!open && 'hidden'}`}>Wyloguj</span>
                </li>

            </ul>


        </aside>

    );
};

export default Sidebar;
