import EditProfileForm from "../components/Forms/EditProfileForm.jsx";
import {Settings} from "lucide-react";
const SettingsPage = () => {


    return (
        <div className="p-3 md:p-6 lg:p-9 text-white">
            <h1 className="text-lg md:text-2xl font-medium flex items-center badge badge-info p-2 md:p-4">
                <Settings />
                Zaktualizuj swój profil
            </h1>
            <EditProfileForm/>
        </div>
    );
};

export default SettingsPage;
