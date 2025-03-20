import MasterLayout from "../components/masterLayout/MasterLayout.jsx";
import {Fragment, lazy, Suspense} from "react";
import LazyLoader from "../components/masterLayout/LazyLoader.jsx";
const Cancelled=lazy(()=>import("../components/cancelled/cancelled.jsx")) ;

const CancelledPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Cancelled/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CancelledPage;