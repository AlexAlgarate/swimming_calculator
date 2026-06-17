import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import TriathlonPage from './pages/TriathlonPage'
import RunningPage from './pages/RunningPage'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/triathlon" element={<TriathlonPage />} />
      <Route path="/running" element={<RunningPage />} />
    </Routes>
  </BrowserRouter>
)

export default App
