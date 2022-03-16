
import React, { Suspense } from "react";
import PageLoader from "../../components/page-loader";

// @ts-ignore
const ProfileRemote = React.lazy(() => import("remote_profile/Application"));

const ProfilePage = () => (
    <Suspense fallback={<PageLoader />}>
        <ProfileRemote />
    </Suspense>
);

export default ProfilePage;
