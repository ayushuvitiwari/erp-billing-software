import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Store, Users, CreditCard, Crown, Tags, Bell, Headset, Settings, User, LogOut, Menu, X, Search, ChevronDown, ShieldCheck,
} from "lucide-react";

const DashboardLayout = ({ children }) => {

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [profileOpen, setProfileOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
    {
        title: "MAIN MENU",
        items: [
            { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        ],
    },
    {
        title: "SHOP MANAGEMENT",
        items: [
            { name: "All Shops", path: "/shops", icon: Store },
            { name: "Shop Owners", path: "/owners", icon: Users },
        ],
    },
    {
        title: "BUSINESS MANAGEMENT",
        items: [
            { name: "Subscriptions", path: "/subscriptions", icon: Crown },
            { name: "Payments", path: "/payments", icon: CreditCard },
            { name: "Categories", path: "/categories", icon: Tags },
        ],
    },
    {
        title: "COMMUNICATION",
        items: [
            { name: "Notifications", path: "/notifications", icon: Bell },
            { name: "Support", path: "/support", icon: Headset },
        ],
    },
    {
        title: "ACCOUNT",
        items: [
            { name: "My Profile", path: "/profile", icon: User },
            { name: "Settings", path: "/settings", icon: Settings },
        ],
    },
];

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");

        if (confirmLogout) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/");
        }
    };

    const currentPage = menuItems
        .flatMap((group) => group.items)
        .find((item) => item.path === location.pathname)?.name || "Dashboard";

    return (
        <div className="flex h-screen overflow-hidden bg-slate-100">

            {/* Sidebar */}
            <aside
                className={`${
                    sidebarOpen ? "w-64" : "w-0"
                } flex-shrink-0 overflow-hidden bg-[#101C35] text-white transition-all duration-300`}
            >
                <div className="flex h-full w-64 flex-col">

                    {/* Logo */}
                    <div className="flex h-20 items-center gap-3 border-b border-slate-700 px-6">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
                            <Store size={25} />
                        </div>

                        <div>
                            <h1 className="text-xl font-bold">BillingPro</h1>
                            <p className="text-xs text-slate-400">Super Admin Panel</p>
                        </div>
                    </div>

                    {/* Menu */}
                    <div className="flex-1 overflow-y-auto px-4 py-5">
                        {menuItems.map((group, index) => (
                            <div key={index} className="mb-6">

                                <p className="mb-3 px-3 text-[11px] font-bold tracking-widest text-slate-500">
                                    {group.title}
                                </p>

                                <div className="space-y-1">
                                    {group.items.map((item) => {
                                        const Icon = item.icon;
                                        const active = location.pathname === item.path;

                                        return (
                                            <Link
                                                key={item.path}
                                                to={item.path}
                                                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                                                    active
                                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                                                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                                }`}
                                            >
                                                <Icon size={19} />
                                                <span>{item.name}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Admin Info */}
                    <div className="border-t border-slate-700 p-4">
                        <div className="flex items-center gap-3 rounded-xl bg-slate-800 p-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                                <ShieldCheck size={21} />
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold">Super Admin</p>
                                <p className="text-xs text-slate-400">Administrator</p>
                            </div>
                        </div>
                    </div>

                </div>
            </aside>

            {/* Main Section */}
            <div className="flex min-w-0 flex-1 flex-col">

                {/* Top Navbar */}
                <header className="z-10 flex h-20 flex-shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5 shadow-sm sm:px-8">

                    <div className="flex items-center gap-4">

                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                        >
                            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>

                        <div>
                            <h2 className="text-lg font-bold text-slate-800">
                                {currentPage}
                            </h2>
                            <p className="text-xs text-slate-500">
                                Welcome to BillingPro Admin Panel
                            </p>
                        </div>

                    </div>

                    <div className="flex items-center gap-3">

                        {/* Search */}
                        <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
                            <Search size={18} className="text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search here..."
                                className="w-40 bg-transparent text-sm outline-none"
                            />
                        </div>

                        {/* Notification */}
                        <button className="relative rounded-xl p-3 text-slate-600 hover:bg-slate-100">
                            <Bell size={21} />
                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
                        </button>

                        {/* Profile */}
                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center gap-2 rounded-xl p-2 hover:bg-slate-100"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                                    <User size={21} />
                                </div>

                                <div className="hidden text-left sm:block">
                                    <p className="text-sm font-semibold text-slate-800">Ayush Tiwari</p>
                                    <p className="text-xs text-slate-500">Super Admin</p>
                                </div>

                                <ChevronDown size={16} className="text-slate-500" />
                            </button>

                            {profileOpen && (
                                <div className="absolute right-0 top-14 w-48 rounded-xl border border-slate-100 bg-white p-2 shadow-xl">
                                    <Link
                                        to="/profile"
                                        onClick={() => setProfileOpen(false)}
                                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                                    >
                                        <User size={17} /> My Profile
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                    >
                                        <LogOut size={17} /> Logout
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-5 sm:p-8">
                    {children}
                </main>

            </div>
        </div>
    );
};

export default DashboardLayout;
