import React, {useState} from 'react'
import {LoaderCircle} from "lucide-react";
import {useAuthStore} from "../../store/useAuthStore.js";

const SignUpForm = () => {
    const [signUpData, setSignUpData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const {signUp,loading} = useAuthStore()
    return (
        <form className="space-y-5"
              onSubmit={(e) => {
                  e.preventDefault()
                  console.log(signUpData)
                  signUp(signUpData)
              }}>
            <label htmlFor='name' className="block text-md fond-medium text-gray-800">
                Imię i nazwisko
            </label>
            <input
                id='name'
                type='text'
                value={signUpData.name}
                onChange={(e) => setSignUpData({...signUpData, name: e.target.value})}
                className="w-full px-3 py-2 text-blue-700 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-700 focus:outline-hidden"
            />
            <label htmlFor='email' className="block text-md fond-medium text-gray-800">
                Email
            </label>
            <input
                id='email'
                type='email'
                value={signUpData.email}
                onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
                className="w-full px-3 py-2 text-blue-700 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-700 focus:outline-hidden"
            >
            </input>
            <label htmlFor='email' className="block text-md fond-medium text-gray-800">
                Hasło
            </label>
            <input
                id='password'
                type='password'
                value={signUpData.password}
                onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
                className="w-full px-3 py-2 text-blue-700 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-700 focus:outline-hidden"
            >
            </input>
            <button
                type="submit"
                disabled={loading}
                className="w-full px-3 py-2 text-white bg-blue-700 rounded-md hover:bg-blue-800 transition-colors duration-300 focus:outline-hidden flex items-center justify-center"
            >
                {loading ? <LoaderCircle className="animate-spin"/> : "Zarejestruj się"}
            </button>
        </form>
    )
}
export default SignUpForm
