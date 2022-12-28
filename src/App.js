import Header from "components/Header";
import Notfound from "components/NotFound";
import CartFeature from "features/Cart";
import ProductFeature from "features/Products";
import { useEffect } from "react";
import { Outlet, Route, Routes, useLocation, useNavigate } from "react-router";


function App() {
  const location = useLocation()
  const navigate = useNavigate()

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const productsList = await productsApi.getAll()
  //     console.log(productsList)
  //   }
  //   fetchProducts()
  // }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/products')
    }
  }, [navigate, location.pathname])

  return (
    <div className="App">
      <Header />
      <Outlet />
      <Routes>
        {/* <Route path="todos/*" element={<TodoFeature />} />
        <Route path="albums/*" element={<AlbumFeature />} /> */}
        <Route path="products/*" element={<ProductFeature />} />
        <Route path="cart/*" element={<CartFeature />} />

        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
