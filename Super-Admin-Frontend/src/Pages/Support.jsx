
import { useState } from "react";
import DashboardLayout from "../Components/DashboardLayout";
import {
  Headset,
  Ticket,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Eye,
  MessageSquare,
  X,
  Send,
  Filter,
} from "lucide-react";

const Support = () => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [reply, setReply] = useState("");

  const tickets = [
    {
      id: "TKT-1001",
      owner: "Rahul Sharma",
      shop: "Rahul General Store",
      email: "rahul@gmail.com",
      subject: "Payment not received",
      message: "My subscription payment has been deducted but the status is still pending.",
      priority: "High",
      status: "Open",
      date: "26 Nov 2026",
    },
    {
      id: "TKT-1002",
      owner: "Amit Verma",
      shop: "Amit Electronics",
      email: "amit@gmail.com",
      subject: "Unable to add products",
      message: "I am unable to add new products to my shop.",
      priority: "Medium",
      status: "In Progress",
      date: "25 Nov 2026",
    },
    {
      id: "TKT-1003",
      owner: "Priya Singh",
      shop: "Priya Fashion Store",
      email: "priya@gmail.com",
      subject: "Subscription renewal issue",
      message: "Please help me renew my subscription.",
      priority: "Low",
      status: "Resolved",
      date: "24 Nov 2026",
    },
    {
      id: "TKT-1004",
      owner: "Rohit Gupta",
      shop: "Rohit Medical Store",
      email: "rohit@gmail.com",
      subject: "Login problem",
      message: "I cannot log in to my shop owner account.",
      priority: "High",
      status: "Open",
      date: "23 Nov 2026",
    },
    {
      id: "TKT-1005",
      owner: "Neha Mishra",
      shop: "Neha Cosmetics",
      email: "neha@gmail.com",
      subject: "Billing calculation error",
      message: "The total amount is not calculating correctly.",
      priority: "Medium",
      status: "In Progress",
      date: "22 Nov 2026",
    },
  ];

  const [ticketList, setTicketList] = useState(tickets);

  const stats = [
    {
      title: "Total Tickets",
      value: ticketList.length,
      icon: Ticket,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Open Tickets",
      value: ticketList.filter((t) => t.status === "Open").length,
      icon: AlertCircle,
      color: "bg-red-50 text-red-600",
    },
    {
      title: "In Progress",
      value: ticketList.filter((t) => t.status === "In Progress").length,
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "Resolved",
      value: ticketList.filter((t) => t.status === "Resolved").length,
      icon: CheckCircle,
      color: "bg-green-50 text-green-600",
    },
  ];

  const filters = ["All", "Open", "In Progress", "Resolved"];

  const filteredTickets = ticketList.filter((ticket) => {
    const matchesFilter =
      activeFilter === "All" || ticket.status === activeFilter;

    const matchesSearch =
      ticket.owner.toLowerCase().includes(search.toLowerCase()) ||
      ticket.shop.toLowerCase().includes(search.toLowerCase()) ||
      ticket.id.toLowerCase().includes(search.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const updateStatus = (id, status) => {
    setTicketList((prev) =>
      prev.map((ticket) =>
        ticket.id === id ? { ...ticket, status } : ticket
      )
    );

    setSelectedTicket((prev) =>
      prev ? { ...prev, status } : prev
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Support Management
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage shop owner complaints and support requests.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-3 rounded-xl text-sm font-semibold">
            <Headset size={19} />
            Support Center
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs sm:text-sm text-slate-500">
                      {item.title}
                    </p>
                    <h2 className="text-2xl font-bold text-slate-800 mt-2">
                      {item.value}
                    </h2>
                  </div>

                  <div className={`p-3 rounded-xl ${item.color}`}>
                    <Icon size={22} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tickets Section */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">

          <div className="p-4 sm:p-5 border-b border-slate-100">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Support Tickets
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  View and manage all shop owner tickets.
                </p>
              </div>

              <div className="relative w-full lg:w-72">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search tickets..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1">
              <Filter size={17} className="text-slate-400 shrink-0" />

              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap ${
                    activeFilter === filter
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                <tr>
                  <th className="px-5 py-4">Ticket ID</th>
                  <th className="px-5 py-4">Shop Owner</th>
                  <th className="px-5 py-4">Subject</th>
                  <th className="px-5 py-4">Priority</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-slate-50 transition">

                    <td className="px-5 py-4 text-sm font-semibold text-blue-600">
                      {ticket.id}
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-slate-700">
                        {ticket.owner}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {ticket.shop}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {ticket.subject}
                    </td>

                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold ${
                        ticket.priority === "High"
                          ? "text-red-600"
                          : ticket.priority === "Medium"
                          ? "text-amber-600"
                          : "text-green-600"
                      }`}>
                        {ticket.priority}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        ticket.status === "Open"
                          ? "bg-red-50 text-red-600"
                          : ticket.status === "In Progress"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-green-50 text-green-600"
                      }`}>
                        {ticket.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-xs text-slate-500">
                      {ticket.date}
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                        title="View Ticket"
                      >
                        <Eye size={17} />
                      </button>
                    </td>

                  </tr>
                ))}

                {filteredTickets.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-12 text-sm text-slate-400">
                      No support tickets found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ticket Details Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden">

              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">
                    Ticket Details
                  </h2>
                  <p className="text-xs text-blue-600 mt-1">
                    {selectedTicket.id}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedTicket(null)}
                  className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="p-5 space-y-4">

                <div>
                  <p className="text-xs text-slate-400">Shop Owner</p>
                  <p className="font-semibold text-slate-800 mt-1">
                    {selectedTicket.owner}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {selectedTicket.shop}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {selectedTicket.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Subject</p>
                  <p className="font-semibold text-slate-800 mt-1">
                    {selectedTicket.subject}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Complaint Message</p>
                  <p className="text-sm text-slate-600 mt-2 bg-slate-50 p-4 rounded-xl leading-6">
                    {selectedTicket.message}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-2">
                    Update Ticket Status
                  </p>

                  <select
                    value={selectedTicket.status}
                    onChange={(e) =>
                      updateStatus(selectedTicket.id, e.target.value)
                    }
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-blue-500"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-2">
                    Reply to Shop Owner
                  </p>

                  <textarea
                    rows="3"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Write your response..."
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <button
                  onClick={() => {
                    if (!reply.trim()) return;
                    alert("Reply UI ready. Backend integration pending.");
                    setReply("");
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700"
                >
                  <Send size={17} />
                  Send Reply
                </button>

              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default Support;
