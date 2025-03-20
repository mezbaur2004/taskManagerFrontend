import {Fragment, Suspense, lazy} from "react";
import MasterLayout from "../components/masterLayout/MasterLayout.jsx";
import LazyLoader from "../components/masterLayout/LazyLoader.jsx";
const Dashboard=lazy(()=>import("../components/dashboard/dashboard.jsx")) ;

const DashboardPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Dashboard/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default DashboardPage;