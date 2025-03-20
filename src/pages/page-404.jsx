import {Fragment, lazy, Suspense} from "react";
import LazyLoader from "../components/masterLayout/LazyLoader.jsx";
const NotFound=lazy(()=>import("../components/notFound/notFound.jsx"));

const Page404 = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader/>}>
                <NotFound/>
            </Suspense>
        </Fragment>
    );
};

export default Page404;