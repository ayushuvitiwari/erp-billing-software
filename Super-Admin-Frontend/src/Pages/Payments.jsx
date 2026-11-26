
import { useState } from "react";
import DashboardLayout from "../Components/DashboardLayout";
import {
  Search,
  IndianRupee,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  X,
  Store,
  User,
  CalendarDays,
  CreditCard,
  Receipt,
  Download,
} from "lucide-react";

const Payments = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [payments] = useState([
    {
      id: 1,
      transactionId: "TXN20261126001",
      shop: "Rahul General Store",
      owner: "Rahul Sharma",
      plan: "Premium",
      amount: 999,
      method: "UPI",
      date: "26 Nov 2026",
      time: "10:30 AM",
      status: "Success",
    },
    {
      id: 2,
      transactionId: "TXN20261126002",
      shop: "Amit Electronics",
      owner: "Amit Verma",
      plan: "Standard",
      amount: 499,
      method: "Card",
      date: "26 Nov 2026",
      time: "11:15 AM",
      status: "Success",
    },
    {
      id: 3,
      transactionId: "TXN20261126003",
      shop: "Priya Fashion Store",
      owner: "Priya Gupta",
      plan: "Basic",
      amount: 199,
      method: "UPI",
      date: "25 Nov 2026",
      time: "02:20 PM",
      status: "Pending",
    },
    {
      id: 4,
      transactionId: "TXN20261126004",
      shop: "Vikas Medical Store",
      owner: "Vikas Singh",
      plan: "Standard",
      amount: 499,
      method: "Net Banking",
      date: "24 Nov 2026",
      time: "04:45 PM",
      status: "Failed",
    },
    {
      id: 5,
      transactionId: "TXN20261126005",
      shop: "Sharma Kirana Store",
      owner: "Mohit Sharma",
      plan: "Premium",
      amount: 999,
      method: "Cash",
      date: "23 Nov 2026",
      time: "12:10 PM",
      status: "Success",
    },
  ]);

  const successfulPayments = payments.filter(
    (payment) => payment.status === "Success"
  );

  const pendingPayments = payments.filter(
    (payment) => payment.status === "Pending"
  );

  const failedPayments = payments.filter(
    (payment) => payment.status === "Failed"
  );

  const totalRevenue = successfulPayments.reduce(
    (total, payment) => total + payment.amount,
    0
  );

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.shop.toLowerCase().includes(search.toLowerCase()) ||
      payment.owner.toLowerCase().includes(search.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || payment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Successful Payments",
      value: successfulPayments.length,
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Pending Payments",
      value: pendingPayments.length,
      icon: Clock,
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "Failed Payments",
      value: failedPayments.length,
      icon: XCircle,
      color: "bg-red-100 text-red-600",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "Success") {
      return "bg-green-100 text-green-700";
    }
    if (status === "Pending") {
      return "bg-amber-100 text-amber-700";
    }
    return "bg-red-100 text-red-700";
  };

  const handleDownload = (payment) => {
    const receipt = [
      "PAYMENT RECEIPT",
      "------------------------------",
      `Transaction ID: ${payment.transactionId}`,
      `Shop: ${payment.shop}`,
      `Owner: ${payment.owner}`,
      `Plan: ${payment.plan}`,
      `Amount: Rs. ${payment.amount}`,
      `Payment Method: ${payment.method}`,
      `Date: ${payment.date}`,
      `Time: ${payment.time}`,
      `Status: ${payment.status}`,
    ].join("\n");

    const blob = new Blob([receipt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `Receipt-${payment.transactionId}.txt`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Page Heading */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Payments
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track subscription payments and transaction records.
          </p>
        </div>

        {/* Stats Cards */}
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

        {/* Payment Transactions */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

          {/* Search and Filter */}
          <div className="p-4 sm:p-5 border-b border-slate-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  All Transactions
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {filteredPayments.length} transactions found
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
                    placeholder="Search transaction..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:w-72 pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="All">All Status</option>
                  <option value="Success">Success</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left">
              <thead className="bg-slate-50">
                <tr className="text-xs uppercase text-slate-500">
                  <th className="px-5 py-4 font-semibold">Transaction ID</th>
                  <th className="px-5 py-4 font-semibold">Shop / Owner</th>
                  <th className="px-5 py-4 font-semibold">Plan</th>
                  <th className="px-5 py-4 font-semibold">Amount</th>
                  <th className="px-5 py-4 font-semibold">Payment Method</th>
                  <th className="px-5 py-4 font-semibold">Date</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="hover:bg-slate-50 transition"
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-blue-600">
                        {payment.transactionId}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-slate-800">
                        {payment.shop}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {payment.owner}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {payment.plan}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                      ₹{payment.amount}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {payment.method}
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm text-slate-700">{payment.date}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {payment.time}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                          payment.status
                        )}`}
                      >
                        {payment.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => setSelectedPayment(payment)}
                          title="View Details"
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          onClick={() => handleDownload(payment)}
                          title="Download Receipt"
                          className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100"
                        >
                          <Download size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredPayments.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center py-12 text-slate-500">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Details Modal */}
        {selectedPayment && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">

              <div className="flex items-center justify-between p-5 border-b">
                <h2 className="text-lg font-bold text-slate-800">
                  Payment Details
                </h2>

                <button
                  onClick={() => setSelectedPayment(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-5 space-y-5">
                <div className="bg-blue-50 rounded-xl p-5 text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto text-blue-600">
                    <IndianRupee size={25} />
                  </div>

                  <p className="text-sm text-slate-500 mt-3">
                    Payment Amount
                  </p>

                  <h3 className="text-3xl font-bold text-slate-800 mt-1">
                    ₹{selectedPayment.amount}
                  </h3>

                  <span
                    className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                      selectedPayment.status
                    )}`}
                  >
                    {selectedPayment.status}
                  </span>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between gap-3">
                    <span className="text-slate-500">Transaction ID</span>
                    <span className="font-medium text-slate-800 text-right break-all">
                      {selectedPayment.transactionId}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-600">
                    <Store size={18} className="text-blue-600" />
                    {selectedPayment.shop}
                  </div>

                  <div className="flex items-center gap-3 text-slate-600">
                    <User size={18} className="text-blue-600" />
                    {selectedPayment.owner}
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Subscription Plan</span>
                    <span className="font-medium text-slate-800">
                      {selectedPayment.plan}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-600">
                    <CreditCard size={18} className="text-blue-600" />
                    {selectedPayment.method}
                  </div>

                  <div className="flex items-center gap-3 text-slate-600">
                    <CalendarDays size={18} className="text-blue-600" />
                    {selectedPayment.date} - {selectedPayment.time}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <button
                    onClick={() => handleDownload(selectedPayment)}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-semibold transition"
                  >
                    <Download size={17} />
                    Download Receipt
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default Payments;
