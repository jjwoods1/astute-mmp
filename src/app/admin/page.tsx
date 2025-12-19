export default function AdminPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Admin Panel</h1>
      <p>Welcome to the Admin Panel. Choose a section:</p>
      <ul className="list-disc pl-5 mt-3">
        <li><a href="/admin/dashboard" className="text-blue-500">Dashboard</a></li>
        <li><a href="/admin/users" className="text-blue-500">Users</a></li>
        <li><a href="/admin/testimonials" className="text-blue-500">Testimonials</a></li>
      </ul>
    </main>
  );
}
