import {Suspense, lazy, Fragment} from "react";
import LazyLoader from "../components/masterLayout/LazyLoader.jsx";
const Login=lazy(()=>import("../components/login/login.jsx")) ;

const LoginPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <Login/>
            </Suspense>
        </Fragment>
    );
};

export default LoginPage;