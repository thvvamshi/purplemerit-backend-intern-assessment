import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data);
      toast.success("Login successful");
      navigate(res.data.user.role === "admin" ? "/admin" : "/profile");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  /* ⬇️ STYLES UNCHANGED ⬇️ */
  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  };

  const formStyle = {
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    padding: "2.5rem",
    width: "100%",
    maxWidth: "420px"
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "2rem",
    textAlign: "center"
  };

  const inputStyle = {
    width: "100%",
    padding: "0.875rem 1rem",
    marginBottom: "1.25rem",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.3s ease",
    boxSizing: "border-box"
  };

  const inputFocusStyle = {
    borderColor: "#000000",
    boxShadow: "0 0 0 3px rgba(0, 0, 0, 0.1)"
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.875rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "0.5rem"
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={submit} style={formStyle}>
        <h2 style={titleStyle}>Welcome Back</h2>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
          onBlur={(e) =>
            Object.assign(e.target.style, {
              borderColor: "#e5e7eb",
              boxShadow: "none"
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
          onBlur={(e) =>
            Object.assign(e.target.style, {
              borderColor: "#e5e7eb",
              boxShadow: "none"
            })
          }
        />

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
