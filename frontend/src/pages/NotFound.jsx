import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div style={{
        textAlign: "center",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)"
      }}>
        <h1 style={{
          fontSize: "72px",
          fontWeight: "bold",
          margin: "0 0 16px",
          color: "#1f2937"
        }}>404</h1>
        <p style={{
          fontSize: "18px",
          marginBottom: "24px"
        }}>Page not found</p>
        <Link to="/login" style={{
          display: "inline-block",
          padding: "12px 24px",
          backgroundColor: "#667eea",
          color: "white",
          textDecoration: "none",
          borderRadius: "8px",
          fontWeight: "600",
          transition: "background-color 0.3s ease"
        }} onMouseEnter={e => e.target.style.backgroundColor = "#764ba2"}
           onMouseLeave={e => e.target.style.backgroundColor = "#667eea"}>
          Go to Login
        </Link>
      </div>
    </div>
  );
}
