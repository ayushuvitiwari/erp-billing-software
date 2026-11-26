
import { useState } from "react";
import DashboardLayout from "../Components/DashboardLayout";
import {
  Search,
  Users,
  UserCheck,
  UserX,
  Clock,
  Eye,
  Trash2,
  X,
  Mail,
  Phone,
  Store,
  MapPin,
  CalendarDays,
} from "lucide-react";

const ShopOwners = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOwner, setSelectedOwner] = useState(null);

  const [owners, setOwners] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      mobile: "9876543210",
      shop: "Rahul General Store",
      address: "Lucknow, UP",
      joined: "12 Nov 2026",
      status: "Active",
    },
    {
      id: 2,
      name: "Amit Verma",
      email: "amit@gmail.com",
      mobile: "9876543211",
      shop: "Amit Electronics",
      address: "Kanpur, UP",
      joined: "15 Nov 2026",
      status: "Active",
    },
    {
      id: 3,
      name: "Priya Gupta",
      email: "priya@gmail.com",
      mobile: "9876543212",
      shop: "Priya Fashion Store",
      address: "Ayodhya, UP",
      joined: "18 Nov 2026",
      status: "Pending",
    },
    {
      id: 4,
      name: "Vikas Singh",
      email: "vikas@gmail.com",
      mobile: "9876543213",
      shop: "Vikas Medical Store",
      address: "Akbarpur, UP",
      joined: "20 Nov 2026",
      status: "Inactive",
    },
  ]);

  const totalOwners = owners.length;
  const activeOwners = owners.filter((o) => o.status === "Active").length;
  const inactiveOwners = owners.filter((o) => o.status === "Inactive").length;
  const pendingOwners = owners.filter((o) => o.status === "Pending").length;

  const filteredOwners = owners.filter((owner) => {
    const matchesSearch =
      owner.name.toLowerCase().includes(search.toLowerCase()) ||
      owner.email.toLowerCase().includes(search.toLowerCase()) ||
      owner.mobile.includes(search) ||
      owner.shop.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || owner.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id) => {
    setOwners((prev) =>
      prev.map((owner) =>
        owner.id === id
          ? {
              ...owner,
              status:
                owner.status === "Active" ? "Inactive" : "Active",
            }
          : owner
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this shop owner?")) {
      setOwners((prev) => prev.filter((owner) => owner.id !== id));
    }
  };

  const stats = [
    {
      title: "Total Owners",
      value: totalOwners,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active Owners",
      value: activeOwners,
      icon: UserCheck,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Inactive Owners",
      value: inactiveOwners,
      icon: UserX,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Pending Owners",
      value: pendingOwners,
      icon: Clock,
      color: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Page Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Shop Owners
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage and monitor all registered shop owners.
            </p>
          </div>
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

        {/* Owners Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

          {/* Search and Filter */}
          <div className="p-4 sm:p-5 border-b border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  All Shop Owners
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {filteredOwners.length} owners found
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
                    placeholder="Search owners..."
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
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-slate-50">
                <tr className="text-xs uppercase text-slate-500">
                  <th className="px-5 py-4 font-semibold">Owner</th>
                  <th className="px-5 py-4 font-semibold">Shop Name</th>
                  <th className="px-5 py-4 font-semibold">Contact</th>
                  <th className="px-5 py-4 font-semibold">Joined Date</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredOwners.map((owner) => (
                  <tr key={owner.id} className="hover:bg-slate-50 transition">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                          {owner.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-slate-800">
                            {owner.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            ID: #{owner.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-slate-700">
                        {owner.shop}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {owner.address}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm text-slate-700">{owner.email}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {owner.mobile}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {owner.joined}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          owner.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : owner.status === "Inactive"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {owner.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedOwner(owner)}
                          title="View Details"
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          onClick={() => handleStatusChange(owner.id)}
                          title="Change Status"
                          className="px-3 py-2 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 text-xs font-medium"
                        >
                          {owner.status === "Active" ? "Disable" : "Enable"}
                        </button>

                        <button
                          onClick={() => handleDelete(owner.id)}
                          title="Delete Owner"
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredOwners.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-slate-500">
                      No shop owners found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Owner Details Modal */}
        {selectedOwner && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b">
                <h2 className="text-lg font-bold text-slate-800">
                  Owner Details
                </h2>
                <button
                  onClick={() => setSelectedOwner(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xl font-bold">
                    {selectedOwner.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">
                      {selectedOwner.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      Shop Owner #{selectedOwner.id}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex gap-3 items-center text-slate-600">
                    <Mail size={18} className="text-blue-600" />
                    {selectedOwner.email}
                  </div>

                  <div className="flex gap-3 items-center text-slate-600">
                    <Phone size={18} className="text-blue-600" />
                    {selectedOwner.mobile}
                  </div>

                  <div className="flex gap-3 items-center text-slate-600">
                    <Store size={18} className="text-blue-600" />
                    {selectedOwner.shop}
                  </div>

                  <div className="flex gap-3 items-center text-slate-600">
                    <MapPin size={18} className="text-blue-600" />
                    {selectedOwner.address}
                  </div>

                  <div className="flex gap-3 items-center text-slate-600">
                    <CalendarDays size={18} className="text-blue-600" />
                    Joined {selectedOwner.joined}
                  </div>
                </div>

                <div className="pt-3 border-t flex items-center justify-between">
                  <span className="text-sm text-slate-500">Account Status</span>
                  <span className="text-sm font-semibold text-slate-700">
                    {selectedOwner.status}
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

export default ShopOwners;
