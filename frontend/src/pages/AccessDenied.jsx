import { Link } from "react-router-dom";

export default function AccessDenied() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-xl font-bold text-red-600">Access Denied</h1>
        <Link to="/profile" className="text-blue-600">Go to Profile</Link>
      </div>
    </div>
  );
}
