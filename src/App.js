import { BrowserRouter, Route, Routes } from 'react-router-dom'

// page components
import Home from './pages/home/Home'
import Recipe from './pages/recipe/Recipe'
import Search from './pages/search/Search'
import Create from './pages/create/Create'

// components
import Navbar from './components/Navbar'
import ThemeSelector from './components/ThemeSelector'

// styles
import './App.css'
import { useTheme } from './hooks/useTheme'

export default function App() {

  const { mode } = useTheme()

  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/search' element={<Search />} />
          <Route path='/recipes/:id' element={<Recipe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
