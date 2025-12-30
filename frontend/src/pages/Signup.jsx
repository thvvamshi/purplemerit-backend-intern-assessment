import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const [form, setForm] = useState({ role: "user" });
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (form.password.length < 8)
      return toast.error("Password must be at least 8 characters");

    if (form.password !== confirm)
      return toast.error("Passwords do not match");

    setLoading(true);
    try {
      await api.post("/auth/signup", form);
      toast.success("Account created successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ borderRadius: "8px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)", width: "100%", maxWidth: "400px", padding: "2rem" }}>
        <h2 style={{ fontSize: "1.875rem", fontWeight: "bold", marginBottom: "1.5rem", textAlign: "center" }}>
          Create Account
        </h2>

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input placeholder="Full Name" onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
          <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirm(e.target.value)} />

          <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button disabled={loading}>
            {loading ? "Creating..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
}
