import {useAuthStore} from "../store/useAuthStore.js";
import {LogOut, ChevronDown, Settings, FileText, PlusSquare, Menu,X} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import {sidebarLinks} from "../constants/sidebarLinks.js";

import {useState} from "react";

const Navbar = () => {
    const navigate = useNavigate()
    const {authUser} = useAuthStore();
    const [open, setOpen] = useState(false)
    const toggleSidebar = () => {
        setOpen((prev) => !prev);
    };
    const handleNav = (path) => {
        navigate(path)
    }
    const isActive = (path) => {
        return location.pathname === path ? "border-b border-indigo-400" : ""
    }

    const {logout} = useAuthStore()
    return (
        <nav className="w-full max-w-screen h-24 flex items-center justify-between p-3  md:p-6 lg:p-9 text-white ">
            <div className="flex  items-center cursor-pointer" onClick={() => handleNav('/')}>
                <img src="logo.png" alt="logo" className="size-12 md:hidden"/>
                <h1 className="hidden py-2 md:block line text-4xl font-semibold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                    Billify
                </h1>
            </div>
            {/*For pc view*/}
            <ul className="hidden md:flex gap-x-6 ">
                {sidebarLinks.map((link) => (
                    <li
                        key={link.name}
                        className={`flex rounded-md p-2 cursor-pointer hover:bg-indigo-400 hover:text-black hover:scale-110 transition duration-200 text-md gap-x-4 ${isActive(link.path)}
                        }`}
                        onClick={() => handleNav(link.path)}
                    >
                        <link.icon className="size-6"/>
                        <span>{link.name}</span>
                    </li>
                ))}
            </ul>
            <div className="flex items-center justify-between">
                <div className="dropdown dropdown-end hidden md:block text-black">
                    <div
                        tabIndex={0}
                        role="button"
                        className="flex items-center gap-2 p-2 rounded-lg cursor-pointer"
                    >
                        <div className="avatar avatar-placeholder">
                            <div className="bg-sky-500 text-neutral-content w-10 rounded-full">
                                <span className="text-lg">{authUser.name.charAt(0)}</span>
                            </div>
                        </div>
                        <ChevronDown className="size-6 text-sky-500"/>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content bg-base-100 rounded-box z-[1000] w-52 p-2 shadow-lg"
                    >
                        <div className="px-4 py-2 text-base-content font-medium">
                            Witaj {authUser.name}
                        </div>
                        <li>
                            <Link to={'/settings'}>
                                <Settings/>
                                Ustawienia
                            </Link>
                        </li>
                        <li>
                            <a onClick={logout}>
                                <LogOut/>
                                Wyloguj
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="md:hidden">
                    {/* Mobile menu toggle button */}
                    <button
                        onClick={toggleSidebar}

                    >
                        {open ? <X /> : <Menu/>}
                    </button>


                    <div
                        className={`fixed inset-0 z-50 transform transition-transform duration-300  ease-in-out ${open ? 'translate-y-0' : '-translate-y-full'}`}>
                        <div
                            className={`absolute inset-0 bg-gray-50/20 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
                            onClick={toggleSidebar}
                        ></div>

                        {/* Menu container - positioned at top */}
                        <div className="absolute top-0 left-0 w-full bg-gray-100  shadow-lg text-black">
                            <div className="flex items-center justify-between p-4 border-b">
                                <h2 className=" py-2 line text-4xl font-semibold bg-gradient-to-r from-blue-600 to-sky-500  bg-clip-text text-transparent">
                                    Billify
                                </h2>
                                <button
                                    className="btn btn-sm btn-circle"
                                    onClick={toggleSidebar}
                                ><X />
                                </button>
                            </div>

                            {/* Menu items */}
                            <ul className="menu p-2 text-lg rounded-box w-full">
                                <li>
                                    <details>
                                        <summary>Faktury</summary>
                                        <ul>
                                            <li><Link to={'/invoices/new'}><PlusSquare/>Dodaj fakture</Link></li>
                                            <li><Link to={'/invoices'}><FileText/>Moje faktury</Link></li>
                                        </ul>
                                    </details>
                                </li>
                                <li>
                                    <details>
                                        <summary>Klienci</summary>
                                        <ul>
                                            //TODO POPRAWIC PATH
                                            <li><Link to={'/clients/add'}>Dodaj klienta</Link></li>
                                            <li><Link to={'/clients'}>Moi klienci</Link></li>
                                        </ul>
                                    </details>
                                </li>

                                {/* Bottom items */}
                                <li className="mt-auto border-t pt-2">
                                    <Link to={'/settings'}>
                                        <Settings/>
                                        Ustawienia
                                    </Link>
                                </li>
                                <li>
                                    <a onClick={logout}>
                                        <LogOut/>
                                        Wyloguj
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </nav>

    );
};

export default Navbar;
