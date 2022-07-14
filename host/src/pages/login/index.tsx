import React from "react";
import Layout from "../../layout";

// @ts-ignore
const LoginRemote = React.lazy(() => import("remote_login/Application"));

const LoginPage = () => (<Layout><LoginRemote /></Layout>);

export default LoginPage;