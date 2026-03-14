import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import ProductDetails from './Components/ProductDetails'
import ViewDetails from './Pages/ViewDetails'
import Mensfashion from './Pages/Mensfashion'
import Womensfashion from './Pages/Womensfashion'
import Kitchen from './Pages/Kitchen'
import Sports from './Pages/Sports'
import Toys from './Pages/Toys'
import Electronics from './Pages/Electronics'
import Beauty from './Pages/Beauty'
import Mobiles from './Pages/Mobiles'
import Cart from './Pages/Cart'
import Checkout from './Pages/Checkout'
import Success from './Pages/Success'
import Search from './Pages/Search'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} >
        <Route index element={<ProductDetails />} />
        <Route path="product/:id" element={<ViewDetails />} />
        <Route path="/mens_fashion" element={<Mensfashion />} />
        <Route path="/womens_fashion" element={<Womensfashion />} />
        <Route path="/mobiles" element={<Mobiles />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/toys" element={<Toys />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/beauty" element={<Beauty />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/search/:query" element={<Search />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App