import products from "../Data/Products"
import { useParams, Link } from "react-router-dom"

function Search() {
    const { query } = useParams()

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <div className="m-10">
            <h1 className="text-2xl font-bold mb-6">
                Search results for "{query}"
            </h1>

            <div className="grid grid-cols-3 gap-10">
                {filteredProducts.map(product => (
                    <div key={product.id} className="border-2 rounded-2xl p-4 flex flex-col items-center">
                         <img
              src={product.image}
              alt={product.name}
              className="h-40 w-40 object-cover"
            />

            <h2 className="mt-3 font-semibold">{product.name}</h2>
            <p className="text-green-600 font-bold">₹{product.price}</p>

                        <Link to={`/product/${product.id}`}>
                            <button className="mt-2 bg-black text-white px-4 py-1 rounded">
                                View Details
                            </button>
                        </Link>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="flex justify-center items-center h-[40vh]">
                    <p className="text-red-500 text-3xl font-bold">
                        No products found! 😕
                    </p>
                </div>

            )}
        </div>
    )
}

export default Search
