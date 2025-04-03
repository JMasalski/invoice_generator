import {Outlet} from "react-router-dom";
import Navbar from "./Navbar.jsx";


const Layout = () => {


    return (
        <div className="min-h-screen bg-slate-900">
            <Navbar/>
                <div className="divider divider-accent"/>
                <Outlet/>
        </div>
    );
};

export default Layout;
