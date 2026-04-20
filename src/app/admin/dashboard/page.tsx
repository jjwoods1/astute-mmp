"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, Card, SectionHeader, StatTile } from "@/components/ui";
import { FadeIn } from "@/components/motion";
import { errorMessage } from "@/lib/errors";

interface AdminUser {
  id: number;
  email: string;
  role: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("user");
  const [creating, setCreating] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error(`Failed to load users: ${errorMessage(error)}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async () => {
    if (!newUserEmail.trim()) {
      toast.error("Please enter an email address");
      return;
    }
    setCreating(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newUserEmail, role: newUserRole }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create user");
      }
      toast.success(`User created: ${newUserEmail}`);
      setNewUserEmail("");
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error(`Failed to create user: ${errorMessage(error)}`);
    } finally {
      setCreating(false);
    }
  };

  const removeUser = async (userId: number, email: string) => {
    try {
      const res = await fetch(`/api/users/${userId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to remove user");
      toast.success(`Removed ${email}`);
      fetchUsers();
    } catch (error) {
      console.error("Error removing user:", error);
      toast.error(`Failed to remove user: ${errorMessage(error)}`);
    }
  };

  const inputCls =
    "bg-white border border-neutral-200 rounded-md px-3 py-2 text-body text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors";

  return (
    <main className="min-h-screen bg-neutral-50 font-ubuntu">
      <div className="max-w-6xl mx-auto px-10 py-14">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
          <FadeIn y={0} duration={0.4}>
            <SectionHeader eyebrow="Admin" title="Dashboard" />
          </FadeIn>
          <FadeIn y={0} duration={0.4} delay={0.1}>
            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="secondary" size="sm" onClick={() => router.push("/admin")}>← Admin</Button>
              <Button variant="ghost" size="sm" onClick={() => router.push("/admin/create-video-testimonial")}>Video Testimonial</Button>
              <Button variant="ghost" size="sm" onClick={() => router.push("/admin/create-written-testimonial")}>Written Testimonial</Button>
              <Button variant="ghost" size="sm" onClick={() => router.push("/admin/hall-of-fame")}>Hall of Fame</Button>
            </div>
          </FadeIn>
        </div>

        <Card className="mb-6">
          <StatTile value={users.length} label="Total admin users" size="xl" />
        </Card>

        <Card>
          <div className="text-label text-brand-500 uppercase mb-5">User Management</div>

          <div className="flex gap-3 mb-5 flex-wrap">
            <input
              type="email"
              placeholder="Email address"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              className={`${inputCls} flex-1 min-w-[240px]`}
            />
            <select value={newUserRole} onChange={(e) => setNewUserRole(e.target.value)} className={inputCls}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <Button variant="primary" size="md" onClick={createUser} disabled={creating}>
              {creating ? "Creating…" : "Create user"}
            </Button>
          </div>

          {loading ? (
            <div className="flex flex-col gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-12 rounded-md bg-neutral-100 animate-pulse" />
              ))}
            </div>
          ) : users.length === 0 ? (
            <div className="text-body text-neutral-500 py-8 text-center">No users yet.</div>
          ) : (
            <div>
              <div className="flex items-center text-label text-neutral-400 uppercase px-4 py-3 border-b border-neutral-200">
                <div className="flex-1">Email</div>
                <div className="w-24">Role</div>
                <div className="w-24 text-right">Actions</div>
              </div>
              {users.map((user) => (
                <div key={user.id} className="flex items-center px-4 py-3 border-b border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <div className="flex-1 text-body text-neutral-800 min-w-0 truncate">{user.email}</div>
                  <div className="w-24 text-body-sm text-neutral-600 capitalize">{user.role}</div>
                  <div className="w-24 flex justify-end">
                    <button
                      onClick={() => removeUser(user.id, user.email)}
                      className="text-body-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
