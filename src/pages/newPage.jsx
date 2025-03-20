import MasterLayout from "../components/masterLayout/MasterLayout.jsx";
import LazyLoader from "../components/masterLayout/LazyLoader.jsx";
import {Suspense, lazy, Fragment} from "react";
const New=lazy(()=>import("../components/new/New.jsx"))

const NewPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <New/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default NewPage;