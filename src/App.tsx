import { Routes, Route } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { Home } from './pages/Home'
import { Busca } from './pages/Busca'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/explorar" element={<Home />} />
      <Route path="/busca" element={<Busca />} />
    </Routes>
  )
}

export default App
