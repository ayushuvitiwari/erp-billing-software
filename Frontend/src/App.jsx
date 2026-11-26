import { BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Home from './Pages/Home'
import Products from './Pages/Products'
import Billing from './Pages/Billing'
import History from './Pages/History'
import Profile from './Pages/Profile'

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/'  />
        <Route path='/shop/home' element={<Home/>}  />
        <Route path='/shop/products' element={<Products/>}  />
        <Route path='/shop/billing' element={<Billing/>}  />
        <Route path='/shop/history' element={<History/>}  />
        <Route path='/shop/profile' element={<Profile/>}  />
      </Routes>
    </Router>
    </>
  )
}

export default App