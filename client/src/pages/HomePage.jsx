import React from 'react'
import {useAuthStore} from "../store/useAuthStore.js";

const HomePage = () => {
    const {authUser} = useAuthStore()
    return (
        <div className="p-1 md:p-3 lg:p-6">
            {!authUser.address &&
                <h1 className="text-md md:text-xl lg:text-2xl  text-center rounded-md bg-red-200">
                    Your profile is incomplete! Please update your address and contact information in the settings to
                    fully enjoy all features of your account.
                </h1>}
        </div>
    )
}
export default HomePage
