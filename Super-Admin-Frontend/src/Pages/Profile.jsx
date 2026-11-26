
import { useState } from "react";
import DashboardLayout from "../Components/DashboardLayout";
import {
  UserRound,
  Mail,
  Phone,
  ShieldCheck,
  MapPin,
  CalendarDays,
  Camera,
  Edit,
  Save,
  LockKeyhole,
  Eye,
  EyeOff,
  Settings,
  BadgeCheck,
} from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [profile, setProfile] = useState({
    name: "Ayush Tiwari",
    email: "admin@example.com",
    phone: "+91 9876543210",
    address: "Lucknow, Uttar Pradesh, India",
    role: "Super Admin",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (password.new !== password.confirm) {
      alert("New password and confirm password do not match!");
      return;
    }

    if (!password.current || !password.new) {
      alert("Please fill all password fields.");
      return;
    }

    alert("Password UI ready. Backend integration pending.");
    setPassword({ current: "", new: "", confirm: "" });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-6">

        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            My Profile
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your personal information and account settings.
          </p>
        </div>

        {/* Profile Overview */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">

          <div className="h-36 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600" />

          <div className="px-5 sm:px-8 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12">

              <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-md">
                  <div className="w-full h-full rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <UserRound size={42} />
                  </div>
                </div>

                <div className="pb-1">
                  <h2 className="text-xl font-bold text-slate-800">
                    {profile.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <BadgeCheck size={16} className="text-blue-600" />
                    <span className="text-sm text-slate-500">
                      {profile.role}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
              >
                {isEditing ? <Save size={17} /> : <Edit size={17} />}
                {isEditing ? "Save Profile" : "Edit Profile"}
              </button>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-7 pt-6 border-t border-slate-100">

              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Account Type</p>
                  <p className="text-sm font-semibold text-slate-700">
                    Super Admin
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                  <BadgeCheck size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Account Status</p>
                  <p className="text-sm font-semibold text-green-600">
                    Active
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                  <CalendarDays size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Member Since</p>
                  <p className="text-sm font-semibold text-slate-700">
                    November 2026
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          <div className="xl:col-span-2 bg-white border border-slate-100 rounded-2xl shadow-sm p-5 sm:p-6">

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <UserRound size={20} />
              </div>
              <div>
                <h2 className="font-bold text-slate-800">
                  Personal Information
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Your basic account information.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <div>
                <label className="text-sm font-medium text-slate-600">
                  Full Name
                </label>
                <div className="relative mt-2">
                  <UserRound size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600">
                  Email Address
                </label>
                <div className="relative mt-2">
                  <Mail size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600">
                  Phone Number
                </label>
                <div className="relative mt-2">
                  <Phone size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600">
                  Role
                </label>
                <div className="relative mt-2">
                  <ShieldCheck size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={profile.role}
                    disabled
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 text-slate-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-slate-600">
                  Address
                </label>
                <div className="relative mt-2">
                  <MapPin size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-500"
                  />
                </div>
              </div>

            </div>

            {isEditing && (
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            )}

          </div>

          {/* Account Security */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5 sm:p-6">

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                <LockKeyhole size={20} />
              </div>
              <div>
                <h2 className="font-bold text-slate-800">
                  Security
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Protect your account.
                </p>
              </div>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">

              {[
                { name: "current", label: "Current Password" },
                { name: "new", label: "New Password" },
                { name: "confirm", label: "Confirm Password" },
              ].map((item) => (
                <div key={item.name}>
                  <label className="text-sm font-medium text-slate-600">
                    {item.label}
                  </label>
                  <div className="relative mt-2">
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      value={password[item.name]}
                      onChange={(e) =>
                        setPassword({
                          ...password,
                          [item.name]: e.target.value,
                        })
                      }
                      placeholder={`Enter ${item.label.toLowerCase()}`}
                      className="w-full px-4 pr-11 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
              >
                <LockKeyhole size={17} />
                Update Password
              </button>

            </form>
          </div>

        </div>

        {/* Account Settings */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <Settings size={20} />
            </div>
            <div>
              <h2 className="font-bold text-slate-800">
                Account Settings
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Manage your account preferences.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100 pt-5">
            <div>
              <p className="text-sm font-semibold text-slate-700">
                Administrator Access
              </p>
              <p className="text-xs text-slate-400 mt-1">
                You have full access to manage shops, owners and subscriptions.
              </p>
            </div>
            <span className="px-3 py-2 bg-green-50 text-green-600 text-xs font-semibold rounded-lg w-fit">
              Active
            </span>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Profile;
