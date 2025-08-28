import SectionTitle from './SectionTitle.jsx';

export default function About() {
  const fullText = "Explorando las infinitas posibilidades del desarrollo móvil y la ciberseguridad. Con más de X años de experiencia navegando por el vasto universo del código, me especializo en crear aplicaciones móviles robustas y sistemas de seguridad avanzados. Mi misión es construir puentes digitales seguros entre planetas tecnológicos, defendiendo cada línea de código como si fuera la última frontera.";

  const skills = [
    { name: 'Desarrollo Móvil', level: 95, description: 'iOS & Android' },
    { name: 'Ciberseguridad', level: 90, description: 'Penetration Testing' },
    { name: 'Arquitectura de Sistemas', level: 88, description: 'Microservicios' },
    { name: 'DevSecOps', level: 85, description: 'CI/CD Security' },
    { name: 'Análisis de Vulnerabilidades', level: 92, description: 'OWASP Top 10' }
  ];

  const certifications = [
    'Certified Ethical Hacker (CEH)',
    'AWS Security Specialty',
    'CISSP - Associate',
    'Mobile Security Expert',
    'Kubernetes Security Specialist'
  ];

  return (
    <section 
      id="about"
      className="min-h-screen py-20 px-6 flex items-center bg-black"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Control Panel Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 font-space">
            <SectionTitle>
              Panel de Control
            </SectionTitle>
          </h2>
          <div className="flex items-center justify-center gap-2 font-mono text-sm opacity-60">
            <div className="w-2 h-2 rounded-full animate-pulse bg-white" />
            <span>ASTRONAUTA EN LÍNEA</span>
            <div className="w-2 h-2 rounded-full animate-pulse bg-white" />
          </div>
        </div>

        {/* Main Control Panel */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Panel - Profile */}
          <div className="space-y-8">
            {/* Profile Image */}
            <div className="text-center lg:text-left">
              <div 
                className="inline-block p-1 rounded-lg glow-effect"
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF20 0%, #FFFFFF10 100%)',
                  border: '2px solid #FFFFFF40'
                }}
              >
                <div 
                  className="w-48 h-48 rounded-lg flex items-center justify-center text-6xl"
                  style={{
                    background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)'
                  }}
                >
                  🧑‍🚀
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold font-space">Comandante de Código</h3>
              
              <div 
                className="p-4 rounded-lg font-mono text-sm leading-relaxed border"
                style={{
                  background: 'rgba(26, 26, 26, 0.5)',
                  borderColor: '#444444'
                }}
              >
                <div className="flex items-center gap-2 mb-2 text-xs opacity-60">
                  <span>~/bio.txt</span>
                  <div className="w-1 h-1 rounded-full animate-pulse bg-white" />
                </div>
                <p>
                  {fullText}
                  <span className="animate-pulse text-white">|</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - Skills & Certifications */}
          <div className="space-y-8">
            {/* Navigation Systems (Skills) */}
            <div>
              <h3 className="text-xl font-bold mb-6 font-space flex items-center gap-2">
                <span>Sistemas de Navegación</span>
                <div className="w-2 h-2 rounded-full animate-pulse bg-green-400" />
              </h3>
              
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm opacity-60 ml-2">• {skill.description}</span>
                      </div>
                      <span className="font-mono text-sm">{skill.level}%</span>
                    </div>
                    <div 
                      className="h-2 rounded-full overflow-hidden"
                      style={{
                        background: '#2A2A2A'
                      }}
                    >
                      <div 
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${skill.level}%`,
                          background: 'linear-gradient(90deg, #FFFFFF 0%, #CCCCCC 100%)'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Space Licenses (Certifications) */}
            <div>
              <h3 className="text-xl font-bold mb-6 font-space flex items-center gap-2">
                <span>Licencias Espaciales</span>
                <span className="text-xs opacity-60 font-mono">[{certifications.length}]</span>
              </h3>
              
              <div className="grid grid-cols-1 gap-3">
                {certifications.map((cert, index) => (
                  <div 
                    key={index} 
                    className="cert-item p-3 rounded border font-mono text-sm glow-effect hover:scale-105 transition-all duration-300"
                    style={{
                      background: 'rgba(26, 26, 26, 0.3)',
                      borderColor: '#444444'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span>✓ {cert}</span>
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div 
          className="mt-16 p-4 rounded-lg border font-mono text-sm"
          style={{
            background: 'rgba(26, 26, 26, 0.5)',
            borderColor: '#444444'
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse bg-green-400" />
                STATUS: OPERATIVO
              </span>
              <span>MISIÓN: DESARROLLO SEGURO</span>
            </div>
            <div className="flex items-center gap-4 text-xs opacity-60">
              <span>ÚLTIMA ACTUALIZACIÓN: 2025</span>
              <span>SECTOR: TIERRA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}