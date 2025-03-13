import {Home, FileText, PlusSquare, Users, Box, Settings, LogOut} from "lucide-react";


export const sidebarLinks = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "Invoices", path: "/invoices", icon: FileText },
    { name: "New Invoice", path: "/invoices/new", icon: PlusSquare },
    { name: "Clients", path: "/clients", icon: Users },
    { name: "Products", path: "/products", icon: Box },
    { name: "Settings", path: "/settings", icon: Settings, isBottom:true },

]