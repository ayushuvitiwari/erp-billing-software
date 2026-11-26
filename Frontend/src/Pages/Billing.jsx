import { useMemo, useState } from 'react'
import BottomNavbar from '../Components/BottomNavbar'
import {
  Search,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  Receipt,
  UserRound,
  Phone,
  CreditCard,
  Banknote,
  Smartphone,
  X,
  CheckCircle2,
  Package,
  ChevronDown
} from 'lucide-react'

const Billing = () => {

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [cart, setCart] = useState([])
  const [discount, setDiscount] = useState(0)
  const [gst, setGst] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState('Cash')
  const [showReceipt, setShowReceipt] = useState(false)
  const [generatedBill, setGeneratedBill] = useState(null)

  const [customer, setCustomer] = useState({
    name: '',
    mobile: ''
  })

  // Demo Products
  const products = [
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 1299, stock: 25 },
    { id: 2, name: 'Smart Watch', category: 'Electronics', price: 2499, stock: 8 },
    { id: 3, name: 'Bluetooth Speaker', category: 'Electronics', price: 999, stock: 15 },
    { id: 4, name: 'Running Shoes', category: 'Fashion', price: 1799, stock: 15 },
    { id: 5, name: 'Cotton T-Shirt', category: 'Fashion', price: 599, stock: 42 },
    { id: 6, name: 'Travel Bag', category: 'Accessories', price: 999, stock: 3 },
    { id: 7, name: 'Wallet', category: 'Accessories', price: 499, stock: 20 },
    { id: 8, name: 'Sunglasses', category: 'Accessories', price: 799, stock: 12 }
  ]

  const categories = ['All', 'Electronics', 'Fashion', 'Accessories']

  // Product Search and Category Filter
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === 'All' || product.category === category)
  )

  // Add Product to Cart
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)

      if (existing) {
        if (existing.quantity >= product.stock) return prev

        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...prev, { ...product, quantity: 1 }]
    })
  }

  // Change Product Quantity
  const updateQuantity = (id, amount) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(item.stock, item.quantity + amount)
            }
          : item
      ).filter(item => item.quantity > 0)
    )
  }

  // Remove Product
  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  // Billing Calculations
  const subtotal = useMemo(() =>
    cart.reduce((total, item) =>
      total + item.price * item.quantity, 0
    ), [cart])

  const discountAmount = Math.min(
    subtotal,
    Math.max(0, Number(discount) || 0)
  )

  const taxableAmount = subtotal - discountAmount

  const gstAmount = taxableAmount * (Math.max(0, Number(gst) || 0) / 100)

  const grandTotal = taxableAmount + gstAmount

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity, 0
  )

  // Generate Bill
  const handleGenerateBill = () => {

    if (cart.length === 0) {
      alert('Please add products to cart')
      return
    }

    if (customer.mobile && !/^[0-9]{10}$/.test(customer.mobile)) {
      alert('Please enter a valid 10 digit mobile number')
      return
    }

    const bill = {
      id: `INV-${Date.now().toString().slice(-6)}`,
      customer: { ...customer },
      items: cart.map(item => ({ ...item })),
      subtotal,
      discount: discountAmount,
      gst: gstAmount,
      total: grandTotal,
      paymentMethod,
      date: new Date().toLocaleString('en-IN')
    }

    setGeneratedBill(bill)
    setShowReceipt(true)
  }

  const closeReceipt = () => {
    setShowReceipt(false)
    setGeneratedBill(null)
    setCart([])
    setCustomer({ name: '', mobile: '' })
    setDiscount(0)
    setGst(0)
    setPaymentMethod('Cash')
  }

  const formatPrice = (amount) =>
    `₹${amount.toLocaleString('en-IN', {
      maximumFractionDigits: 2
    })}`

  return (
    <div className="min-h-screen bg-slate-50 pb-24">

      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
              New Billing
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Create and manage customer bills
            </p>
          </div>

          <div className="bg-blue-50 text-blue-600 p-3 rounded-xl">
            <Receipt size={22} />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 sm:px-6 py-5">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Left Side - Products */}
          <section className="lg:col-span-3">

            {/* Customer Details */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-5">

              <div className="flex items-center gap-2 mb-4">
                <UserRound size={19} className="text-blue-600" />
                <h2 className="font-bold text-slate-800">
                  Customer Details
                </h2>
                <span className="text-[10px] text-gray-400">
                  (Optional)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <div>
                  <label className="text-xs font-medium text-gray-500">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter customer name"
                    value={customer.name}
                    onChange={e => setCustomer({
                      ...customer,
                      name: e.target.value
                    })}
                    className="w-full mt-2 border border-gray-200 rounded-xl px-3 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500">
                    Mobile Number
                  </label>
                  <div className="relative mt-2">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="10 digit mobile number"
                      value={customer.mobile}
                      onChange={e => setCustomer({
                        ...customer,
                        mobile: e.target.value.replace(/\D/g, '').slice(0, 10)
                      })}
                      className="w-full border border-gray-200 rounded-xl pl-10 pr-3 py-3 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Product Selection */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4">

              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-bold text-slate-800">
                    Select Products
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Add products to customer cart
                  </p>
                </div>

                <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                  <Package size={19} />
                </div>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search product..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl pl-10 pr-3 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              {/* Categories */}
              <div className="flex gap-2 overflow-x-auto pb-3 mb-2">
                {categories.map(item => (
                  <button
                    key={item}
                    onClick={() => setCategory(item)}
                    className={`shrink-0 px-4 py-2 rounded-lg text-xs font-semibold transition ${
                      category === item
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-gray-600 hover:bg-blue-50'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

                {filteredProducts.map(product => {

                  const cartItem = cart.find(
                    item => item.id === product.id
                  )

                  const isOutOfStock = product.stock === 0
                  const isLimitReached = cartItem?.quantity >= product.stock

                  return (
                    <div
                      key={product.id}
                      className="border border-gray-100 rounded-xl p-3 hover:border-blue-200 transition"
                    >

                      <div className="w-full h-20 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Package size={30} className="text-blue-400" />
                      </div>

                      <h3 className="text-xs font-semibold text-slate-800 mt-3 line-clamp-2 min-h-8">
                        {product.name}
                      </h3>

                      <p className="text-[10px] text-gray-400 mt-1">
                        {product.category}
                      </p>

                      <div className="flex justify-between items-center mt-2 gap-1">
                        <span className="text-sm font-bold text-slate-800">
                          {formatPrice(product.price)}
                        </span>

                        <span className={`text-[9px] font-medium ${
                          product.stock <= 5
                            ? 'text-red-500'
                            : 'text-green-600'
                        }`}>
                          Stock: {product.stock}
                        </span>
                      </div>

                      <button
                        disabled={isOutOfStock || isLimitReached}
                        onClick={() => addToCart(product)}
                        className="w-full mt-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white disabled:bg-gray-100 disabled:text-gray-400 rounded-lg py-2 flex items-center justify-center gap-1 text-xs font-semibold transition"
                      >
                        <Plus size={15} />
                        {isOutOfStock
                          ? 'Out of Stock'
                          : isLimitReached
                            ? 'Limit Reached'
                            : 'Add to Cart'}
                      </button>

                    </div>
                  )
                })}

              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-10">
                  <Package size={32} className="mx-auto text-gray-300" />
                  <p className="text-sm text-gray-500 mt-2">
                    No products found
                  </p>
                </div>
              )}

            </div>
          </section>

          {/* Right Side - Cart */}
          <section className="lg:col-span-2">

            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden lg:sticky lg:top-4">

              {/* Cart Header */}
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <ShoppingCart size={19} className="text-blue-600" />
                  <h2 className="font-bold text-slate-800">
                    Current Cart
                  </h2>
                </div>

                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                  {totalItems} Items
                </span>
              </div>

              {/* Cart Items */}
              <div className="p-4 max-h-72 overflow-y-auto">

                {cart.length > 0 ? (

                  <div className="space-y-4">

                    {cart.map(item => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 border-b border-gray-100 pb-3"
                      >

                        <div className="w-10 h-10 shrink-0 bg-slate-100 rounded-lg flex items-center justify-center">
                          <Package size={19} className="text-gray-500" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-800 truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatPrice(item.price)}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 bg-slate-50 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 text-gray-500 hover:text-blue-600"
                          >
                            <Minus size={13} />
                          </button>

                          <span className="text-xs font-semibold w-5 text-center">
                            {item.quantity}
                          </span>

                          <button
                            disabled={item.quantity >= item.stock}
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 text-gray-500 hover:text-blue-600 disabled:opacity-30"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-400 hover:text-red-600 p-1"
                        >
                          <Trash2 size={15} />
                        </button>

                      </div>
                    ))}

                  </div>

                ) : (

                  <div className="py-10 text-center">
                    <ShoppingCart size={35} className="mx-auto text-gray-300" />
                    <p className="text-sm font-semibold text-gray-500 mt-3">
                      Your cart is empty
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Add products to start billing
                    </p>
                  </div>

                )}

              </div>

              {/* Bill Summary */}
              <div className="border-t border-gray-100 p-4 space-y-4">

                <h3 className="font-bold text-sm text-slate-800">
                  Bill Summary
                </h3>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold text-slate-800">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                {/* Discount */}
                <div className="flex justify-between items-center gap-3">
                  <label className="text-sm text-gray-500">
                    Discount (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={subtotal}
                    value={discount}
                    onChange={e => setDiscount(e.target.value)}
                    className="w-24 border border-gray-200 rounded-lg px-2 py-2 text-right text-sm outline-none focus:border-blue-500"
                  />
                </div>

                {/* GST */}
                <div className="flex justify-between items-center gap-3">
                  <label className="text-sm text-gray-500">
                    GST (%)
                  </label>
                  <div className="relative">
                    <select
                      value={gst}
                      onChange={e => setGst(Number(e.target.value))}
                      className="appearance-none w-24 border border-gray-200 rounded-lg px-2 py-2 pr-6 text-sm outline-none focus:border-blue-500"
                    >
                      <option value={0}>0%</option>
                      <option value={5}>5%</option>
                      <option value={12}>12%</option>
                      <option value={18}>18%</option>
                      <option value={28}>28%</option>
                    </select>
                    <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">GST Amount</span>
                  <span className="font-semibold text-slate-800">
                    {formatPrice(gstAmount)}
                  </span>
                </div>

                <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between items-center">
                  <span className="font-bold text-slate-800">
                    Grand Total
                  </span>
                  <span className="text-xl font-bold text-blue-600">
                    {formatPrice(grandTotal)}
                  </span>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="font-semibold text-sm text-slate-800 mb-3">
                    Payment Method
                  </h3>

                  <div className="grid grid-cols-3 gap-2">

                    {[
                      { name: 'Cash', icon: Banknote },
                      { name: 'UPI', icon: Smartphone },
                      { name: 'Card', icon: CreditCard }
                    ].map(method => {
                      const Icon = method.icon

                      return (
                        <button
                          key={method.name}
                          onClick={() => setPaymentMethod(method.name)}
                          className={`flex flex-col items-center gap-2 py-3 rounded-xl border text-xs font-semibold transition ${
                            paymentMethod === method.name
                              ? 'border-blue-500 bg-blue-50 text-blue-600'
                              : 'border-gray-200 text-gray-500'
                          }`}
                        >
                          <Icon size={20} />
                          {method.name}
                        </button>
                      )
                    })}

                  </div>
                </div>

                {/* Generate Bill */}
                <button
                  onClick={handleGenerateBill}
                  disabled={cart.length === 0}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl py-3.5 flex items-center justify-center gap-2 text-sm font-bold transition active:scale-[0.98]"
                >
                  <Receipt size={18} />
                  Generate Bill
                </button>

              </div>

            </div>
          </section>

        </div>
      </main>

      {/* Receipt Modal */}
      {showReceipt && generatedBill && (

        <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-3">

          <div className="bg-white w-full max-w-md rounded-2xl max-h-[90vh] overflow-y-auto">

            <div className="bg-green-50 p-5 text-center">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={28} />
              </div>

              <h2 className="text-lg font-bold text-slate-800 mt-3">
                Bill Generated!
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                Your bill preview is ready
              </p>
            </div>

            <div className="p-5">

              <div className="text-center border-b border-dashed border-gray-200 pb-4">
                <h3 className="font-bold text-lg text-slate-800">
                  Ayush Store
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Tax Invoice
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {generatedBill.id}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {generatedBill.date}
                </p>
              </div>

              <div className="py-4 border-b border-dashed border-gray-200 space-y-1">
                <p className="text-xs text-gray-500">
                  Customer: {generatedBill.customer.name || 'Walk-in Customer'}
                </p>
                {generatedBill.customer.mobile && (
                  <p className="text-xs text-gray-500">
                    Mobile: {generatedBill.customer.mobile}
                  </p>
                )}
              </div>

              <div className="py-4 space-y-3 border-b border-dashed border-gray-200">
                {generatedBill.items.map(item => (
                  <div key={item.id} className="flex justify-between gap-3 text-xs">
                    <span className="text-gray-600">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-semibold text-slate-800">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 py-4 border-b border-dashed border-gray-200 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{formatPrice(generatedBill.subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Discount</span>
                  <span>{formatPrice(generatedBill.discount)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">GST</span>
                  <span>{formatPrice(generatedBill.gst)}</span>
                </div>

                <div className="flex justify-between font-bold text-base pt-2">
                  <span>Grand Total</span>
                  <span className="text-blue-600">
                    {formatPrice(generatedBill.total)}
                  </span>
                </div>

                <div className="flex justify-between text-xs pt-2">
                  <span className="text-gray-500">Payment</span>
                  <span className="font-semibold">
                    {generatedBill.paymentMethod}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">

                <button
                  onClick={() => window.print()}
                  className="flex-1 bg-blue-600 text-white rounded-xl py-3 text-sm font-semibold"
                >
                  Print Bill
                </button>

                <button
                  onClick={closeReceipt}
                  className="flex-1 bg-slate-100 text-slate-700 rounded-xl py-3 text-sm font-semibold"
                >
                  New Bill
                </button>

              </div>

              <button
                onClick={() => setShowReceipt(false)}
                className="w-full text-xs text-gray-400 mt-4"
              >
                Close Preview
              </button>

            </div>
          </div>
        </div>
      )}

      <BottomNavbar />

    </div>
  )
}

export default Billing
