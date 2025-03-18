import EditProfileForm from "../components/Forms/EditProfileForm.jsx";

const SettingsPage = () => {


    return (
        <div className="pt-1 md:pt-2 lg:pt-4">
            <h1 className="text-lg md:text-2xl font-medium">
                Change your information here
            </h1>
            <EditProfileForm/>
        </div>
    );
};

export default SettingsPage;
