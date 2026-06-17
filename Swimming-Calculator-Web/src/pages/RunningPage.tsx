import { useNavigate } from 'react-router-dom'
import SportCalculator from '../components/SportCalculator'
import { RUNNING_DISTANCES, runningPace } from '../utils/calculations'

const RunningPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4">
      <div className="max-w-lg mx-auto mb-4">
        <button
          onClick={() => navigate('/')}
          className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
        >
          ← Volver
        </button>
      </div>
      <SportCalculator
        title="Calculadora de Running"
        distanceLabel="Distancia"
        distanceUnit="km"
        distancePresets={RUNNING_DISTANCES}
        resultLabel="Ritmo de carrera"
        calculatePace={runningPace}
      />
    </div>
  )
}

export default RunningPage
