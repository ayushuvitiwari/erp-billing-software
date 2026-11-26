import { useState } from 'react'
import BottomNavbar from '../Components/BottomNavbar'
import {
  Search,
  Receipt,
  IndianRupee,
  CheckCircle2,
  Clock,
  CalendarDays,
  Filter,
  ChevronDown,
  Eye,
  Printer,
  XCircle,
  X,
  UserRound,
  Phone,
  Package,
  CreditCard,
  ArrowUpRight
} from 'lucide-react'

const History = () => {

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [dateFilter, setDateFilter] = useState('All')
  const [selectedBill, setSelectedBill] = useState(null)
  const [bills, setBills] = useState([
    {
      id: 'INV-1001',
      customer: 'Rahul Sharma',
      mobile: '9876543210',
      date: '2026-11-26',
      time: '10:45 AM',
      items: [
        { name: 'Wireless Headphones', quantity: 2, price: 1299 },
        { name: 'Smart Watch', quantity: 1, price: 2499 }
      ],
      subtotal: 5097,
      discount: 100,
      gst: 249.85,
      total: 5246.85,
      payment: 'UPI',
      status: 'Paid'
    },
    {
      id: 'INV-1002',
      customer: 'Amit Verma',
      mobile: '9876543211',
      date: '2026-11-26',
      time: '11:20 AM',
      items: [
        { name: 'Running Shoes', quantity: 1, price: 1799 },
        { name: 'Cotton T-Shirt', quantity: 2, price: 599 }
      ],
      subtotal: 2997,
      discount: 0,
      gst: 149.85,
      total: 3146.85,
      payment: 'Cash',
      status: 'Paid'
    },
    {
      id: 'INV-1003',
      customer: 'Priya Singh',
      mobile: '9876543212',
      date: '2026-11-25',
      time: '02:15 PM',
      items: [
        { name: 'Travel Bag', quantity: 1, price: 999 }
      ],
      subtotal: 999,
      discount: 0,
      gst: 49.95,
      total: 1048.95,
      payment: 'Card',
      status: 'Pending'
    },
    {
      id: 'INV-1004',
      customer: 'Rohit Kumar',
      mobile: '9876543213',
      date: '2026-11-24',
      time: '04:30 PM',
      items: [
        { name: 'Bluetooth Speaker', quantity: 1, price: 999 },
        { name: 'Wallet', quantity: 1, price: 499 }
      ],
      subtotal: 1498,
      discount: 50,
      gst: 72.4,
      total: 1520.4,
      payment: 'UPI',
      status: 'Paid'
    },
    {
      id: 'INV-1005',
      customer: 'Neha Gupta',
      mobile: '9876543214',
      date: '2026-11-23',
      time: '12:10 PM',
      items: [
        { name: 'Sunglasses', quantity: 1, price: 799 }
      ],
      subtotal: 799,
      discount: 0,
      gst: 39.95,
      total: 838.95,
      payment: 'Cash',
      status: 'Pending'
    }
  ])

  const formatPrice = (amount) =>
    `₹${Number(amount).toLocaleString('en-IN', {
      maximumFractionDigits: 2
    })}`

  // Date Filtering
  const filteredBills = bills.filter(bill => {

    const matchesSearch =
      bill.id.toLowerCase().includes(search.toLowerCase()) ||
      bill.customer.toLowerCase().includes(search.toLowerCase()) ||
      bill.mobile.includes(search)

    const matchesStatus =
      status === 'All' || bill.status === status

    const today = new Date().toISOString().split('T')[0]

    const matchesDate =
      dateFilter === 'All' ||
      (dateFilter === 'Today' && bill.date === today) ||
      (dateFilter === 'This Month' &&
        bill.date.slice(0, 7) === today.slice(0, 7))

    return matchesSearch && matchesStatus && matchesDate
  })

  // Statistics
  const totalSales = bills
    .filter(b => b.status === 'Paid')
    .reduce((sum, bill) => sum + bill.total, 0)

  const paidBills = bills.filter(b => b.status === 'Paid').length

  const pendingBills = bills.filter(b => b.status === 'Pending').length

  const cancelBill = (id) => {
    const confirmCancel = window.confirm(
      'Are you sure you want to cancel this bill?'
    )

    if (confirmCancel) {
      setBills(prev => prev.map(bill =>
        bill.id === id
          ? { ...bill, status: 'Cancelled' }
          : bill
      ))

      setSelectedBill(null)
    }
  }

  const handlePrint = (bill) => {
    setSelectedBill(bill)

    setTimeout(() => {
      window.print()
    }, 300)
  }

  const stats = [
    {
      title: 'Total Bills',
      value: bills.length,
      icon: Receipt,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Total Sales',
      value: formatPrice(totalSales),
      icon: IndianRupee,
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Paid Bills',
      value: paidBills,
      icon: CheckCircle2,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Pending Bills',
      value: pendingBills,
      icon: Clock,
      color: 'bg-orange-50 text-orange-600'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 pb-24">

      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">

          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
              Billing History
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Manage your shop transactions
            </p>
          </div>

          <div className="bg-blue-50 text-blue-600 p-3 rounded-xl">
            <Receipt size={22} />
          </div>

        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-5">

        {/* Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">

          {stats.map((item, index) => {
            const Icon = item.icon

            return (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-xl p-3 sm:p-4"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${item.color}`}>
                  <Icon size={19} />
                </div>

                <p className="text-[10px] sm:text-xs text-gray-500 mt-3">
                  {item.title}
                </p>

                <h2 className="text-lg sm:text-xl font-bold text-slate-800 mt-1 break-all">
                  {item.value}
                </h2>
              </div>
            )
          })}

        </div>

        {/* Search and Filters */}
        <div className="bg-white border border-gray-100 rounded-2xl p-3 sm:p-4 mb-5">

          <div className="relative mb-3">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search invoice, customer or mobile..."
              className="w-full bg-slate-50 border border-gray-200 rounded-xl pl-10 pr-3 py-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">

            <div className="relative">
              <Filter
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />

              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-gray-200 rounded-lg pl-9 pr-7 py-3 text-xs outline-none"
              >
                <option value="All">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
            </div>

            <div className="relative">
              <CalendarDays
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />

              <select
                value={dateFilter}
                onChange={e => setDateFilter(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-gray-200 rounded-lg pl-9 pr-7 py-3 text-xs outline-none"
              >
                <option value="All">All Dates</option>
                <option value="Today">Today</option>
                <option value="This Month">This Month</option>
              </select>

              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
            </div>

          </div>
        </div>

        {/* Bills List */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">

          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h2 className="font-bold text-slate-800">
                All Transactions
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                {filteredBills.length} bills found
              </p>
            </div>

            <span className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-semibold">
              {filteredBills.length} Results
            </span>
          </div>

          <div className="divide-y divide-gray-100">

            {filteredBills.length > 0 ? (

              filteredBills.map(bill => (

                <div key={bill.id} className="p-4">

                  <div className="flex items-start justify-between gap-3">

                    <div className="flex items-center gap-3 min-w-0">

                      <div className="w-11 h-11 shrink-0 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                        <Receipt size={21} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-slate-800">
                          {bill.customer}
                        </h3>

                        <p className="text-[10px] text-gray-400 mt-1">
                          {bill.id}
                        </p>

                        <p className="text-[10px] text-gray-400 mt-1">
                          {bill.date} • {bill.time}
                        </p>
                      </div>

                    </div>

                    <div className="text-right shrink-0">

                      <p className="text-sm font-bold text-slate-800">
                        {formatPrice(bill.total)}
                      </p>

                      <span className={`inline-block mt-2 text-[10px] font-semibold px-2 py-1 rounded-md ${
                        bill.status === 'Paid'
                          ? 'bg-green-50 text-green-600'
                          : bill.status === 'Pending'
                            ? 'bg-orange-50 text-orange-600'
                            : 'bg-red-50 text-red-600'
                      }`}>
                        {bill.status}
                      </span>

                    </div>

                  </div>

                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">

                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <CreditCard size={14} />
                      {bill.payment}
                    </div>

                    <div className="flex items-center gap-1">

                      <button
                        onClick={() => setSelectedBill(bill)}
                        className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 text-xs font-semibold"
                      >
                        <Eye size={14} />
                        View
                      </button>

                      <button
                        onClick={() => handlePrint(bill)}
                        className="p-2 rounded-lg bg-slate-100 text-gray-600"
                        title="Print Bill"
                      >
                        <Printer size={15} />
                      </button>

                      {bill.status !== 'Cancelled' && (
                        <button
                          onClick={() => cancelBill(bill.id)}
                          className="p-2 rounded-lg bg-red-50 text-red-500"
                          title="Cancel Bill"
                        >
                          <XCircle size={15} />
                        </button>
                      )}

                    </div>

                  </div>

                </div>

              ))

            ) : (

              <div className="py-14 text-center">
                <Receipt size={35} className="mx-auto text-gray-300" />
                <h3 className="font-semibold text-gray-600 mt-3">
                  No Bills Found
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Try changing your search or filters.
                </p>
              </div>

            )}

          </div>

        </div>

      </main>

      {/* Bill Details Modal */}
      {selectedBill && (

        <div className="fixed inset-0 z-[60] bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4">

          <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto">

            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="font-bold text-slate-800">
                  Bill Details
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  {selectedBill.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedBill(null)}
                className="p-2 rounded-lg bg-slate-100 text-gray-500"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5">

              <div className="text-center pb-4 border-b border-dashed border-gray-200">
                <h3 className="text-lg font-bold text-slate-800">
                  Ayush Store
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Tax Invoice
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {selectedBill.date} • {selectedBill.time}
                </p>
              </div>

              <div className="py-4 space-y-2 border-b border-dashed border-gray-200">

                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <UserRound size={16} className="text-blue-600" />
                  {selectedBill.customer}
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Phone size={14} />
                  {selectedBill.mobile}
                </div>

              </div>

              <div className="py-4 border-b border-dashed border-gray-200">

                <h3 className="text-sm font-bold text-slate-800 mb-3">
                  Purchased Items
                </h3>

                {selectedBill.items.map((item, index) => (
                  <div key={index} className="flex justify-between gap-3 mb-3">

                    <div className="flex items-center gap-2 min-w-0">
                      <Package size={16} className="text-gray-400 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-slate-800">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          {formatPrice(item.price)} × {item.quantity}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs font-bold text-slate-800 shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </p>

                  </div>
                ))}

              </div>

              <div className="py-4 space-y-3 border-b border-dashed border-gray-200 text-sm">

                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{formatPrice(selectedBill.subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Discount</span>
                  <span>{formatPrice(selectedBill.discount)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">GST</span>
                  <span>{formatPrice(selectedBill.gst)}</span>
                </div>

                <div className="flex justify-between font-bold text-base pt-2">
                  <span>Grand Total</span>
                  <span className="text-blue-600">
                    {formatPrice(selectedBill.total)}
                  </span>
                </div>

              </div>

              <div className="flex justify-between items-center py-4">
                <span className="text-sm text-gray-500">
                  Payment Method
                </span>
                <span className="text-sm font-semibold">
                  {selectedBill.payment}
                </span>
              </div>

              <div className="flex gap-2">

                <button
                  onClick={() => handlePrint(selectedBill)}
                  className="flex-1 bg-blue-600 text-white rounded-xl py-3 flex justify-center items-center gap-2 text-sm font-semibold"
                >
                  <Printer size={16} />
                  Print Bill
                </button>

                <button
                  onClick={() => setSelectedBill(null)}
                  className="flex-1 bg-slate-100 text-gray-700 rounded-xl py-3 text-sm font-semibold"
                >
                  Close
                </button>

              </div>

            </div>
          </div>
        </div>
      )}

      <BottomNavbar />

    </div>
  )
}

export default History
