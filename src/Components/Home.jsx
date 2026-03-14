import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

function Home() {
    const { cart } = useCart()
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault()
        if (search.trim()) {
            navigate(`/search/${search}`)
        }
    }

    return (
        <div>
            <div className="flex flex-wrap md:flex-nowrap md:h-16 bg-black items-center px-6 py-3 md:py-0">

                {/* LEFT */}
                <div className="w-full md:w-1/4 flex items-center justify-center md:justify-start mb-2 md:mb-0">
                    <Link to="/" className="text-white font-bold text-2xl">
                        E-Shop
                    </Link>
                </div>

                {/* CENTER */}
                <div className="w-full md:w-1/2 flex justify-center mb-2 md:mb-0">
                    <form onSubmit={handleSearch} className="flex w-full max-w-xl">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-4 py-1 rounded-l outline-none bg-gray-100"
                        />
                        <button className="bg-yellow-400 px-4 rounded-r font-semibold">
                            Search
                        </button>
                    </form>
                </div>

                {/* RIGHT */}
                <div className="w-full md:w-1/4 flex justify-center md:justify-end gap-6 text-white">
                    <Link to="/">Home</Link>
                    <Link to="/cart">Cart ({cart.length})</Link>
                </div>

            </div>

            {/* 🟠 CATEGORY BAR */}
            <div className="flex flex-wrap h-auto bg-gray-600 justify-center items-center gap-4 md:gap-10 px-4 py-2">
  <Link to="/mens_fashion" className="text-white">Men's Fashion</Link>
  <Link to="/womens_fashion" className="text-white">Women's Fashion</Link>
  <Link to="/mobiles" className="text-white">Mobiles</Link>
  <Link to="/kitchen" className="text-white">Kitchen</Link>
  <Link to="/electronics" className="text-white">Electronics</Link>
  <Link to="/beauty" className="text-white">Beauty</Link>
  <Link to="/sports" className="text-white">Sports</Link>
  <Link to="/toys" className="text-white">Toys</Link>
</div>

            <Outlet />
        </div>
    )
}

export default Home