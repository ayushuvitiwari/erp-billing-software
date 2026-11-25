import { BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Home from './Pages/Home'

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/'  />
        <Route path='/shop/home' element={<Home/>}  />
      </Routes>
    </Router>
    </>
  )
}

export default App