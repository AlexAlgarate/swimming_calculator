import { useNavigate } from 'react-router-dom'

const SwimIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M3 16.5c3.5-2 7-2 10.5 0s7 2 10.5 0" />
    <path d="M3 12c3.5-2 7-2 10.5 0s7 2 10.5 0" />
    <path d="M3 7.5c3.5-2 7-2 10.5 0s7 2 10.5 0" />
    <circle cx="18" cy="4" r="1.5" />
  </svg>
)

const BikeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <circle cx="5" cy="17" r="3" />
    <circle cx="19" cy="17" r="3" />
    <path d="M10 17h4l2-5h3l2-3h-4l-2 5h-3" />
    <path d="M14 8h-3l-2 4" />
  </svg>
)

const RunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <circle cx="13" cy="4" r="2" />
    <path d="M9 22l3-8 3 2 2 6" />
    <path d="M8 11l3-4 4 2 3 3" />
  </svg>
)

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const Landing = () => {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen bg-gray-950 flex items-center justify-center px-4 py-8 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/5 via-transparent to-emerald-600/5 rounded-full blur-3xl" />

      <div className="relative max-w-xl w-full bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-10 space-y-10 text-center">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-white">
              <path d="M3 16.5c3.5-2 7-2 10.5 0s7 2 10.5 0" />
              <path d="M3 12c3.5-2 7-2 10.5 0s7 2 10.5 0" />
              <path d="M3 7.5c3.5-2 7-2 10.5 0s7 2 10.5 0" />
              <circle cx="12" cy="4" r="2" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-100 tracking-tight">
            Calculadora de Triatlón
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
            Calcula tus ritmos de natación, ciclismo y carrera al instante.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate('/triathlon')}
            className="group relative w-full px-6 py-5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-2xl shadow-lg shadow-blue-600/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-lg overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <span className="flex -space-x-1">
                <SwimIcon />
                <BikeIcon />
                <RunIcon />
              </span>
              Calculadora de Triatlón
              <ArrowIcon />
            </span>
          </button>
          <button
            onClick={() => navigate('/running')}
            className="group relative w-full px-6 py-5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-lg overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <RunIcon />
              Calculadora de Running
              <ArrowIcon />
            </span>
          </button>
        </div>

        <p className="text-gray-500 text-xs">
          Elige el tipo de cálculo que quieres realizar
        </p>
      </div>
    </div>
  )
}

export default Landing
