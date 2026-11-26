
import DashboardLayout from "../Components/DashboardLayout";
import { useState } from "react";
import {
  Store,
  Search,
  Plus,
  Filter,
  Eye,
  Pencil,
  Trash2,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  X
} from "lucide-react";
import { Link } from "react-router-dom";

const AllShops = () => {

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedShop, setSelectedShop] = useState(null);

  const [shops, setShops] = useState([
    {
      id: 1,
      name: "Sharma General Store",
      owner: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543210",
      category: "Grocery",
      address: "Aliganj, Lucknow",
      date: "26 Nov 2026",
      status: "Active"
    },
    {
      id: 2,
      name: "City Fashion Hub",
      owner: "Amit Verma",
      email: "amit@gmail.com",
      phone: "9876543211",
      category: "Clothing",
      address: "Hazratganj, Lucknow",
      date: "25 Nov 2026",
      status: "Active"
    },
    {
      id: 3,
      name: "New Medical Store",
      owner: "Vikas Gupta",
      email: "vikas@gmail.com",
      phone: "9876543212",
      category: "Medical",
      address: "Indira Nagar, Lucknow",
      date: "24 Nov 2026",
      status: "Pending"
    },
    {
      id: 4,
      name: "Digital Electronics",
      owner: "Rohit Singh",
      email: "rohit@gmail.com",
      phone: "9876543213",
      category: "Electronics",
      address: "Gomti Nagar, Lucknow",
      date: "23 Nov 2026",
      status: "Active"
    },
    {
      id: 5,
      name: "Fresh Mart",
      owner: "Ankit Yadav",
      email: "ankit@gmail.com",
      phone: "9876543214",
      category: "Grocery",
      address: "Jankipuram, Lucknow",
      date: "22 Nov 2026",
      status: "Inactive"
    },
    {
      id: 6,
      name: "Royal Footwear",
      owner: "Sandeep Kumar",
      email: "sandeep@gmail.com",
      phone: "9876543215",
      category: "Footwear",
      address: "Aminabad, Lucknow",
      date: "21 Nov 2026",
      status: "Active"
    },
    {
      id: 7,
      name: "Mobile World",
      owner: "Deepak Singh",
      email: "deepak@gmail.com",
      phone: "9876543216",
      category: "Electronics",
      address: "Chowk, Lucknow",
      date: "20 Nov 2026",
      status: "Pending"
    },
    {
      id: 8,
      name: "Fashion Point",
      owner: "Mohit Verma",
      email: "mohit@gmail.com",
      phone: "9876543217",
      category: "Clothing",
      address: "Rajajipuram, Lucknow",
      date: "19 Nov 2026",
      status: "Active"
    }
  ]);

  const stats = [
    {
      title: "Total Shops",
      value: shops.length,
      icon: Store,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Active Shops",
      value: shops.filter(shop => shop.status === "Active").length,
      icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      title: "Inactive Shops",
      value: shops.filter(shop => shop.status === "Inactive").length,
      icon: XCircle,
      color: "bg-red-50 text-red-600"
    },
    {
      title: "Pending Approval",
      value: shops.filter(shop => shop.status === "Pending").length,
      icon: Clock,
      color: "bg-amber-50 text-amber-600"
    }
  ];

  const filteredShops = shops.filter(shop => {
    const matchesSearch =
      shop.name.toLowerCase().includes(search.toLowerCase()) ||
      shop.owner.toLowerCase().includes(search.toLowerCase()) ||
      shop.phone.includes(search);

    const matchesStatus =
      statusFilter === "All" || shop.status === statusFilter;

    const matchesCategory =
      categoryFilter === "All" || shop.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleStatusChange = (id) => {
    setShops(prev =>
      prev.map(shop =>
        shop.id === id
          ? {
              ...shop,
              status: shop.status === "Active" ? "Inactive" : "Active"
            }
          : shop
      )
    );
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this shop?"
    );

    if (confirmDelete) {
      setShops(prev => prev.filter(shop => shop.id !== id));
    }
  };

  return (
    <DashboardLayout>

      <div className="min-h-screen w-full bg-[#F8FAFC] p-5 lg:p-7 space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

          <div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
              <span>Super Admin</span>
              <span>/</span>
              <span className="text-blue-600">All Shops</span>
            </div>

            <h1 className="text-2xl font-bold text-gray-800">
              All Shops
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage and monitor all registered shops on your platform.
            </p>
          </div>

          <Link
            to="/add-shop"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-md shadow-blue-100"
          >
            <Plus size={18} />
            Add New Shop
          </Link>

        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
              >
                <div className="flex justify-between items-center">

                  <div>
                    <p className="text-sm text-gray-500">
                      {item.title}
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-3">
                      {item.value}
                    </h2>
                  </div>

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>
                    <Icon size={23} />
                  </div>

                </div>
              </div>
            );
          })}

        </div>

        {/* Shop Management */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

          {/* Table Header */}
          <div className="p-5 lg:p-6 border-b border-gray-100">

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Shop Management
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  View and manage all your registered shops.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">

                {/* Search */}
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Search shops or owners..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full sm:w-64 pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={categoryFilter}
                  onChange={e => setCategoryFilter(e.target.value)}
                  className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 outline-none focus:border-blue-500"
                >
                  <option value="All">All Categories</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Medical">Medical</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Footwear">Footwear</option>
                </select>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 outline-none focus:border-blue-500"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>

              </div>

            </div>

          </div>

          {/* Results */}
          <div className="px-5 py-4 flex items-center justify-between bg-gray-50/70">
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold text-gray-800">{filteredShops.length}</span> shops
            </p>

            <span className="text-xs text-gray-400">
              All registered shops
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">

            <table className="w-full text-left whitespace-nowrap">

              <thead className="bg-gray-50 border-y border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500">SHOP DETAILS</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500">OWNER</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500">CATEGORY</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500">ADDRESS</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500">JOINED DATE</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500">STATUS</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500">ACTIONS</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {filteredShops.map(shop => (

                  <tr key={shop.id} className="hover:bg-blue-50/30 transition">

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                          <Store size={21} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {shop.name}
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            SHOP-{String(shop.id).padStart(4, "0")}
                          </p>
                        </div>

                      </div>

                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-700">
                        {shop.owner}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {shop.email}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                        {shop.category}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <MapPin size={14} />
                        {shop.address}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {shop.date}
                    </td>

                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                        shop.status === "Active"
                          ? "bg-emerald-50 text-emerald-600"
                          : shop.status === "Inactive"
                          ? "bg-red-50 text-red-600"
                          : "bg-amber-50 text-amber-600"
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {shop.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-1">

                        <button
                          onClick={() => setSelectedShop(shop)}
                          title="View Shop"
                          className="p-2 rounded-lg text-blue-600 hover:bg-blue-50"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          onClick={() => handleStatusChange(shop.id)}
                          title="Change Status"
                          className="p-2 rounded-lg text-amber-600 hover:bg-amber-50"
                        >
                          <MoreHorizontal size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(shop.id)}
                          title="Delete Shop"
                          className="p-2 rounded-lg text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            {filteredShops.length === 0 && (
              <div className="py-16 text-center">
                <Store size={40} className="mx-auto text-gray-300 mb-3" />
                <h3 className="font-semibold text-gray-700">No shops found</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Try changing your search or filters.
                </p>
              </div>
            )}

          </div>

          {/* Pagination UI */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border-t border-gray-100">

            <p className="text-sm text-gray-500">
              Showing {filteredShops.length} of {shops.length} shops
            </p>

            <div className="flex items-center gap-2">

              <button
                disabled
                className="p-2 border border-gray-200 rounded-lg text-gray-400 disabled:opacity-50"
              >
                <ChevronLeft size={17} />
              </button>

              <button className="w-9 h-9 bg-blue-600 text-white rounded-lg text-sm font-semibold">
                1
              </button>

              <button className="w-9 h-9 border border-gray-200 rounded-lg text-sm text-gray-600">
                2
              </button>

              <button className="w-9 h-9 border border-gray-200 rounded-lg text-sm text-gray-600">
                3
              </button>

              <button className="p-2 border border-gray-200 rounded-lg text-gray-600">
                <ChevronRight size={17} />
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Shop Details Modal */}
      {selectedShop && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">

            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">
                Shop Details
              </h2>

              <button
                onClick={() => setSelectedShop(null)}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Store size={27} />
                </div>

                <div>
                  <h3 className="font-bold text-gray-800">
                    {selectedShop.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    SHOP-{String(selectedShop.id).padStart(4, "0")}
                  </p>
                </div>
              </div>

              <div className="space-y-4">

                {[
                  ["Owner", selectedShop.owner],
                  ["Email", selectedShop.email],
                  ["Phone", selectedShop.phone],
                  ["Category", selectedShop.category],
                  ["Address", selectedShop.address],
                  ["Registered Date", selectedShop.date],
                  ["Status", selectedShop.status]
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 border-b border-gray-100 pb-3">
                    <span className="text-sm text-gray-500">{label}</span>
                    <span className="text-sm font-semibold text-gray-800 text-right">{value}</span>
                  </div>
                ))}

              </div>

              <button
                onClick={() => setSelectedShop(null)}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm"
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </DashboardLayout>
  );
};

export default AllShops;
