import React from 'react'
import {useAuthStore} from "../store/useAuthStore.js";

const HomePage = () => {
    const{logout, authUser} = useAuthStore()
    return (
        <div>
            <button onClick={logout}>
                logout
            </button>
        </div>
    )
}
export default HomePage
