import MasterLayout from "../components/masterLayout/MasterLayout.jsx";
import {Fragment, lazy, Suspense} from "react";
import LazyLoader from "../components/masterLayout/LazyLoader.jsx";
const Create=lazy(()=>import("../components/create/create.jsx")) ;

const CreatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Create/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CreatePage;