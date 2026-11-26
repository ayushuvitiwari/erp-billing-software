import { useState } from "react";
import BottomNavbar from "../Components/BottomNavbar";
import { User, Store, Phone, Mail, MapPin, Clock, FileText, Lock, LogOut, Edit, X, Save, ShieldCheck,} from "lucide-react";

const Profile = () => {
    const [editMode, setEditMode] = useState(false);

    const [shopData, setShopData] = useState({
        ownerName: "Ayush Tiwari",
        shopName: "Ayush Store",
        email: "ayush@gmail.com",
        mobile: "9876543210",
        address: "Lucknow, Uttar Pradesh",
        gstNumber: "09ABCDE1234F1Z5",
        openingTime: "09:00 AM",
        closingTime: "09:00 PM",
    });

    const handleChange = (e) => {
        setShopData({
            ...shopData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {
        setEditMode(false);
        alert("Profile updated successfully!");
    };

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
    };

    const InfoItem = ({ icon: Icon, label, value, name }) => (
        <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
            <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                <Icon size={19} />
            </div>

            <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-500">{label}</p>

                {editMode ? (
                    <input
                        type="text"
                        name={name}
                        value={value}
                        onChange={handleChange}
                        className="mt-1 w-full border-b border-slate-300 bg-transparent py-1 text-sm font-semibold outline-none focus:border-blue-600"
                    />
                ) : (
                    <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                        {value}
                    </p>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-100 px-4 pb-28 pt-5 sm:px-6">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800">
                    My Profile
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Manage your personal and shop information
                </p>
            </div>

            {/* Profile Card */}
            <div className="mb-5 overflow-hidden rounded-2xl bg-white shadow-sm">

                <div className="h-24 bg-gradient-to-r from-blue-700 to-indigo-600"></div>

                <div className="px-5 pb-5">
                    <div className="-mt-11 flex items-end justify-between">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-blue-100 text-blue-700">
                            <User size={38} />
                        </div>

                        <button
                            onClick={() => setEditMode(!editMode)}
                            className="mb-1 flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                            {editMode ? <X size={16} /> : <Edit size={16} />}
                            {editMode ? "Cancel" : "Edit"}
                        </button>
                    </div>

                    <h2 className="mt-3 text-xl font-bold text-slate-800">
                        {shopData.ownerName}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Shop Owner
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                        <ShieldCheck size={17} />
                        <span>Account Active</span>
                    </div>
                </div>
            </div>

            {/* Personal Information */}
            <div className="mb-5 rounded-2xl bg-white p-5 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-800">
                    <User size={19} className="text-blue-600" />
                    Personal Information
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <InfoItem
                        icon={User}
                        label="Owner Name"
                        value={shopData.ownerName}
                        name="ownerName"
                    />

                    <InfoItem
                        icon={Phone}
                        label="Mobile Number"
                        value={shopData.mobile}
                        name="mobile"
                    />

                    <InfoItem
                        icon={Mail}
                        label="Email Address"
                        value={shopData.email}
                        name="email"
                    />

                    <InfoItem
                        icon={MapPin}
                        label="Address"
                        value={shopData.address}
                        name="address"
                    />
                </div>
            </div>

            {/* Shop Information */}
            <div className="mb-5 rounded-2xl bg-white p-5 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-800">
                    <Store size={19} className="text-blue-600" />
                    Shop Information
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <InfoItem
                        icon={Store}
                        label="Shop Name"
                        value={shopData.shopName}
                        name="shopName"
                    />

                    <InfoItem
                        icon={FileText}
                        label="GST Number"
                        value={shopData.gstNumber}
                        name="gstNumber"
                    />

                    <InfoItem
                        icon={Clock}
                        label="Opening Time"
                        value={shopData.openingTime}
                        name="openingTime"
                    />

                    <InfoItem
                        icon={Clock}
                        label="Closing Time"
                        value={shopData.closingTime}
                        name="closingTime"
                    />
                </div>
            </div>

            {/* Save Button */}
            {editMode && (
                <button
                    onClick={handleSave}
                    className="mb-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
                >
                    <Save size={18} />
                    Save Changes
                </button>
            )}

            {/* Account Settings */}
            <div className="mb-5 rounded-2xl bg-white p-5 shadow-sm">
                <h3 className="mb-4 font-bold text-slate-800">
                    Account Settings
                </h3>

                <button className="flex w-full items-center justify-between border-b border-slate-100 py-4 text-left">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-orange-100 p-2 text-orange-600">
                            <Lock size={19} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-800">
                                Change Password
                            </p>
                            <p className="text-xs text-slate-500">
                                Update your account password
                            </p>
                        </div>
                    </div>
                    <span className="text-slate-400">›</span>
                </button>

                <button
                    onClick={handleLogout}
                    className="mt-3 flex w-full items-center gap-3 rounded-xl bg-red-50 p-4 text-left text-red-600 hover:bg-red-100"
                >
                    <LogOut size={20} />
                    <span className="text-sm font-semibold">Logout</span>
                </button>
            </div>

            <p className="pb-3 text-center text-xs text-slate-400">
                Shop Management System
            </p>

            <BottomNavbar />
        </div>
    );
};

export default Profile;
