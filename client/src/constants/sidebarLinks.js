import {Home, FileText, PlusSquare, Users,  Settings} from "lucide-react";


export const sidebarLinks = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "Invoices", path: "/invoices", icon: FileText },
    { name: "New Invoice", path: "/invoices/new", icon: PlusSquare },
    { name: "Clients", path: "/clients", icon: Users },
    { name: "Settings", path: "/settings", icon: Settings, isBottom:true },

]