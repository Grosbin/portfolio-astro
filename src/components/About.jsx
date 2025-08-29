import SectionTitle from './SectionTitle.jsx';

export default function About() {
  const securityProfile = "CLASSIFIED PROFILE :: SECURITY CLEARANCE LEVEL 5 :: Penetration testing specialist with 6+ years of experience in offensive security operations. Expert in mobile application security, vulnerability assessment, and advanced threat detection. Currently maintaining zero-day exploit database and developing next-gen security frameworks for critical infrastructure protection.";

  const skills = [
    { name: 'PENETRATION_TESTING', level: 95, description: 'Advanced Exploitation', icon: '🔓', color: 'cyber-alert' },
    { name: 'MOBILE_SECURITY', level: 92, description: 'iOS/Android Forensics', icon: '📱', color: 'cyber-matrix' },
    { name: 'MALWARE_ANALYSIS', level: 90, description: 'Reverse Engineering', icon: '🦠', color: 'cyber-warning' },
    { name: 'NETWORK_SECURITY', level: 88, description: 'IDS/IPS Systems', icon: '🌐', color: 'cyber-cyan' },
    { name: 'INCIDENT_RESPONSE', level: 94, description: 'Threat Hunting', icon: '🚨', color: 'cyber-electric' }
  ];

  const certifications = [
    { name: 'OSCP - Offensive Security', type: 'ACTIVE', level: 'HIGH' },
    { name: 'CEH - Certified Ethical Hacker', type: 'ACTIVE', level: 'HIGH' },
    { name: 'CISSP - Security Professional', type: 'ACTIVE', level: 'CRITICAL' },
    { name: 'AWS Security Specialist', type: 'ACTIVE', level: 'HIGH' },
    { name: 'GCIH - Incident Handler', type: 'ACTIVE', level: 'HIGH' },
    { name: 'Mobile Security Expert', type: 'ACTIVE', level: 'MEDIUM' }
  ];

  const securityStats = [
    { label: 'VULNERABILITIES_FOUND', value: '847', status: 'CRITICAL' },
    { label: 'SYSTEMS_PENTESTED', value: '156', status: 'ACTIVE' },
    { label: 'ZERO_DAYS_DISCOVERED', value: '3', status: 'CLASSIFIED' },
    { label: 'SECURITY_AUDITS', value: '89', status: 'COMPLETED' }
  ];

  return (
    <section 
      id="about"
      className="min-h-screen py-20 px-6 flex items-center bg-elegant-black"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Elegant Header */}
        <div className="text-center mb-20 fade-in">
          <h2 className="text-4xl md:text-6xl font-light font-serif text-elegant-white mb-6 tracking-tight">
            Sobre Mí
          </h2>
          <div className="h-px w-24 mx-auto bg-elegant-gray-400"></div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Panel - Personal */}
          <div className="space-y-12 fade-up">
            {/* Profile Image */}
            <div className="text-center lg:text-left">
              <div className="inline-block p-1 bg-elegant-gray-900 rounded-lg">
                <div className="w-48 h-48 rounded-lg bg-elegant-gray-800 flex items-center justify-center text-6xl">
                  👨‍💻
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-6">
              <h3 className="text-2xl font-light text-elegant-white">Desarrollador y Especialista</h3>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-elegant-gray-300 text-lg leading-relaxed font-light">
                  Con más de 6 años de experiencia en desarrollo de software y ciberseguridad, 
                  me especializo en crear aplicaciones móviles robustas y sistemas seguros. 
                  Mi enfoque combina la innovación técnica con las mejores prácticas de seguridad.
                </p>
                
                <p className="text-elegant-gray-400 leading-relaxed">
                  Apasionado por la tecnología emergente y el desarrollo de soluciones que 
                  no solo funcionen bien, sino que también protejan a los usuarios y sus datos.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-light text-elegant-white mb-2">6+</div>
                <div className="text-sm text-elegant-gray-400">Años de Experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-elegant-white mb-2">50+</div>
                <div className="text-sm text-elegant-gray-400">Proyectos Completados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-elegant-white mb-2">25+</div>
                <div className="text-sm text-elegant-gray-400">Auditorías de Seguridad</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-elegant-white mb-2">100k+</div>
                <div className="text-sm text-elegant-gray-400">Usuarios Impactados</div>
              </div>
            </div>
          </div>

          {/* Right Panel - Skills & Expertise */}
          <div className="space-y-12 fade-up">
            {/* Skills */}
            <div>
              <h3 className="text-2xl font-light text-elegant-white mb-8">Especialidades</h3>
              
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index} className="elegant-card p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{skill.icon}</div>
                        <div>
                          <h4 className="text-elegant-white font-medium mb-1">
                            {skill.name.replace(/_/g, ' ')}
                          </h4>
                          <p className="text-elegant-gray-400 text-sm">{skill.description}</p>
                        </div>
                      </div>
                      <span className="text-elegant-gray-300 font-light">{skill.level}%</span>
                    </div>
                    <div className="bg-elegant-gray-800 rounded-full h-1 overflow-hidden">
                      <div 
                        className="h-full bg-elegant-white rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-2xl font-light text-elegant-white mb-8">Certificaciones</h3>
              
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div 
                    key={index} 
                    className="elegant-card p-4 hover:bg-elegant-gray-800 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-elegant-white"></div>
                        <span className="text-elegant-gray-300">{cert.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-elegant-gray-800 rounded text-xs text-elegant-gray-400">
                          {cert.level}
                        </span>
                        <span className="text-xs text-elegant-gray-500">{cert.type}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-20 text-center fade-up">
          <div className="elegant-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-light text-elegant-white mb-6">Conectemos</h3>
            <p className="text-elegant-gray-300 mb-8 leading-relaxed">
              Siempre abierto a nuevas oportunidades y colaboraciones interesantes. 
              No dudes en contactarme para discutir proyectos o intercambiar ideas.
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-3 border border-elegant-gray-600 hover:border-elegant-white text-elegant-gray-300 hover:text-elegant-white transition-all duration-300">
                LinkedIn
              </button>
              <button className="px-6 py-3 border border-elegant-gray-600 hover:border-elegant-white text-elegant-gray-300 hover:text-elegant-white transition-all duration-300">
                GitHub
              </button>
              <button className="px-6 py-3 bg-elegant-white text-elegant-black hover:bg-elegant-gray-100 transition-all duration-300">
                Contactar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}