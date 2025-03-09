import {Routes,Route} from "react-router-dom";
import AuthPage from "./pages/AuthPage.jsx";
import HomePage from "./pages/HomePage.jsx";

function App() {
    return (
        //Tutaj będą routy
        <>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path='/auth' element={<AuthPage/>}/>
            </Routes>
        </>

    )
}

export default App
