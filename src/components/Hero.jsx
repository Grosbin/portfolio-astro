import Galaxy from './Galaxy.jsx';
import LetterGlitch from './LetterGlitch.jsx';
import SectionTitle from './SectionTitle.jsx';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Galaxy Background solo en Hero */}
      <div className="absolute inset-0">
        <Galaxy 
          mouseRepulsion={false}
          mouseInteraction={true}
          density={3}
          glowIntensity={0.2}
          saturation={0.0}
          hueShift={0}
          twinkleIntensity={0.15}
          rotationSpeed={0.002}
          repulsionStrength={2}
          speed={0.1}
          starSpeed={0.1}
          transparent={true}
        />
      </div>
      
      {/* Letter Glitch Overlay solo en Hero */}
      <div className="absolute inset-0 w-full h-full opacity-5 pointer-events-none">
        <LetterGlitch 
          glitchSpeed={150}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      </div>
      <div className="text-center z-10 max-w-4xl mx-auto">
        {/* Name and title */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 font-space">
          <SectionTitle>
            Tu Nombre
          </SectionTitle>
        </h1>

        <h2 className="text-2xl md:text-4xl font-light mb-8 text-gray-300 font-mono">
          Desarrollador Móvil • Ingeniero en Sistemas
          <br />
          <span className="text-xl md:text-2xl">Especialista en Ciberseguridad</span>
        </h2>

        {/* Tagline */}
        <p className="text-lg md:text-xl mb-12 text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Navegando por las vastas fronteras del ciberespacio, 
          construyendo soluciones seguras y defendiendo sistemas 
          contra amenazas digitales.
        </p>

        {/* CTA Button */}
        <div>
          <button 
            className="group relative px-8 py-4 text-lg font-medium rounded-lg border-2 border-white/25 bg-white/5 transition-all duration-300 overflow-hidden glow-effect hover:scale-105"
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
          >
            <span className="relative z-10">Iniciar Exploración</span>
            
            {/* Scanline effect */}
            <div 
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
              }}
            />
          </button>
        </div>

        {/* Terminal-style indicator */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-sm font-mono opacity-60">
            <div className="w-2 h-2 rounded-full animate-pulse bg-white" />
            <span>SISTEMA OPERATIVO</span>
            <div className="w-2 h-2 rounded-full animate-pulse bg-white" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-sm font-mono opacity-60">SCROLL</span>
          <svg 
            className="w-6 h-6 opacity-60" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}