import SectionTitle from './SectionTitle.jsx';

export default function Experience() {
  const missions = [
    {
      id: 'mission-04',
      title: 'Senior Mobile Security Engineer',
      company: 'TechCorp Space Division',
      period: '2023 - Presente',
      location: 'Remoto • Sector Alpha',
      status: 'ACTIVA',
      achievements: [
        'Implementé arquitectura de seguridad móvil para 50M+ usuarios',
        'Reduje vulnerabilidades críticas en 85% mediante análisis automatizado',
        'Lideré equipo de 8 ingenieros en misiones de penetration testing',
        'Desarrollé framework de DevSecOps para CI/CD pipelines'
      ],
      technologies: ['iOS Security', 'Android Security', 'OWASP', 'DevSecOps', 'Kubernetes']
    },
    {
      id: 'mission-03',
      title: 'Mobile Development Lead',
      company: 'InnovateTech Solutions',
      period: '2021 - 2023',
      location: 'Híbrido • Sector Beta',
      status: 'COMPLETADA',
      achievements: [
        'Dirigí desarrollo de 12 aplicaciones móviles multiplataforma',
        'Optimización de performance resultó en 40% menos tiempo de carga',
        'Establecí estándares de código y arquitectura para el equipo',
        'Mentorié a 6 desarrolladores junior en tecnologías móviles'
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase']
    },
    {
      id: 'mission-02',
      title: 'Full Stack Security Developer',
      company: 'CyberGuard Systems',
      period: '2019 - 2021',
      location: 'Presencial • Sector Gamma',
      status: 'COMPLETADA',
      achievements: [
        'Desarrollé sistema de detección de amenazas en tiempo real',
        'Integré APIs de seguridad con tolerancia a fallos del 99.9%',
        'Implementé autenticación multi-factor para aplicaciones críticas',
        'Creé dashboard de monitoreo para análisis de vulnerabilidades'
      ],
      technologies: ['Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS Security']
    },
    {
      id: 'mission-01',
      title: 'Junior Security Analyst',
      company: 'SecureTech Innovations',
      period: '2018 - 2019',
      location: 'Presencial • Sector Delta',
      status: 'COMPLETADA',
      achievements: [
        'Realicé auditorías de seguridad en aplicaciones web y móviles',
        'Documenté y reporté más de 200 vulnerabilidades identificadas',
        'Participé en ejercicios de red team y blue team',
        'Completé certificaciones en ethical hacking y penetration testing'
      ],
      technologies: ['Burp Suite', 'Nmap', 'Metasploit', 'Wireshark', 'Linux']
    },
    {
      id: 'mission-00',
      title: 'Computer Systems Engineering',
      company: 'Universidad Tecnológica Espacial',
      period: '2014 - 2018',
      location: 'Campus • Sector Educativo',
      status: 'COMPLETADA',
      achievements: [
        'Graduado con honores - Promedio: 9.2/10',
        'Proyecto de tesis en ciberseguridad móvil reconocido a nivel nacional',
        'Participé en 5 hackathons, ganando 2 primeros lugares',
        'Líder del club de programación y ciberseguridad'
      ],
      technologies: ['C++', 'Java', 'Python', 'Database Design', 'Network Security']
    },
    {
      id: 'mission-foundation',
      title: 'Autodidacta en Programación',
      company: 'Academia Personal',
      period: '2012 - 2014',
      location: 'Casa • Sector Origen',
      status: 'COMPLETADA',
      achievements: [
        'Aprendí fundamentos de programación de forma autodidacta',
        'Desarrollé mis primeras aplicaciones web y móviles',
        'Participé en comunidades online de desarrolladores',
        'Construí proyectos personales que definieron mi carrera'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Git']
    }
  ];

  return (
    <section 
      id="experience"
      className="min-h-screen py-20 px-6 bg-black"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 font-space">
            <SectionTitle>
              Registro de Misiones
            </SectionTitle>
          </h2>
          <p className="text-lg opacity-70 max-w-2xl mx-auto mb-8">
            Historial completo de expediciones a través del universo tecnológico, 
            desde las primeras exploraciones hasta las misiones más avanzadas.
          </p>
          <div className="flex items-center justify-center gap-2 font-mono text-sm opacity-60">
            <div className="w-1 h-1 rounded-full animate-pulse bg-white" />
            <span>TRANSMISIÓN EN VIVO DESDE LA BASE</span>
            <div className="w-1 h-1 rounded-full animate-pulse bg-white" />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div 
            className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-1 h-full"
            style={{
              background: 'linear-gradient(to bottom, #FFFFFF20, #FFFFFF40, #FFFFFF20)'
            }}
          />

          {/* Mission cards */}
          <div className="space-y-16">
            {missions.map((mission, index) => (
              <div 
                key={mission.id}
                className={`mission-card relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                {/* Timeline dot */}
                <div 
                  className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 z-10"
                  style={{
                    background: '#000000',
                    borderColor: mission.status === 'ACTIVA' 
                      ? '#00FF00'
                      : '#FFFFFF'
                  }}
                >
                  <div 
                    className="absolute inset-1 rounded-full animate-pulse"
                    style={{
                      background: mission.status === 'ACTIVA' 
                        ? '#00FF00'
                        : '#FFFFFF'
                    }}
                  />
                </div>

                {/* Mission card */}
                <div 
                  className={`w-full max-w-lg p-6 rounded-lg border glow-effect hover:scale-105 transition-all duration-300 ${
                    index % 2 === 0 ? 'mr-auto lg:mr-8' : 'ml-auto lg:ml-8'
                  }`}
                  style={{
                    background: 'rgba(26, 26, 26, 0.8)',
                    borderColor: mission.status === 'ACTIVA' 
                      ? '#00FF0040'
                      : '#FFFFFF40',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {/* Mission header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold font-space mb-1">{mission.title}</h3>
                      <p className="text-lg opacity-80">{mission.company}</p>
                    </div>
                    <div 
                      className="px-3 py-1 rounded-full text-xs font-mono"
                      style={{
                        background: mission.status === 'ACTIVA' 
                          ? '#00FF0020'
                          : '#FFFFFF20',
                        color: mission.status === 'ACTIVA' 
                          ? '#00FF00'
                          : 'inherit'
                      }}
                    >
                      {mission.status}
                    </div>
                  </div>

                  {/* Mission details */}
                  <div className="mb-6 text-sm opacity-70 font-mono">
                    <div className="flex flex-wrap gap-4">
                      <span>📅 {mission.period}</span>
                      <span>📍 {mission.location}</span>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold mb-3 font-space opacity-90">
                      LOGROS DE MISIÓN
                    </h4>
                    <ul className="space-y-2 text-sm opacity-80">
                      {mission.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">▶</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-bold mb-3 font-space opacity-90">
                      TECNOLOGÍAS UTILIZADAS
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {mission.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-xs font-mono border"
                          style={{
                            background: '#2A2A2A',
                            borderColor: '#444444'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Stats */}
        <div 
          className="mt-16 p-6 rounded-lg border text-center"
          style={{
            background: 'rgba(26, 26, 26, 0.5)',
            borderColor: '#444444'
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold font-space mb-2">6+</div>
              <div className="text-sm opacity-70">Años de Experiencia</div>
              <div className="w-2 h-2 rounded-full animate-pulse bg-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold font-space mb-2">50M+</div>
              <div className="text-sm opacity-70">Usuarios Impactados</div>
              <div className="w-2 h-2 rounded-full animate-pulse bg-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold font-space mb-2">25+</div>
              <div className="text-sm opacity-70">Proyectos Completados</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-space mb-2">1</div>
              <div className="text-sm opacity-70">Misión Activa</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}