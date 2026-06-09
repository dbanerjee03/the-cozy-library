import { Navigate } from "react-router-dom";

import toast from "react-hot-toast";

function ProtectedRoute({ children }) {

  const token =
    localStorage.getItem("token");

  if (!token) {

    toast.error(
      "Please login first"
    );

    return <Navigate to="/auth" />;

  }

  return children;

}

export default ProtectedRoute;