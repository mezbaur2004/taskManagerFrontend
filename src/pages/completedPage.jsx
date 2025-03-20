import MasterLayout from "../components/masterLayout/MasterLayout.jsx";
import {Fragment, lazy, Suspense} from "react";
import LazyLoader from "../components/masterLayout/LazyLoader.jsx";
const Completed=lazy(()=>import("../components/completed/completed.jsx")) ;

const CompletedPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Completed/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CompletedPage;