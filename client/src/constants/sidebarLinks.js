import {Home, FileText, PlusSquare, Users, Settings} from "lucide-react";


export const sidebarLinks = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "Faktury", path: "/invoices", icon: FileText },
    { name: "Nowa faktura", path: "/invoices/new", icon: PlusSquare },
    { name: "Klienci", path: "/clients", icon: Users },

    { name: "Ustawienia", path: "/settings", icon: Settings, isBottom:true },

]