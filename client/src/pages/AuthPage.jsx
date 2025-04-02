import React, {useState} from 'react'
import LoginForm from "../components/Forms/LoginForm.jsx";
import SignUpForm from "../components/Forms/SignUpForm.jsx";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true)
    return (
        <div
            className="min-h-screen font-mono flex items-center justify-around bg-linear-to-b from-cyan-200/50 to-blue-200 p-5">
            <div className="w-full max-w-md text-center bg-white rounded-lg p-5">
                <h2 className="text-xl text-black">
                    {isLogin ? "Log in to Billify" : "Sign up to Billify "}
                </h2>
                <div className="mt-5">
                    {isLogin ? <LoginForm/> : <SignUpForm/>}

                    <div className='mt-8 text-center'>
                        <p className='text-md text-gray-600'>
                            {isLogin ? "New to Billify?" : "Already have an account?"}
                        </p>

                        <button
                            onClick={() => setIsLogin((prevIsLogin) => !prevIsLogin)}
                            className='mt-2 text-blue-700 hover:text-blue-800 font-medium transition-colors duration-300'
                        >
                            {isLogin ? "Create a new account" : "Sign in to your account"}
                        </button>
                    </div>

                </div>
            </div>
            <img src="authphoto.png" loading="lazy" alt="authphoto" className="hidden lg:block"/>
        </div>
    )
}
export default AuthPage
