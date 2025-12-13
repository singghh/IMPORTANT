// import { useState } from "react";
// import API from "../api/axios";
// import { useNavigate, Link } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await API.post("/auth/login", { email, password });
//       const token = res.data.token;

//       localStorage.setItem("token", token);

//       // Decode role
//       const payload = JSON.parse(atob(token.split(".")[1]));

//       payload.role === "ADMIN" ? navigate("/admin") : navigate("/");
//     } catch (err) {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <form onSubmit={submit}>
//       <h2>Login</h2>

//       <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button>Login</button>

//       <p>
//         New user? <Link to="/register">Register</Link>
//       </p>
//     </form>
//   );
// }
import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      const token = res.data.token;

      localStorage.setItem("token", token);

      const payload = JSON.parse(atob(token.split(".")[1]));
      payload.role === "ADMIN" ? navigate("/admin") : navigate("/");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={submit}>
        <h2>Welcome Back 👋</h2>

        <input
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Login</button>

        <p>
          New user? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </div>
  );
}
