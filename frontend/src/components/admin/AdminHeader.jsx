export default function AdminHeader({ title, subtitle }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-content-secondary">{subtitle}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-semibold">Admin User</span>
        <img
          src="https://randomuser.me/api/portraits/men/4.jpg"
          alt="Admin"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
}
