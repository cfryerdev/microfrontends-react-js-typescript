import { Navigate, Outlet } from 'react-router'

interface Props {
    isAllowed: boolean,
    redirectPath: string,
    children: JSX.Element
}

const ProtectedRoute = ({
    isAllowed,
    redirectPath = '/landing',
    children,
}: Props) => {
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute