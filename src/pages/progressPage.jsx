import MasterLayout from "../components/masterLayout/MasterLayout.jsx";
import {Fragment, lazy, Suspense} from "react";
import LazyLoader from "../components/masterLayout/LazyLoader.jsx";
const Progress=lazy(()=>import("../components/progress/progress.jsx"));

const ProgressPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Progress/>
                </Suspense>

            </MasterLayout>
        </Fragment>
    );
};

export default ProgressPage;