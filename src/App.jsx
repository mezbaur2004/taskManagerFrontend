import React, {Fragment} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import DashboardPage from "./pages/dashboardPage.jsx";
import CreatePage from "./pages/createPage.jsx";
import NewPage from "./pages/newPage.jsx";
import ProgressPage from "./pages/progressPage.jsx";
import CompletedPage from "./pages/completedPage.jsx";
import CancelledPage from "./pages/cancelledPage.jsx";
import ProfilePage from "./pages/profilePage.jsx";
import LoginPage from "./pages/loginPage.jsx";
import RegistrationPage from "./pages/registrationPage.jsx";
import Page404 from "./pages/page-404.jsx";
import FullScreenLoader from "./components/masterLayout/FullScreenLoader.jsx";
import {getToken} from "./helper/sessionHelper.js";

//console.log(localStorage.getItem("token"),"lol");

const App = () => {
    if(getToken()){
        return (
            <Fragment>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<DashboardPage/>} />
                        <Route path="/Create" element={<CreatePage/>} />
                        <Route path="/All" element={<NewPage/>} />
                        <Route path="/Progress" element={<ProgressPage/>} />
                        <Route path="/Completed" element={<CompletedPage/>} />
                        <Route path="/Cancelled" element={<CancelledPage/>} />
                        <Route path="/Profile" element={<ProfilePage/>} />
                        <Route path="*" element={<Page404/>} />
                    </Routes>
                </BrowserRouter>
                <Toaster position="bottom-center" reverseOrder={false} />
                <FullScreenLoader/>
            </Fragment>
        )
    }else{
        return (
            <Fragment>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/Login" replace/>} />
                        <Route path="/Login" element={<LoginPage/>} />
                        <Route path="/Registration" element={<RegistrationPage/>} />

                        {/*<Route path="/SendOTP" element={<RegistrationPage/>} />*/}
                        {/*<Route path="/VerifyOTP" element={<RegistrationPage/>} />*/}
                        {/*<Route path="/CreatePassword" element={<RegistrationPage/>} />*/}
                        <Route path="*" element={<Page404/>} />
                    </Routes>
                </BrowserRouter>
                <Toaster position="bottom-center" reverseOrder={false} />
                <FullScreenLoader/>
            </Fragment>
        );
    }

};

export default App;