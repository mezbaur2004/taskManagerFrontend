import MasterLayout from "../components/masterLayout/MasterLayout.jsx";
import LazyLoader from "../components/masterLayout/LazyLoader.jsx";
import {Fragment, lazy, Suspense} from "react";
const Profile=lazy(() => import("../components/profile/profile.jsx"));

const ProfilePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Profile/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ProfilePage;