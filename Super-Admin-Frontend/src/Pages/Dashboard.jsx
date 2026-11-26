
import DashboardLayout from "../Components/DashboardLayout";
import { Store, Users, IndianRupee, CreditCard, TrendingUp, TrendingDown, Plus, ArrowUpRight, ArrowRight, MoreHorizontal, UserPlus, Activity, ShoppingBag, CalendarDays, CheckCircle2, Clock, Eye, Wallet} from "lucide-react";

import { Link } from "react-router-dom";

const Dashboard = () => {

  const stats = [
    {
      title: "Total Shops",
      value: "248",
      growth: "+12.5%",
      icon: Store,
      color: "bg-blue-50 text-blue-600",
      positive: true
    },
    {
      title: "Shop Owners",
      value: "186",
      growth: "+8.2%",
      icon: Users,
      color: "bg-purple-50 text-purple-600",
      positive: true
    },
    {
      title: "Total Revenue",
      value: "₹84,500",
      growth: "+15.4%",
      icon: IndianRupee,
      color: "bg-emerald-50 text-emerald-600",
      positive: true
    },
    {
      title: "Active Subscriptions",
      value: "142",
      growth: "-2.4%",
      icon: CreditCard,
      color: "bg-orange-50 text-orange-600",
      positive: false
    }
  ];

  const recentShops = [
    {
      name: "Sharma General Store",
      owner: "Rahul Sharma",
      category: "Grocery",
      date: "26 Nov 2026",
      status: "Active"
    },
    {
      name: "City Fashion Hub",
      owner: "Amit Verma",
      category: "Clothing",
      date: "25 Nov 2026",
      status: "Active"
    },
    {
      name: "New Medical Store",
      owner: "Vikas Gupta",
      category: "Medical",
      date: "24 Nov 2026",
      status: "Pending"
    },
    {
      name: "Digital Electronics",
      owner: "Rohit Singh",
      category: "Electronics",
      date: "23 Nov 2026",
      status: "Active"
    }
  ];

  const activities = [
    {
      title: "New Shop Registered",
      detail: "Sharma General Store",
      time: "10 minutes ago",
      icon: Store,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "New Owner Registered",
      detail: "Rahul Sharma",
      time: "35 minutes ago",
      icon: UserPlus,
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "Subscription Renewed",
      detail: "City Fashion Hub",
      time: "1 hour ago",
      icon: CreditCard,
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      title: "Payment Received",
      detail: "₹2,499 received",
      time: "2 hours ago",
      icon: Wallet,
      color: "bg-orange-50 text-orange-600"
    }
  ];

  const quickActions = [
    {
      title: "Add New Shop",
      description: "Register a new shop",
      icon: Plus,
      link: "/shops"
    },
    {
      title: "Manage Owners",
      description: "View all shop owners",
      icon: Users,
      link: "/shop-owners"
    },
    {
      title: "Subscriptions",
      description: "Manage shop plans",
      icon: CreditCard,
      link: "/subscriptions"
    }
  ];

  return (
    <DashboardLayout>

      <div className="w-full min-h-screen bg-[#F8FAFC] p-5 lg:p-7 space-y-7">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

          <div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
              <span>Super Admin</span>
              <span>/</span>
              <span className="text-blue-600">Dashboard</span>
            </div>

            <h1 className="text-2xl font-bold text-gray-800">
              Dashboard Overview
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Welcome back! Here's what's happening with your platform.
            </p>
          </div>

          <div className="flex items-center gap-3">

            <button className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-600">
              <CalendarDays size={17} />
              26 Nov 2026
            </button>

            <Link
              to="/shops"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-blue-100"
            >
              <Plus size={18} />
              Add New Shop
            </Link>

          </div>

        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
              >

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-gray-500 font-medium">
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

                <div className="flex items-center gap-2 mt-5">

                  <span className={`flex items-center gap-1 text-xs font-semibold ${
                    item.positive ? "text-emerald-600" : "text-red-500"
                  }`}>
                    {item.positive
                      ? <TrendingUp size={14} />
                      : <TrendingDown size={14} />
                    }
                    {item.growth}
                  </span>

                  <span className="text-xs text-gray-400">
                    vs last month
                  </span>

                </div>

              </div>
            );
          })}

        </div>

        {/* Revenue and Quick Summary */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

          {/* Revenue Chart */}
          <div className="xl:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">

            <div className="flex justify-between items-center gap-3">

              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Revenue Overview
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  Monthly platform revenue
                </p>
              </div>

              <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none">
                <option>Last 30 Days</option>
                <option>Last 7 Days</option>
                <option>Last 12 Months</option>
              </select>

            </div>

            <div className="flex items-center gap-3 mt-6">
              <h2 className="text-3xl font-bold text-gray-800">
                ₹84,500
              </h2>

              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                +15.4%
              </span>
            </div>

            {/* Revenue Bars */}
            <div className="h-52 flex items-end justify-between gap-3 mt-8 border-b border-gray-100 pb-2">

              {[45, 65, 50, 80, 60, 90, 70, 95, 65, 85, 75, 100].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 h-full flex flex-col justify-end items-center gap-2"
                >
                  <div
                    style={{ height: `${height}%` }}
                    className={`w-full max-w-10 rounded-t-lg transition-all ${
                      index === 11
                        ? "bg-blue-600"
                        : "bg-blue-100 hover:bg-blue-300"
                    }`}
                  />

                  <span className="text-[10px] text-gray-400">
                    {index + 1}
                  </span>

                </div>
              ))}

            </div>

            <div className="flex justify-between mt-3 text-xs text-gray-400">
              <span>01 Nov</span>
              <span>10 Nov</span>
              <span>20 Nov</span>
              <span>30 Nov</span>
            </div>

          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">

            <h2 className="text-lg font-bold text-gray-800">
              Quick Actions
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Manage your platform quickly
            </p>

            <div className="space-y-3 mt-6">

              {quickActions.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={index}
                    to={item.link}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-100 transition group"
                  >

                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Icon size={20} />
                    </div>

                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-800">
                        {item.title}
                      </h4>

                      <p className="text-xs text-gray-400 mt-1">
                        {item.description}
                      </p>
                    </div>

                    <ArrowUpRight
                      size={17}
                      className="text-gray-400 group-hover:text-blue-600"
                    />

                  </Link>
                );
              })}

            </div>

            <div className="mt-5 p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center gap-2 text-blue-700">
                <Activity size={18} />
                <span className="text-sm font-semibold">
                  Platform Overview
                </span>
              </div>

              <p className="text-xs text-blue-600 mt-2">
                Your platform is running with 248 registered shops.
              </p>
            </div>

          </div>

        </div>

        {/* Recent Shops and Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

          {/* Recent Shops */}
          <div className="xl:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

            <div className="flex items-center justify-between p-5">

              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Recent Shops
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  Recently registered shops
                </p>
              </div>

              <Link
                to="/shops"
                className="text-sm text-blue-600 font-semibold flex items-center gap-1"
              >
                View All
                <ArrowRight size={16} />
              </Link>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full text-left whitespace-nowrap">

                <thead className="bg-gray-50 border-y border-gray-100">
                  <tr>
                    <th className="px-5 py-4 text-xs text-gray-500 font-semibold">SHOP DETAILS</th>
                    <th className="px-5 py-4 text-xs text-gray-500 font-semibold">CATEGORY</th>
                    <th className="px-5 py-4 text-xs text-gray-500 font-semibold">DATE</th>
                    <th className="px-5 py-4 text-xs text-gray-500 font-semibold">STATUS</th>
                    <th className="px-5 py-4 text-xs text-gray-500 font-semibold">ACTION</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">

                  {recentShops.map((shop, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                            <Store size={19} />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {shop.name}
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                              {shop.owner}
                            </p>
                          </div>

                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {shop.category}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-500">
                        {shop.date}
                      </td>

                      <td className="px-5 py-4">

                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          shop.status === "Active"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-amber-50 text-amber-600"
                        }`}>
                          {shop.status}
                        </span>

                      </td>

                      <td className="px-5 py-4">
                        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
                          <Eye size={17} />
                        </button>
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Recent Activity
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  Latest platform activities
                </p>
              </div>

              <MoreHorizontal size={21} className="text-gray-400" />

            </div>

            <div className="mt-6 space-y-6">

              {activities.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div key={index} className="flex gap-3">

                    <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ${item.color}`}>
                      <Icon size={19} />
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">
                        {item.title}
                      </h4>

                      <p className="text-xs text-gray-500 mt-1">
                        {item.detail}
                      </p>

                      <p className="text-xs text-gray-400 mt-2">
                        {item.time}
                      </p>
                    </div>

                  </div>
                );
              })}

            </div>

            <button className="w-full mt-6 pt-4 border-t border-gray-100 text-sm text-blue-600 font-semibold hover:text-blue-700">
              View All Activities
            </button>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Dashboard;
