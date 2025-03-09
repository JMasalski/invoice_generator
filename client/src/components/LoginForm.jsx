import React, {useState} from 'react'
import {LoaderCircle} from 'lucide-react'

const LoginForm = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })
    const loading = true
    return (
        <form className="space-y-5"
              onSubmit={(e) => {
                  e.preventDefault()
                  console.log(loginData)
              }}>
            <label htmlFor='email' className="block text-md fond-medium text-gray-800">
                Email address
            </label>
            <input
                id='email'
                type='email'
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                className="w-full px-3 py-2 text-blue-700 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-700 focus:outline-none"
            >
            </input>
            <label htmlFor='email' className="block text-md fond-medium text-gray-800">
                Password
            </label>
            <input
                id='password'
                type='password'
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                className="w-full px-3 py-2 text-blue-700 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-700 focus:outline-none"
            >
            </input>
            <button
                type="submit"
                disabled={loading}
                className="w-full px-3 py-2 text-white bg-blue-700 rounded-md hover:bg-blue-800 transition-colors duration-300 focus:outline-none flex items-center justify-center"
            >
                {loading ? <LoaderCircle className="animate-spin"/> : "Log in"}
            </button>
        </form>
    )
}
export default LoginForm
