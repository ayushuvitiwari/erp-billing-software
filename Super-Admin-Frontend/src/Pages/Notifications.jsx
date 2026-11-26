
import { useState } from "react";
import DashboardLayout from "../Components/DashboardLayout";
import {
  Bell,
  Send,
  Clock,
  FileText,
  Search,
  Plus,
  Eye,
  Trash2,
  X,
  Megaphone,
  AlertTriangle,
  Gift,
  Info,
  CheckCircle,
  Users,
  CalendarDays,
} from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Welcome to Our Billing Platform",
      message:
        "Welcome! Your shop account is now active. Start managing your products and billing easily.",
      type: "Announcement",
      audience: "All Shop Owners",
      date: "26 Nov 2026",
      status: "Sent",
      read: true,
    },
    {
      id: 2,
      title: "Subscription Expiry Reminder",
      message:
        "Your subscription is about to expire. Please renew your plan to continue using all features.",
      type: "Warning",
      audience: "Selected Owners",
      date: "25 Nov 2026",
      status: "Sent",
      read: false,
    },
    {
      id: 3,
      title: "New Premium Plan Available",
      message:
        "Upgrade to our Premium plan and enjoy advanced reports and more management features.",
      type: "Offer",
      audience: "All Shop Owners",
      date: "24 Nov 2026",
      status: "Draft",
      read: false,
    },
    {
      id: 4,
      title: "Platform Maintenance",
      message:
        "Scheduled platform maintenance will take place soon. Some services may be temporarily unavailable.",
      type: "General",
      audience: "All Shop Owners",
      date: "27 Nov 2026",
      status: "Scheduled",
      read: false,
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const [form, setForm] = useState({
    title: "",
    message: "",
    type: "General",
    audience: "All Shop Owners",
    status: "Sent",
  });

  const sentCount = notifications.filter(
    (item) => item.status === "Sent"
  ).length;

  const scheduledCount = notifications.filter(
    (item) => item.status === "Scheduled"
  ).length;

  const draftCount = notifications.filter(
    (item) => item.status === "Draft"
  ).length;

  const filteredNotifications = notifications.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.message.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      title: "Total Notifications",
      value: notifications.length,
      icon: Bell,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Sent Notifications",
      value: sentCount,
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Scheduled",
      value: scheduledCount,
      icon: Clock,
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "Drafts",
      value: draftCount,
      icon: FileText,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const getTypeStyle = (type) => {
    const styles = {
      Announcement: "bg-blue-100 text-blue-700",
      Warning: "bg-red-100 text-red-700",
      Offer: "bg-purple-100 text-purple-700",
      General: "bg-slate-100 text-slate-700",
    };

    return styles[type] || styles.General;
  };

  const getStatusStyle = (status) => {
    const styles = {
      Sent: "bg-green-100 text-green-700",
      Scheduled: "bg-amber-100 text-amber-700",
      Draft: "bg-slate-100 text-slate-700",
    };

    return styles[status] || styles.Draft;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNotification = {
      id: Date.now(),
      ...form,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      read: false,
    };

    setNotifications((prev) => [newNotification, ...prev]);

    setForm({
      title: "",
      message: "",
      type: "General",
      audience: "All Shop Owners",
      status: "Sent",
    });

    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this notification?")) {
      setNotifications((prev) =>
        prev.filter((item) => item.id !== id)
      );
    }
  };

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const getTypeIcon = (type) => {
    if (type === "Announcement") return Megaphone;
    if (type === "Warning") return AlertTriangle;
    if (type === "Offer") return Gift;
    return Info;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Notifications
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Send announcements and important updates to shop owners.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition"
          >
            <Plus size={18} />
            Create Notification
          </button>
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

        {/* Notifications List */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

          {/* Search and Filter */}
          <div className="p-4 sm:p-5 border-b border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  All Notifications
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {filteredNotifications.length} notifications found
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
                    placeholder="Search notifications..."
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
                  <option value="Sent">Sent</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notification Items */}
          <div className="divide-y divide-slate-100">
            {filteredNotifications.map((item) => {
              const TypeIcon = getTypeIcon(item.type);

              return (
                <div
                  key={item.id}
                  className={`p-4 sm:p-5 hover:bg-slate-50 transition ${
                    !item.read && item.status === "Sent" ? "bg-blue-50/30" : ""
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex gap-3 min-w-0">
                      <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                        <TypeIcon size={21} />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-slate-800">
                            {item.title}
                          </h3>

                          {!item.read && item.status === "Sent" && (
                            <span className="w-2 h-2 rounded-full bg-blue-600" />
                          )}
                        </div>

                        <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                          {item.message}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getTypeStyle(item.type)}`}>
                            {item.type}
                          </span>

                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(item.status)}`}>
                            {item.status}
                          </span>

                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Users size={13} />
                            {item.audience}
                          </span>

                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <CalendarDays size={13} />
                            {item.date}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:shrink-0">
                      <button
                        onClick={() => setSelectedNotification(item)}
                        title="View Details"
                        className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                      >
                        <Eye size={17} />
                      </button>

                      {item.status === "Sent" && !item.read && (
                        <button
                          onClick={() => handleMarkAsRead(item.id)}
                          className="px-3 py-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 text-xs font-medium"
                        >
                          Mark Read
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(item.id)}
                        title="Delete"
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredNotifications.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                No notifications found.
              </div>
            )}
          </div>
        </div>

        {/* Create Notification Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">

              <div className="flex items-center justify-between p-5 border-b">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">
                    Create Notification
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Send an update to your shop owners.
                  </p>
                </div>

                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-5 space-y-4">

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Notification Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter notification title"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Write your notification message..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Notification Type
                    </label>
                    <select
                      value={form.type}
                      onChange={(e) =>
                        setForm({ ...form, type: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded-lg px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="General">General</option>
                      <option value="Announcement">Announcement</option>
                      <option value="Warning">Warning</option>
                      <option value="Offer">Offer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Send To
                    </label>
                    <select
                      value={form.audience}
                      onChange={(e) =>
                        setForm({ ...form, audience: e.target.value })
                      }
                      className="w-full border border-slate-200 rounded-lg px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="All Shop Owners">All Shop Owners</option>
                      <option value="Selected Owners">Selected Owners</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Notification Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                    className="w-full border border-slate-200 rounded-lg px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="Sent">Send Now</option>
                    <option value="Draft">Save as Draft</option>
                    <option value="Scheduled">Schedule (demo)</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 border border-slate-200 text-slate-700 py-3 rounded-lg text-sm font-semibold hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-semibold"
                  >
                    <Send size={17} />
                    Create Notification
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Notification Details Modal */}
        {selectedNotification && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b">
                <h2 className="text-lg font-bold text-slate-800">
                  Notification Details
                </h2>

                <button
                  onClick={() => setSelectedNotification(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-5 space-y-4">
                <h3 className="text-xl font-bold text-slate-800">
                  {selectedNotification.title}
                </h3>

                <p className="text-sm text-slate-600 leading-6">
                  {selectedNotification.message}
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeStyle(selectedNotification.type)}`}>
                    {selectedNotification.type}
                  </span>

                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(selectedNotification.status)}`}>
                    {selectedNotification.status}
                  </span>
                </div>

                <div className="border-t pt-4 space-y-3 text-sm text-slate-600">
                  <div className="flex justify-between gap-2">
                    <span>Audience</span>
                    <span className="font-medium text-slate-800">
                      {selectedNotification.audience}
                    </span>
                  </div>

                  <div className="flex justify-between gap-2">
                    <span>Date</span>
                    <span className="font-medium text-slate-800">
                      {selectedNotification.date}
                    </span>
                  </div>

                  <div className="flex justify-between gap-2">
                    <span>Read Status</span>
                    <span className="font-medium text-slate-800">
                      {selectedNotification.read ? "Read" : "Unread"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default Notifications;
