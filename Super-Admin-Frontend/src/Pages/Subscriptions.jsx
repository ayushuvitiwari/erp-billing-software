
import { useState } from "react";
import DashboardLayout from "../Components/DashboardLayout";
import {
  Search,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  X,
  CalendarDays,
  Store,
  User,
  IndianRupee,
  RefreshCw,
} from "lucide-react";

const Subscriptions = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      shop: "Rahul General Store",
      owner: "Rahul Sharma",
      plan: "Premium",
      price: 999,
      duration: "1 Month",
      startDate: "01 Nov 2026",
      endDate: "01 Dec 2026",
      status: "Active",
    },
    {
      id: 2,
      shop: "Amit Electronics",
      owner: "Amit Verma",
      plan: "Standard",
      price: 499,
      duration: "1 Month",
      startDate: "10 Nov 2026",
      endDate: "10 Dec 2026",
      status: "Active",
    },
    {
      id: 3,
      shop: "Priya Fashion Store",
      owner: "Priya Gupta",
      plan: "Basic",
      price: 199,
      duration: "1 Month",
      startDate: "01 Oct 2026",
      endDate: "01 Nov 2026",
      status: "Expired",
    },
    {
      id: 4,
      shop: "Vikas Medical Store",
      owner: "Vikas Singh",
      plan: "Standard",
      price: 499,
      duration: "1 Month",
      startDate: "25 Nov 2026",
      endDate: "25 Dec 2026",
      status: "Pending",
    },
  ]);

  const activeCount = subscriptions.filter(
    (item) => item.status === "Active"
  ).length;

  const expiredCount = subscriptions.filter(
    (item) => item.status === "Expired"
  ).length;

  const pendingCount = subscriptions.filter(
    (item) => item.status === "Pending"
  ).length;

  const filteredSubscriptions = subscriptions.filter((item) => {
    const matchesSearch =
      item.shop.toLowerCase().includes(search.toLowerCase()) ||
      item.owner.toLowerCase().includes(search.toLowerCase()) ||
      item.plan.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id) => {
    setSubscriptions((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Active" ? "Expired" : "Active",
            }
          : item
      )
    );
  };

  const stats = [
    {
      title: "Total Subscriptions",
      value: subscriptions.length,
      icon: CreditCard,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active Subscriptions",
      value: activeCount,
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Expired Subscriptions",
      value: expiredCount,
      icon: XCircle,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Pending Subscriptions",
      value: pendingCount,
      icon: Clock,
      color: "bg-amber-100 text-amber-600",
    },
  ];

  const plans = [
    {
      name: "Basic",
      price: 199,
      duration: "per month",
      description: "For small shops getting started.",
      features: ["Basic Billing", "Product Management", "Billing History"],
      color: "border-slate-200",
    },
    {
      name: "Standard",
      price: 499,
      duration: "per month",
      description: "For growing retail businesses.",
      features: [
        "Everything in Basic",
        "Customer Management",
        "Sales Reports",
        "Stock Management",
      ],
      color: "border-blue-500",
    },
    {
      name: "Premium",
      price: 999,
      duration: "per month",
      description: "For shops that need more control.",
      features: [
        "Everything in Standard",
        "Advanced Reports",
        "Priority Support",
        "More Management Tools",
      ],
      color: "border-purple-500",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Subscriptions
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage shop owner plans, subscriptions and expiry dates.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{item.title}</p>
                    <h2 className="text-2xl font-bold text-slate-800 mt-2">
                      {item.value}
                    </h2>
                  </div>

                  <div className={`p-3 rounded-xl ${item.color}`}>
                    <Icon size={23} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Subscription Plans */}
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-800">
              Available Plans
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Subscription plans offered to shop owners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white border-2 ${plan.color} rounded-xl p-5 shadow-sm`}
              >
                <h3 className="text-lg font-bold text-slate-800">
                  {plan.name}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  {plan.description}
                </p>

                <div className="flex items-end gap-1 mt-5">
                  <span className="text-3xl font-bold text-slate-800">
                    ₹{plan.price}
                  </span>
                  <span className="text-sm text-slate-500 mb-1">
                    / {plan.duration}
                  </span>
                </div>

                <div className="border-t border-slate-100 mt-5 pt-4 space-y-3">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm text-slate-600"
                    >
                      <CheckCircle size={16} className="text-green-500" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

          <div className="p-4 sm:p-5 border-b border-slate-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  All Subscriptions
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {filteredSubscriptions.length} subscriptions found
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="Search shop or owner..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:w-64 pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Expired">Expired</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left">
              <thead className="bg-slate-50">
                <tr className="text-xs uppercase text-slate-500">
                  <th className="px-5 py-4 font-semibold">Shop / Owner</th>
                  <th className="px-5 py-4 font-semibold">Plan</th>
                  <th className="px-5 py-4 font-semibold">Amount</th>
                  <th className="px-5 py-4 font-semibold">Start Date</th>
                  <th className="px-5 py-4 font-semibold">Expiry Date</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredSubscriptions.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-slate-800">
                        {item.shop}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {item.owner}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-sm font-medium text-slate-700">
                        {item.plan}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                      ₹{item.price}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {item.startDate}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {item.endDate}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Expired"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedSubscription(item)}
                          title="View Details"
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          onClick={() => handleStatusChange(item.id)}
                          title="Change Status"
                          className="p-2 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100"
                        >
                          <RefreshCw size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredSubscriptions.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-12 text-slate-500">
                      No subscriptions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Details Modal */}
        {selectedSubscription && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b">
                <h2 className="text-lg font-bold text-slate-800">
                  Subscription Details
                </h2>
                <button
                  onClick={() => setSelectedSubscription(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-5 space-y-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-blue-600 font-medium">
                    Subscription Plan
                  </p>
                  <h3 className="text-2xl font-bold text-slate-800 mt-1">
                    {selectedSubscription.plan}
                  </h3>
                  <p className="text-xl font-bold text-blue-700 mt-2">
                    ₹{selectedSubscription.price}
                    <span className="text-sm font-normal text-slate-500">
                      {" "}/ month
                    </span>
                  </p>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3 text-slate-600">
                    <Store size={18} className="text-blue-600" />
                    {selectedSubscription.shop}
                  </div>

                  <div className="flex items-center gap-3 text-slate-600">
                    <User size={18} className="text-blue-600" />
                    {selectedSubscription.owner}
                  </div>

                  <div className="flex items-center gap-3 text-slate-600">
                    <CalendarDays size={18} className="text-blue-600" />
                    Start: {selectedSubscription.startDate}
                  </div>

                  <div className="flex items-center gap-3 text-slate-600">
                    <Clock size={18} className="text-blue-600" />
                    Expiry: {selectedSubscription.endDate}
                  </div>

                  <div className="flex items-center gap-3 text-slate-600">
                    <IndianRupee size={18} className="text-blue-600" />
                    Duration: {selectedSubscription.duration}
                  </div>
                </div>

                <div className="pt-3 border-t flex items-center justify-between">
                  <span className="text-sm text-slate-500">Current Status</span>
                  <span className="font-semibold text-slate-800">
                    {selectedSubscription.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default Subscriptions;
