
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import AllShops from './Pages/AllShop';
import AddShop from './Pages/AddShop';
import ShopOwners from './Pages/ShopOwners';
import Subscriptions from './Pages/Subscriptions';
import Payments from './Pages/Payments';
import Categories from './Pages/Categories';
import Notifications from './Pages/Notifications';
import Support from './Pages/Support';
import Profile from './Pages/Profile';
import Settings from './Pages/Settings';

const App = () => {
    return (
        <Router>
            <Routes>

                {/* Login */}
                <Route path="/" element={<Login />} />

                {/* Dashboard */}
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Shop Management */}
                <Route path="/shops" element={<AllShops />} />
                <Route path="/add-shop" element={<AddShop />} />
                <Route path="/owners" element={<ShopOwners />} />

                {/* Business Management */}
                <Route path="/subscriptions" element={<Subscriptions />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/categories" element={<Categories />} />

                {/* Communication */}
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/support" element={<Support />} />

                {/* Account */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />

            </Routes>
        </Router>
    );
};

export default App;
