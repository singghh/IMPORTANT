import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  // 1️⃣ Get token
  const token = localStorage.getItem("token");

  // 2️⃣ If token not present → go to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    // 3️⃣ Decode JWT payload
    const payload = JSON.parse(atob(token.split(".")[1]));

    // 4️⃣ Check admin role
    if (payload.role !== "ADMIN") {
      return <Navigate to="/" replace />;
    }

    // 5️⃣ Admin allowed
    return children;
  } catch (err) {
    // 6️⃣ Invalid token (tampered / expired)
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
}
