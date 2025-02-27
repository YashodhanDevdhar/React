import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import ProductDetail from './pages/ProductDetail'
import { NavMenu } from './components/NavMenu'
import { SidebarProvider } from './components/ui/sidebar'
import { AppSidebar } from './components/app-sidebar'

function App() {

  return (
    <>
      <SidebarProvider>
        <AppSidebar /> 
        <div className="p-4 mt-16">
          <NavMenu />    
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </div>
      </SidebarProvider>
      
    </>
  )
}

export default App
