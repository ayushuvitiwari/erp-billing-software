
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  Receipt,
  History,
  UserRound
} from 'lucide-react'

const BottomNavbar = () => {

  const navItems = [
    { name: 'Home', path: '/shop/home', icon: LayoutDashboard },
    { name: 'Products', path: '/shop/products', icon: Package },
    { name: 'Billing', path: '/shop/billing', icon: Receipt },
    { name: 'History', path: '/shop/history', icon: History },
    { name: 'Profile', path: '/shop/profile', icon: UserRound }
  ]

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_15px_rgba(0,0,0,0.06)] z-50">

      <div className="max-w-3xl mx-auto flex items-center justify-around px-2 py-2">

        {navItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 w-full py-1 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-blue-600'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.5 : 2}
                  />

                  <span className={`text-xs font-medium ${
                    isActive ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          )
        })}

      </div>
    </div>
  )
}

export default BottomNavbar
