import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [original, setOriginal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/users/me")
      .then((res) => {
        setUser(res.data.data);
        setOriginal(res.data.data);
      })
      .catch(() => toast.error("Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (!user) return null;

  const updateProfile = async () => {
    try {
      await api.patch("/users/me", {
        fullName: user.fullName,
        email: user.email,
      });
      toast.success("Profile updated successfully");
      setOriginal(user);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  /* ⬇️ STYLES UNCHANGED ⬇️ */
  const container = {
    maxWidth: 500,
    margin: "40px auto",
    padding: 24,
    borderRadius: 10,
    background: "#fff",
    boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
    fontFamily: "system-ui",
  };

  const row = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  };

  const input = {
    width: "65%",
    padding: "6px 8px",
    borderRadius: 5,
    border: "1px solid #ccc",
  };

  return (
    <div style={container}>
      <h2 style={{ marginBottom: 20 }}>My Profile</h2>

      <p style={{ marginBottom: 20 }}>
        Role: <strong>{user.role}</strong>
      </p>

      <div style={row}>
        <label>Full Name</label>
        <input
          value={user.fullName}
          onChange={(e) => setUser({ ...user, fullName: e.target.value })}
          style={input}
        />
      </div>

      <div style={row}>
        <label>Email</label>
        <input
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          style={input}
        />
      </div>

      <button onClick={updateProfile}>Save Changes</button>
      <button onClick={() => setUser(original)} style={{ marginLeft: 8 }}>
        Cancel
      </button>

      <div style={{ marginTop: 24 }}>
        <Link to="/change-password">Change Password →</Link>
      </div>
    </div>
  );
}
