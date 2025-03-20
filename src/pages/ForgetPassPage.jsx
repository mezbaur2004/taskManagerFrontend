import {Fragment, lazy, Suspense} from "react";
import LazyLoader from "../components/masterLayout/LazyLoader.jsx";
const ForgetPass=lazy(()=>import("../components/forgetPass/forgetPass.jsx"));

const ForgetPassPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <ForgetPass/>
            </Suspense>
        </Fragment>
    );
};

export default ForgetPassPage;