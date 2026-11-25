
import React from 'react'
import BottomNavbar from "../Components/BottomNavbar"
import {
  IndianRupee,
  ShoppingBag,
  Package,
  TrendingUp,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  Clock,
  ChevronRight,
  CalendarDays,
  Wallet
} from 'lucide-react'

const Home = () => {

  const stats = [
    {
      title: "Today's Sales",
      value: "₹12,450",
      change: "+12.5%",
      icon: IndianRupee,
      color: "bg-blue-50 text-blue-600",
      positive: true
    },
    {
      title: "Total Orders",
      value: "48",
      change: "+8.2%",
      icon: ShoppingBag,
      color: "bg-purple-50 text-purple-600",
      positive: true
    },
    {
      title: "Total Products",
      value: "256",
      change: "In Stock",
      icon: Package,
      color: "bg-orange-50 text-orange-600"
    },
    {
      title: "Today's Revenue",
      value: "₹10,850",
      change: "+5.4%",
      icon: TrendingUp,
      color: "bg-green-50 text-green-600",
      positive: true
    }
  ]

  const recentBills = [
    { id: "#INV-1025", customer: "Rahul Sharma", amount: "₹1,250", time: "10:45 AM", status: "Paid" },
    { id: "#INV-1024", customer: "Amit Verma", amount: "₹850", time: "10:20 AM", status: "Paid" },
    { id: "#INV-1023", customer: "Priya Singh", amount: "₹2,400", time: "09:55 AM", status: "Pending" },
    { id: "#INV-1022", customer: "Rohit Kumar", amount: "₹650", time: "09:30 AM", status: "Paid" }
  ]

  return (
    <div className="min-h-screen bg-slate-50 pb-24">

      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">

          <div>
            <p className="text-xs text-gray-500 font-medium">
              Welcome Back 👋
            </p>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
              Shop Dashboard
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Manage your shop with ease
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-slate-800">Ayush Store</p>
              <p className="text-xs text-gray-400">Shop Owner</p>
            </div>

            <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
              A
            </div>
          </div>

        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-5">

        {/* Shop Information */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-5 sm:p-6 text-white mb-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-200 text-xs font-medium">
                YOUR SHOP
              </p>
              <h2 className="text-xl sm:text-2xl font-bold mt-1">
                Ayush Store
              </h2>
              <p className="text-blue-200 text-xs mt-2">
                Welcome to your business dashboard
              </p>
            </div>

            <div className="bg-white/10 p-3 rounded-xl">
              <Wallet size={25} />
            </div>
          </div>

          <div className="border-t border-white/20 mt-5 pt-4 flex justify-between items-center">
            <div>
              <p className="text-blue-200 text-xs">Today's Collection</p>
              <h3 className="text-2xl font-bold mt-1">₹12,450</h3>
            </div>

            <button className="bg-white text-slate-900 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 active:scale-95 transition">
              <Plus size={16} />
              New Bill
            </button>
          </div>
        </div>

        {/* Section Heading */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Business Overview
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Check your shop's performance
            </p>
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-500 bg-white border border-gray-200 rounded-lg px-3 py-2">
            <CalendarDays size={14} />
            Today
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-7">

          {stats.map((item, index) => {
            const Icon = item.icon

            return (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                    <Icon size={20} />
                  </div>

                  {item.positive && (
                    <span className="flex items-center text-[10px] font-semibold text-green-600">
                      <ArrowUpRight size={13} />
                      {item.change}
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  {item.title}
                </p>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mt-1">
                  {item.value}
                </h3>

                {!item.positive && (
                  <p className="text-[10px] text-gray-400 mt-1">
                    {item.change}
                  </p>
                )}
              </div>
            )
          })}

        </div>

        {/* Quick Actions */}
        <div className="mb-7">
          <h2 className="text-lg font-bold text-slate-800 mb-3">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 gap-3">

            <button className="bg-blue-600 text-white rounded-2xl p-4 flex items-center justify-between shadow-sm active:scale-95 transition">
              <div className="text-left">
                <Receipt size={23} />
                <p className="font-semibold text-sm mt-3">Create Bill</p>
                <p className="text-[10px] text-blue-100 mt-1">Generate new invoice</p>
              </div>
              <Plus size={20} />
            </button>

            <button className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between active:scale-95 transition">
              <div className="text-left">
                <Package size={23} className="text-orange-500" />
                <p className="font-semibold text-sm text-slate-800 mt-3">Add Product</p>
                <p className="text-[10px] text-gray-400 mt-1">Manage your stock</p>
              </div>
              <Plus size={20} className="text-gray-400" />
            </button>

          </div>
        </div>

        {/* Recent Bills */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div>
              <h2 className="font-bold text-slate-800">
                Recent Bills
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Your latest transactions
              </p>
            </div>

            <button className="text-blue-600 text-xs font-semibold flex items-center gap-1">
              View All <ChevronRight size={15} />
            </button>
          </div>

          <div className="divide-y divide-gray-100">

            {recentBills.map((bill, index) => (
              <div key={index} className="flex items-center justify-between p-4 gap-2">

                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Receipt size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800">
                      {bill.customer}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      {bill.id} • {bill.time}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-slate-800">
                    {bill.amount}
                  </p>

                  <span className={`text-[10px] font-semibold ${
                    bill.status === 'Paid'
                      ? 'text-green-600'
                      : 'text-orange-500'
                  }`}>
                    {bill.status}
                  </span>
                </div>

              </div>
            ))}

          </div>
        </div>

        {/* Footer Space */}
        <div className="h-4"></div>

      </main>

      <BottomNavbar />

    </div>
  )
}

export default Home
