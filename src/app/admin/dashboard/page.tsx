"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("user");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*');

    if (error) {
      console.error("Error fetching users:", error);
      return;
    }

    setUsers(data || []);
  };

  const createUser = async () => {
    if (!newUserEmail.trim()) {
      alert("Please enter an email address");
      return;
    }

    try {
      const { error } = await supabase
        .from('users')
        .insert({
          email: newUserEmail,
          role: newUserRole,
        });

      if (error) throw error;

      alert(`User created! Email: ${newUserEmail}`);
      setNewUserEmail("");
      fetchUsers();
    } catch (error: any) {
      console.error("Error creating user:", error);
      alert("Failed to create user: " + error.message);
    }
  };

  const removeUser = async (userId: number) => {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);

    if (error) {
      console.error("Error removing user:", error);
      return;
    }

    fetchUsers();
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Admin Dashboard</h1>

      {/* Total Users Count */}
      <div className="bg-white p-4 shadow-lg rounded-lg mb-6">
        <h2 className="text-xl font-semibold">Total Users: {users.length}</h2>
      </div>

      {/* User Management */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">User Management</h2>

        {/* Create User */}
        <div className="flex gap-4 mb-4">
          <input
            type="email"
            placeholder="User Email"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <select value={newUserRole} onChange={(e) => setNewUserRole(e.target.value)} className="border p-2 rounded">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={createUser} className="bg-green-500 text-white p-2 rounded">
            Create User
          </button>
        </div>

        {/* Users List */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border">
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2 flex gap-2">
                  <button
                    onClick={() => removeUser(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Navigation to Other Admin Pages */}
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/admin/create-video-testimonial")}
          className="bg-blue-500 text-white p-3 rounded-lg"
        >
          Create Video Testimonial
        </button>
        <button
          onClick={() => router.push("/admin/create-written-testimonial")}
          className="bg-blue-500 text-white p-3 rounded-lg"
        >
          Create Written Testimonial
        </button>
        <button
          onClick={() => router.push("/admin/hall-of-fame")}
          className="bg-purple-500 text-white p-3 rounded-lg"
        >
          Hall of Fame
        </button>
      </div>
    </main>
  );
}
