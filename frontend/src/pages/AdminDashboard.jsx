import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const load = async (p = page) => {
    try {
      setLoading(true);
      const res = await api.get(`/users?page=${p}`);
      setUsers(res.data.data.users);
      setTotalPages(res.data.data.pagination.totalPages);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(page);
  }, [page]);

  const toggle = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.patch(`/users/${id}/status`);
      toast.success("User status updated");
      load(page);
    } catch {
      toast.error("Failed to update status");
    }
  };

  if (loading) return <Spinner />;

  return (
    <div style={{ padding: 24 }}>
      <h2>Admin Dashboard</h2>

      <table width="100%" border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.email}</td>
              <td>{u.fullName}</td>
              <td>{u.role}</td>
              <td>{u.status}</td>
              <td>
                <button onClick={() => toggle(u._id)}>
                  {u.status === "active" ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 12 }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span style={{ margin: "0 8px" }}>
          Page {page} of {totalPages}
        </span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
