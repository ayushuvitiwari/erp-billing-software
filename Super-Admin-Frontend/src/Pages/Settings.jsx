
import { useState } from "react";
import DashboardLayout from "../Components/DashboardLayout";
import {
  Settings as SettingsIcon,
  Store,
  Bell,
  ShieldCheck,
  CreditCard,
  Globe,
  Mail,
  Phone,
  MapPin,
  LockKeyhole,
  Save,
  Wrench,
  Smartphone,
  AlertTriangle,
} from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("General");

  const [settings, setSettings] = useState({
    platformName: "MultiShop Billing",
    email: "admin@example.com",
    phone: "+91 9876543210",
    address: "Lucknow, Uttar Pradesh, India",
    currency: "INR (₹)",
    timezone: "Asia/Kolkata",
    emailNotifications: true,
    newShopAlerts: true,
    paymentAlerts: true,
    supportAlerts: true,
    twoFactor: false,
    maintenance: false,
    autoRenewal: true,
    trialPeriod: "7",
  });

  const tabs = [
    { name: "General", icon: SettingsIcon },
    { name: "Platform", icon: Store },
    { name: "Notifications", icon: Bell },
    { name: "Security", icon: ShieldCheck },
    { name: "Subscription", icon: CreditCard },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    alert("Settings UI ready. Backend integration pending.");
  };

  const Toggle = ({ name, title, description }) => (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-slate-100 last:border-0">
      <div>
        <p className="text-sm font-semibold text-slate-700">{title}</p>
        <p className="text-xs text-slate-400 mt-1">{description}</p>
      </div>

      <label className="relative inline-flex items-center cursor-pointer shrink-0">
        <input
          type="checkbox"
          name={name}
          checked={settings[name]}
          onChange={handleChange}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
      </label>
    </div>
  );

  const InputField = ({ label, name, icon: Icon, type = "text" }) => (
    <div>
      <label className="block text-sm font-medium text-slate-600 mb-2">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}
        <input
          type={type}
          name={name}
          value={settings[name]}
          onChange={handleChange}
          className={`w-full ${Icon ? "pl-10" : "px-4"} pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500`}
        />
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your platform preferences and configurations.
          </p>
        </div>

        {/* Settings Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Sidebar Tabs */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-3 h-fit">
            <h3 className="text-xs font-bold text-slate-400 uppercase px-3 py-3">
              Settings Menu
            </h3>

            <div className="flex lg:flex-col gap-2 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;

                return (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition ${
                      activeTab === tab.name
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon size={18} />
                    {tab.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3 bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">

            <div className="p-5 sm:p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">
                {activeTab} Settings
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Configure your {activeTab.toLowerCase()} preferences.
              </p>
            </div>

            <div className="p-5 sm:p-6">

              {/* General Settings */}
              {activeTab === "General" && (
                <div className="space-y-5">
                  <InputField
                    label="Platform Name"
                    name="platformName"
                    icon={Store}
                  />

                  <InputField
                    label="Admin Email"
                    name="email"
                    icon={Mail}
                    type="email"
                  />

                  <InputField
                    label="Contact Number"
                    name="phone"
                    icon={Phone}
                  />

                  <InputField
                    label="Platform Address"
                    name="address"
                    icon={MapPin}
                  />
                </div>
              )}

              {/* Platform Settings */}
              {activeTab === "Platform" && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">
                      Default Currency
                    </label>
                    <select
                      name="currency"
                      value={settings.currency}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500"
                    >
                      <option>INR (₹)</option>
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">
                      Time Zone
                    </label>
                    <select
                      name="timezone"
                      value={settings.timezone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500"
                    >
                      <option value="Asia/Kolkata">
                        India Standard Time (IST)
                      </option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl">
                    <Globe size={22} className="text-amber-600" />
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        Platform Configuration
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        These settings apply to the overall billing platform.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 border border-red-100 rounded-xl">
                    <Toggle
                      name="maintenance"
                      title="Maintenance Mode"
                      description="Enable this to temporarily restrict platform access."
                    />
                    {settings.maintenance && (
                      <p className="text-xs text-red-600 mt-2">
                        Maintenance mode is enabled in the current UI state.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === "Notifications" && (
                <div>
                  <Toggle
                    name="emailNotifications"
                    title="Email Notifications"
                    description="Receive important platform updates through email."
                  />

                  <Toggle
                    name="newShopAlerts"
                    title="New Shop Registration"
                    description="Get notified whenever a new shop owner registers."
                  />

                  <Toggle
                    name="paymentAlerts"
                    title="Payment Notifications"
                    description="Receive alerts for successful and failed payments."
                  />

                  <Toggle
                    name="supportAlerts"
                    title="Support Ticket Alerts"
                    description="Get notifications for new support tickets."
                  />
                </div>
              )}

              {/* Security Settings */}
              {activeTab === "Security" && (
                <div className="space-y-5">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                    <ShieldCheck size={25} className="text-blue-600" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Account Security
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Manage security preferences for administrator access.
                      </p>
                    </div>
                  </div>

                  <Toggle
                    name="twoFactor"
                    title="Two-Factor Authentication"
                    description="Add an additional verification step to admin login."
                  />

                  <div className="border border-slate-100 rounded-xl p-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        Change Password
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Update your administrator account password.
                      </p>
                    </div>
                    <button
                      onClick={() => alert("Connect password update API here.")}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold"
                    >
                      <LockKeyhole size={15} />
                      Update
                    </button>
                  </div>
                </div>
              )}

              {/* Subscription Settings */}
              {activeTab === "Subscription" && (
                <div className="space-y-5">
                  <div className="p-4 bg-blue-50 rounded-xl flex items-center gap-3">
                    <CreditCard size={25} className="text-blue-600" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Subscription Configuration
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Configure default subscription rules for shop owners.
                      </p>
                    </div>
                  </div>

                  <Toggle
                    name="autoRenewal"
                    title="Auto Renewal"
                    description="Allow automatic renewal for eligible subscriptions."
                  />

                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">
                      Free Trial Period (Days)
                    </label>
                    <input
                      type="number"
                      min="0"
                      name="trialPeriod"
                      value={settings.trialPeriod}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

            </div>

            {/* Save Button */}
            <div className="p-5 sm:p-6 border-t border-slate-100 flex justify-end">
              <button
                onClick={handleSave}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
              >
                <Save size={17} />
                Save Changes
              </button>
            </div>

          </div>
        </div>

        {/* Warning Section */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-2xl p-4">
          <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-amber-800">
              Important Information
            </h3>
            <p className="text-xs text-amber-700 mt-1 leading-5">
              Platform settings affect all registered shops. Make sure to
              review your changes before applying them.
            </p>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Settings;
