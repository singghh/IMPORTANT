// import { Link, useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   // If not logged in, don't render navbar
//   if (!token) return null;

//   // Safely decode token
//   let isAdmin = false;
//   try {
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     isAdmin = payload.role === "ADMIN";
//   } catch (err) {
//     console.error("Invalid token");
//   }

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <nav style={{ display: "flex", gap: "20px", padding: "10px" }}>
//       <Link to="/">Dashboard</Link>

//       {/* Show Admin link ONLY if admin */}
//       {isAdmin && <Link to="/admin">Admin</Link>}

//       <button onClick={logout}>Logout</button>
//     </nav>
//   );
// }
import { Link, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) return null;

  let isAdmin = false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    isAdmin = payload.role === "ADMIN";
  } catch {}

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div>
        <Link to="/">🍬 Sweet Shop</Link>
        <Link to="/">Dashboard</Link>
        {isAdmin && <Link to="/admin">Admin</Link>}
      </div>

      <button onClick={logout}>Logout</button>
    </nav>
  );
}
