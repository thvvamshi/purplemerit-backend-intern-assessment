import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ 
      padding: "16px 24px", 
      borderBottom: "1px solid #e5e7eb",
      backgroundColor: "#fff",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
    }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        <h3 style={{ 
          margin: 0, 
          fontSize: "24px",
          fontWeight: "700",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          PurpleMerit
        </h3>
        
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          {!user ? (
            <>
              <Link to="/login" style={{ 
                textDecoration: "none", 
                color: "#6366f1",
                fontWeight: "500",
                transition: "color 0.2s"
              }}>
                Login
              </Link>
              <Link 
                to="/signup" 
                style={{ 
                  textDecoration: "none", 
                  color: "#fff", 
                  background: "#6366f1", 
                  padding: "10px 20px", 
                  borderRadius: "6px",
                  fontWeight: "500",
                  transition: "background 0.2s",
                  cursor: "pointer"
                }}
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <span style={{ 
                fontSize: "14px", 
                color: "#666",
                fontWeight: "500"
              }}>
                {user.fullName}
              </span>
              <Link to="/profile" style={{ 
                textDecoration: "none", 
                color: "#6366f1",
                fontWeight: "500",
                transition: "color 0.2s"
              }}>
                Profile
              </Link>
              {user.role === "admin" && (
                <Link to="/admin" style={{ 
                  textDecoration: "none", 
                  color: "#6366f1",
                  fontWeight: "500",
                  transition: "color 0.2s"
                }}>
                  Admin
                </Link>
              )}
              <button 
                onClick={logout}
                style={{
                  border: "none",
                  background: "none",
                  color: "#6366f1",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "color 0.2s"
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
