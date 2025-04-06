import {Home, FileText, PlusSquare, Users,UserPlus} from "lucide-react";


export const sidebarLinks = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "Faktury", path: "/invoices", icon: FileText },
    { name: "Klienci", path: "/clients", icon: Users },
    { name: "Nowa faktura", path: "/invoices/add", icon: PlusSquare },
    { name: "Nowy klient", path: "/clients/add", icon: UserPlus },



]