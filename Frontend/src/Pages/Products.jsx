import { useState } from 'react'
import BottomNavbar from '../Components/BottomNavbar'
import {
    Search,
    Plus,
    Package,
    Layers,
    AlertTriangle,
    Edit,
    Trash2,
    X,
    ImagePlus,
    Filter,
    ChevronDown
} from 'lucide-react'

const Products = () => {

    const [showModal, setShowModal] = useState(false)
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('All')
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Wireless Headphones',
            category: 'Electronics',
            price: 1299,
            stock: 25,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200'
        },
        {
            id: 2,
            name: 'Smart Watch',
            category: 'Electronics',
            price: 2499,
            stock: 8,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200'
        },
        {
            id: 3,
            name: 'Running Shoes',
            category: 'Fashion',
            price: 1799,
            stock: 15,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200'
        },
        {
            id: 4,
            name: 'Travel Bag',
            category: 'Accessories',
            price: 999,
            stock: 3,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200'
        },
        {
            id: 5,
            name: 'Cotton T-Shirt',
            category: 'Fashion',
            price: 599,
            stock: 42,
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200'
        }
    ])

    const [form, setForm] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        image: ''
    })

    const categories = [
        'All',
        'Electronics',
        'Fashion',
        'Accessories'
    ]

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) &&
        (category === 'All' || product.category === category)
    )

    const lowStock = products.filter(product => product.stock <= 5).length

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleAddProduct = (e) => {
        e.preventDefault()

        const newProduct = {
            ...form,
            id: Date.now(),
            price: Number(form.price),
            stock: Number(form.stock),
            image: form.image || 'https://placehold.co/200x200?text=Product'
        }

        setProducts([...products, newProduct])

        setForm({
            name: '',
            category: '',
            price: '',
            stock: '',
            image: ''
        })

        setShowModal(false)
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(product => product.id !== id))
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-24">

            {/* Header */}
            <header className="bg-white border-b border-gray-100 px-4 py-4 sm:px-6">
                <div className="max-w-5xl mx-auto flex justify-between items-center">

                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
                            Products
                        </h1>
                        <p className="text-xs text-gray-500 mt-1">
                            Manage your shop inventory
                        </p>
                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 text-white px-3 sm:px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs sm:text-sm font-semibold hover:bg-blue-700 transition"
                    >
                        <Plus size={18} />
                        Add Product
                    </button>

                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-5">

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">

                    <div className="bg-white border border-gray-100 rounded-xl p-3 sm:p-4">
                        <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                            <Package size={18} />
                        </div>
                        <p className="text-[10px] sm:text-xs text-gray-500 mt-3">
                            Total Products
                        </p>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mt-1">
                            {products.length}
                        </h2>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-xl p-3 sm:p-4">
                        <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                            <Layers size={18} />
                        </div>
                        <p className="text-[10px] sm:text-xs text-gray-500 mt-3">
                            Categories
                        </p>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mt-1">
                            {new Set(products.map(p => p.category)).size}
                        </h2>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-xl p-3 sm:p-4">
                        <div className="w-8 h-8 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
                            <AlertTriangle size={18} />
                        </div>
                        <p className="text-[10px] sm:text-xs text-gray-500 mt-3">
                            Low Stock
                        </p>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mt-1">
                            {lowStock}
                        </h2>
                    </div>

                </div>

                {/* Search and Filter */}
                <div className="bg-white border border-gray-100 rounded-xl p-3 mb-5">

                    <div className="flex flex-col sm:flex-row gap-3">

                        <div className="relative flex-1">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-slate-50 border border-gray-200 rounded-lg pl-10 pr-3 py-3 text-sm outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="relative sm:w-48">
                            <Filter
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                            />

                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full appearance-none bg-slate-50 border border-gray-200 rounded-lg pl-9 pr-8 py-3 text-sm outline-none focus:border-blue-500"
                            >
                                {categories.map(item => (
                                    <option key={item} value={item}>
                                        {item === 'All' ? 'All Categories' : item}
                                    </option>
                                ))}
                            </select>

                            <ChevronDown
                                size={16}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                            />
                        </div>

                    </div>
                </div>

                {/* Product List */}
                <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">

                    <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                        <div>
                            <h2 className="font-bold text-slate-800">
                                All Products
                            </h2>
                            <p className="text-xs text-gray-400 mt-1">
                                {filteredProducts.length} products found
                            </p>
                        </div>
                    </div>

                    <div className="divide-y divide-gray-100">

                        {filteredProducts.length > 0 ? (

                            filteredProducts.map(product => (

                                <div
                                    key={product.id}
                                    className="p-3 sm:p-4 flex items-center gap-3"
                                >

                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover bg-slate-100 shrink-0"
                                    />

                                    <div className="flex-1 min-w-0">

                                        <h3 className="text-sm font-semibold text-slate-800 truncate">
                                            {product.name}
                                        </h3>

                                        <p className="text-xs text-gray-400 mt-1">
                                            {product.category}
                                        </p>

                                        <div className="flex items-center gap-3 mt-2 flex-wrap">

                                            <span className="text-sm font-bold text-slate-800">
                                                ₹{product.price.toLocaleString('en-IN')}
                                            </span>

                                            <span className={`text-[10px] font-semibold px-2 py-1 rounded-md ${product.stock <= 5
                                                    ? 'bg-red-50 text-red-600'
                                                    : 'bg-green-50 text-green-600'
                                                }`}>
                                                Stock: {product.stock}
                                            </span>

                                        </div>

                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center gap-1">

                                        <button
                                            onClick={() => {
                                                setForm({
                                                    ...product,
                                                    price: String(product.price),
                                                    stock: String(product.stock)
                                                })
                                                setShowModal(true)
                                            }}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                        >
                                            <Edit size={17} />
                                        </button>

                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                        >
                                            <Trash2 size={17} />
                                        </button>

                                    </div>

                                </div>

                            ))

                        ) : (

                            <div className="py-12 text-center">
                                <Package size={35} className="mx-auto text-gray-300" />
                                <p className="text-sm font-semibold text-gray-600 mt-3">
                                    No Products Found
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    Try another search or add a new product.
                                </p>
                            </div>

                        )}

                    </div>

                </div>

            </main>

            {/* Add / Edit Product Modal */}
            {showModal && (

                <div className="fixed inset-0 z-[60] bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4">

                    <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl p-5 max-h-[90vh] overflow-y-auto">

                        <div className="flex items-center justify-between mb-5">

                            <div>
                                <h2 className="text-lg font-bold text-slate-800">
                                    {products.some(p => p.id === form.id) ? 'Edit Product' : 'Add New Product'}
                                </h2>
                                <p className="text-xs text-gray-400 mt-1">
                                    Enter your product details
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    setShowModal(false)
                                    setForm({
                                        name: '',
                                        category: '',
                                        price: '',
                                        stock: '',
                                        image: ''
                                    })
                                }}
                                className="p-2 bg-slate-100 rounded-lg text-gray-500"
                            >
                                <X size={19} />
                            </button>

                        </div>

                        <form onSubmit={(e) => {
                            e.preventDefault()

                            if (form.id) {
                                setProducts(products.map(p =>
                                    p.id === form.id
                                        ? { ...form, price: Number(form.price), stock: Number(form.stock) }
                                        : p
                                ))
                                setShowModal(false)
                                setForm({ name: '', category: '', price: '', stock: '', image: '' })
                            } else {
                                handleAddProduct(e)
                            }
                        }} className="space-y-4">

                            <div>
                                <label className="text-xs font-semibold text-gray-600">
                                    Product Name
                                </label>
                                <input
                                    required
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter product name"
                                    className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-gray-600">
                                    Category
                                </label>
                                <select
                                    required
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:border-blue-500"
                                >
                                    <option value="">Select Category</option>
                                    {categories.filter(c => c !== 'All').map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-3">

                                <div>
                                    <label className="text-xs font-semibold text-gray-600">
                                        Selling Price (₹)
                                    </label>
                                    <input
                                        required
                                        type="number"
                                        min="0"
                                        name="price"
                                        value={form.price}
                                        onChange={handleChange}
                                        placeholder="0"
                                        className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-gray-600">
                                        Stock Quantity
                                    </label>
                                    <input
                                        required
                                        type="number"
                                        min="0"
                                        name="stock"
                                        value={form.stock}
                                        onChange={handleChange}
                                        placeholder="0"
                                        className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:border-blue-500"
                                    />
                                </div>

                            </div>

                            <div>
                                <label className="text-xs font-semibold text-gray-600">
                                    Product Image URL
                                </label>
                                <div className="relative mt-2">
                                    <ImagePlus size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        name="image"
                                        value={form.image}
                                        onChange={handleChange}
                                        placeholder="Enter image URL (optional)"
                                        className="w-full border border-gray-200 rounded-lg pl-10 pr-3 py-3 text-sm outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm transition"
                            >
                                {form.id ? 'Update Product' : 'Save Product'}
                            </button>

                        </form>

                    </div>

                </div>

            )}

            <BottomNavbar />

        </div>
    )
}

export default Products
