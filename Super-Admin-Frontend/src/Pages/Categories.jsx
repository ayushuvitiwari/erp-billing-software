
import { useState } from "react";
import DashboardLayout from "../Components/DashboardLayout";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  FolderOpen,
  CheckCircle,
  XCircle,
  Package,
  Eye,
} from "lucide-react";

const Categories = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Grocery",
      description: "Grocery and daily essentials shops",
      shops: 25,
      status: "Active",
    },
    {
      id: 2,
      name: "Electronics",
      description: "Electronic items and accessories shops",
      shops: 18,
      status: "Active",
    },
    {
      id: 3,
      name: "Clothing",
      description: "Fashion and clothing stores",
      shops: 12,
      status: "Active",
    },
    {
      id: 4,
      name: "Medical",
      description: "Medical and pharmacy stores",
      shops: 8,
      status: "Inactive",
    },
    {
      id: 5,
      name: "Hardware",
      description: "Hardware and building material shops",
      shops: 6,
      status: "Active",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const activeCount = categories.filter(
    (item) => item.status === "Active"
  ).length;

  const inactiveCount = categories.filter(
    (item) => item.status === "Inactive"
  ).length;

  const filteredCategories = categories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => {
    setForm({ name: "", description: "" });
    setEditCategory(null);
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) return;

    if (editCategory) {
      setCategories((prev) =>
        prev.map((item) =>
          item.id === editCategory.id
            ? { ...item, ...form }
            : item
        )
      );
    } else {
      setCategories((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: form.name.trim(),
          description: form.description.trim(),
          shops: 0,
          status: "Active",
        },
      ]);
    }

    resetForm();
  };

  const handleEdit = (category) => {
    setEditCategory(category);
    setForm({
      name: category.name,
      description: category.description,
    });
    setShowModal(true);
  };

  const handleStatusChange = (id) => {
    setCategories((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Active" ? "Inactive" : "Active",
            }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const stats = [
    {
      title: "Total Categories",
      value: categories.length,
      icon: FolderOpen,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active Categories",
      value: activeCount,
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Inactive Categories",
      value: inactiveCount,
      icon: XCircle,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Total Shops",
      value: categories.reduce((total, item) => total + item.shops, 0),
      icon: Package,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Categories
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage business categories available on your platform.
            </p>
          </div>

          <button
            onClick={() => {
              setEditCategory(null);
              setForm({ name: "", description: "" });
              setShowModal(true);
            }}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition"
          >
            <Plus size={18} />
            Add Category
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

        {/* Categories Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

          <div className="p-4 sm:p-5 border-b border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  All Categories
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {filteredCategories.length} categories found
                </p>
              </div>

              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search category..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-72 pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead className="bg-slate-50">
                <tr className="text-xs uppercase text-slate-500">
                  <th className="px-5 py-4 font-semibold">Category</th>
                  <th className="px-5 py-4 font-semibold">Description</th>
                  <th className="px-5 py-4 font-semibold">Total Shops</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-slate-50 transition">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                          <FolderOpen size={20} />
                        </div>
                        <span className="text-sm font-semibold text-slate-800">
                          {category.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {category.description}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-700">
                      {category.shops}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          category.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {category.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(category)}
                          title="Edit Category"
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() => handleStatusChange(category.id)}
                          title="Change Status"
                          className="px-3 py-2 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 text-xs font-medium"
                        >
                          {category.status === "Active" ? "Disable" : "Enable"}
                        </button>

                        <button
                          onClick={() => handleDelete(category.id)}
                          title="Delete Category"
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredCategories.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-12 text-slate-500">
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add / Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">

              <div className="flex items-center justify-between p-5 border-b">
                <h2 className="text-lg font-bold text-slate-800">
                  {editCategory ? "Edit Category" : "Add New Category"}
                </h2>

                <button
                  onClick={resetForm}
                  className="p-2 hover:bg-slate-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter category name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Enter category description"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 border border-slate-200 text-slate-700 py-3 rounded-lg text-sm font-semibold hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-semibold"
                  >
                    {editCategory ? "Update Category" : "Save Category"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default Categories;
