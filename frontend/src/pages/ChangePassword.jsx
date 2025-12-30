import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const strong =
    next.length >= 8 &&
    /[A-Z]/.test(next) &&
    /[a-z]/.test(next) &&
    /\d/.test(next);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    if (!strong)
      return setError(
        "Password must be 8+ chars with upper, lower & number"
      );

    if (next !== confirm)
      return setError("Passwords do not match");

    try {
      await api.patch("/users/me/password", {
        current,
        new: next,
      });

      setMsg("Password updated successfully");
      setTimeout(() => navigate("/profile"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <form
        onSubmit={submit}
        style={{
          width: 400,
          padding: 24,
          borderRadius: 10,
          background: "#fff",
          boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          Change Password
        </h2>

        <input
          placeholder="Current Password"
          type="password"
          onChange={(e) => setCurrent(e.target.value)}
          style={input}
        />

        <input
          placeholder="New Password"
          type="password"
          onChange={(e) => setNext(e.target.value)}
          style={input}
        />

        <input
          placeholder="Confirm Password"
          type="password"
          onChange={(e) => setConfirm(e.target.value)}
          style={input}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}
        {msg && <p style={{ color: "green" }}>{msg}</p>}

        <button style={btn}>Update</button>
      </form>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const btn = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  background: "#000",
  color: "#fff",
  fontWeight: 600,
};
