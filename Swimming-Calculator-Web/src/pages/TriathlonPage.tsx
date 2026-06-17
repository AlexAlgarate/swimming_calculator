import { useNavigate } from 'react-router-dom'
import UnifiedCalculator from '../components/UnifiedCalculator'

const TriathlonPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4">
      <div className="max-w-2xl mx-auto mb-4">
        <button
          onClick={() => navigate('/')}
          className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
        >
          ← Volver
        </button>
      </div>
      <UnifiedCalculator />
    </div>
  )
}

export default TriathlonPage
