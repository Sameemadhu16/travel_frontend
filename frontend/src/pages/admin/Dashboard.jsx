import Main from '../../components/Main';
import Title from '../../components/Title';
import { FaUsers, FaClipboardList, FaCalendarCheck, FaRupeeSign, FaCheckCircle, FaFlag, FaClipboardCheck } from 'react-icons/fa';

export default function AdminDashboard() {
    return (
        <Main>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-1/5 bg-white rounded-xl shadow p-4 flex flex-col gap-4">
                    <div className="font-bold text-xl text-brand-primary mb-4">Travel.lk</div>
                    <nav className="flex flex-col gap-2">
                        <button className="bg-brand-primary text-white px-4 py-2 rounded font-semibold">Dashboard</button>
                        <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Users</button>
                        <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Listings</button>
                        <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Bookings</button>
                        <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Reviews</button>
                        <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Reports</button>
                        <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Notifications</button>
                        <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Payments</button>
                        <button className="text-content-primary px-4 py-2 rounded hover:bg-brand-accent text-left">Settings</button>
                    </nav>
                </aside>
                {/* Main Content */}
                <section className="flex-1">
                    <Title title="Welcome back, Admin!" size="text-[32px]" font="font-[600]" />
                    <p className="mb-6 text-content-secondary">Here's what's happening with Travel.lk today.</p>
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <StatCard icon={<FaUsers />} label="Total Users" value="12,847" change="+12% from last month" color="bg-brand-primary" />
                        <StatCard icon={<FaClipboardList />} label="Total Listings" value="2,341" change="+8% from last month" color="bg-success" />
                        <StatCard icon={<FaCalendarCheck />} label="Total Bookings" value="8,923" change="+15% from last month" color="bg-info" />
                        <StatCard icon={<FaRupeeSign />} label="Total Revenue" value="LKR 45.2M" change="+22% from last month" color="bg-warning" />
                    </div>
                    {/* Activity & Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Recent Activity */}
                        <div className="bg-white rounded-xl shadow p-6">
                            <Title title="Recent Activity" size="text-[20px]" font="font-[600]" />
                            <ul className="mt-4 space-y-4">
                                <ActivityItem icon={<FaCheckCircle className="text-success" />} text="New user registered" detail="John Doe joined as a traveler" time="2 minutes ago" />
                                <ActivityItem icon={<FaFlag className="text-danger" />} text="Review flagged" detail="Inappropriate content reported" time="15 minutes ago" />
                                <ActivityItem icon={<FaClipboardList className="text-info" />} text="New listing submitted" detail="Villa in Kandy awaiting approval" time="1 hour ago" />
                                <ActivityItem icon={<FaRupeeSign className="text-warning" />} text="Payment processed" detail="LKR 25,000 booking payment" time="2 hours ago" />
                            </ul>
                        </div>
                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow p-6">
                            <Title title="Quick Actions" size="text-[20px]" font="font-[600]" />
                            <ul className="mt-4 space-y-4">
                                <QuickActionItem color="bg-brand-primary" text="Verify New Listings" detail="12 listings pending approval" />
                                <QuickActionItem color="bg-danger" text="View Flagged Reviews" detail="3 reviews need attention" />
                                <QuickActionItem color="bg-info" text="Approve Pending Providers" detail="8 providers awaiting verification" />
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </Main>
    );
}

function StatCard({ icon, label, value, change, color }) {
    return (
        <div className={`flex items-center gap-4 bg-white rounded-xl shadow p-4`}>
            <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white ${color}`}>
                {icon}
            </div>
            <div>
                <div className="font-bold text-xl text-content-primary">{value}</div>
                <div className="text-content-secondary text-sm">{label}</div>
                <div className="text-success text-xs">{change}</div>
            </div>
        </div>
    );
}

function ActivityItem({ icon, text, detail, time }) {
    return (
        <li className="flex items-center gap-3">
            {icon}
            <div>
                <span className="font-semibold text-content-primary">{text}</span>
                <div className="text-content-secondary text-sm">{detail}</div>
                <div className="text-content-tertiary text-xs">{time}</div>
            </div>
        </li>
    );
}

function QuickActionItem({ color, text, detail }) {
    return (
        <li className={`flex items-center gap-3 p-3 rounded-lg ${color} bg-opacity-10`}>
            <span className={`w-3 h-3 rounded-full ${color} mr-2`} />
            <div>
                <span className="font-semibold text-content-primary">{text}</span>
                <div className="text-content-secondary text-sm">{detail}</div>
            </div>
        </li>
    );
}