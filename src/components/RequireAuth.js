import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    // console.log(allowedRoles?.includes(auth?.roles))
    // console.log(auth?.Email)
    return (
        allowedRoles?.includes(auth?.roles)
            ? <Outlet />
            : auth?.Email
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;