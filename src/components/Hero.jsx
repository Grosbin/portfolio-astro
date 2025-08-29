import LetterGlitch from './LetterGlitch.jsx';
import SectionTitle from './SectionTitle.jsx';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-elegant-black">
      {/* Interactive Letter Glitch Background */}
      <div className="absolute inset-0 w-full h-full opacity-25">
        <LetterGlitch 
          glitchSpeed={100}
          centerVignette={false}
          outerVignette={false}
          smooth={true}
        />
      </div>
      {/* Main Content */}
      <div className="text-center z-20 max-w-4xl mx-auto px-6 fade-in">
        {/* Name and title */}
        <div className="mb-12 fade-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light font-serif text-elegant-white mb-6 tracking-tight">
            Roberto Betancourth
          </h1>
          
          <div className="h-px w-24 mx-auto bg-elegant-gray-400 mb-8"></div>
          
          <div className="space-y-2 text-elegant-gray-400">
            <p className="text-xl md:text-2xl font-light">
              Desarrollador Móvil
            </p>
            <p className="text-lg md:text-xl">
              Especialista en Ciberseguridad
            </p>
          </div>
        </div>

        {/* Elegant description */}
        <div className="mb-12 max-w-2xl mx-auto fade-up">
          <p className="text-lg md:text-xl text-elegant-gray-300 leading-relaxed font-light">
            Construyendo soluciones digitales seguras con enfoque en la excelencia técnica 
            y la innovación responsable.
          </p>
        </div>

        {/* Elegant CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 scale-in">
          <button 
            className="group px-8 py-4 border border-elegant-gray-600 hover:border-elegant-white transition-all duration-300 subtle-glow"
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
          >
            <span className="text-elegant-white group-hover:text-elegant-white font-light">
              Conocer Más
            </span>
          </button>

          <button 
            className="group px-8 py-4 bg-elegant-white text-elegant-black hover:bg-elegant-gray-100 transition-all duration-300 subtle-glow"
            onClick={() => {
              document.getElementById('projects')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
          >
            <span className="font-medium">
              Ver Proyectos
            </span>
          </button>
        </div>
      </div>

      {/* Minimal scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 slide-in">
        <div className="text-center">
          <div className="w-px h-12 bg-elegant-gray-600 mx-auto mb-4"></div>
          <div className="animate-bounce">
            <svg 
              className="w-5 h-5 text-elegant-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}