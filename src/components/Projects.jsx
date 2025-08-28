import { useState } from 'react';
import SectionTitle from './SectionTitle.jsx';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Todas las Expediciones', icon: '🌌' },
    { id: 'mobile', name: 'Comunicadores Espaciales', icon: '📱' },
    { id: 'security', name: 'Sistemas de Defensa', icon: '🛡️' },
    { id: 'web', name: 'Portales Galácticos', icon: '🌐' },
    { id: 'tools', name: 'Herramientas de Misión', icon: '🔧' }
  ];

  const projects = [
    {
      id: 'secure-messenger',
      title: 'SecureSpace Messenger',
      category: 'mobile',
      description: 'Comunicador intergaláctico con encriptación cuántica end-to-end. Permite comunicación segura entre astronautas en misiones remotas.',
      technologies: ['React Native', 'E2E Encryption', 'WebRTC', 'Firebase', 'Biometric Auth'],
      features: [
        'Encriptación cuántica avanzada',
        'Autenticación biométrica',
        'Comunicación en tiempo real',
        'Modo offline para emergencias'
      ],
      status: 'Activo',
      year: '2024',
      users: '50K+',
      github: 'https://github.com/username/secure-messenger',
      demo: 'https://secure-messenger-demo.com',
      image: '📱🔐'
    },
    {
      id: 'vulnerability-scanner',
      title: 'Orbital Security Scanner',
      category: 'security',
      description: 'Sistema automatizado de detección de amenazas para infraestructuras espaciales. Identifica vulnerabilidades críticas en tiempo real.',
      technologies: ['Python', 'OWASP ZAP', 'Docker', 'Kubernetes', 'GraphQL'],
      features: [
        'Escaneo automatizado 24/7',
        'Detección de OWASP Top 10',
        'Reportes detallados en tiempo real',
        'Integración con CI/CD pipelines'
      ],
      status: 'Activo',
      year: '2024',
      users: '10K+',
      github: 'https://github.com/username/orbital-scanner',
      demo: 'https://orbital-scanner-demo.com',
      image: '🛡️🔍'
    },
    {
      id: 'space-dashboard',
      title: 'Mission Control Dashboard',
      category: 'web',
      description: 'Centro de comando espacial para monitoreo de múltiples misiones. Visualización de datos en tiempo real con alertas inteligentes.',
      technologies: ['React', 'D3.js', 'Node.js', 'WebSocket', 'MongoDB'],
      features: [
        'Visualización de datos en tiempo real',
        'Sistema de alertas inteligentes',
        'Dashboard personalizable',
        'Soporte multi-misión'
      ],
      status: 'Completado',
      year: '2023',
      users: '5K+',
      github: 'https://github.com/username/mission-control',
      demo: 'https://mission-control-demo.com',
      image: '🌐📊'
    },
    {
      id: 'crypto-wallet',
      title: 'Galactic Crypto Vault',
      category: 'mobile',
      description: 'Billetera cripto segura para transacciones intergalácticas. Soporte para múltiples blockchains con seguridad de grado militar.',
      technologies: ['Flutter', 'Blockchain APIs', 'Biometrics', 'Encryption', 'DeFi'],
      features: [
        'Soporte multi-blockchain',
        'Autenticación biométrica avanzada',
        'Transacciones DeFi integradas',
        'Respaldo automático encriptado'
      ],
      status: 'En desarrollo',
      year: '2024',
      users: '1K+',
      github: 'https://github.com/username/crypto-vault',
      demo: 'https://crypto-vault-demo.com',
      image: '💎🚀'
    },
    {
      id: 'ai-assistant',
      title: 'ARIA - AI Research Assistant',
      category: 'tools',
      description: 'Asistente de IA especializado en análisis de ciberseguridad. Procesa logs y detecta patrones anómalos usando machine learning.',
      technologies: ['Python', 'TensorFlow', 'FastAPI', 'Elasticsearch', 'Docker'],
      features: [
        'Análisis de patrones con ML',
        'Procesamiento de logs masivos',
        'Detección de anomalías en tiempo real',
        'API REST para integración'
      ],
      status: 'Investigación',
      year: '2024',
      users: 'Beta',
      github: 'https://github.com/username/aria-ai',
      demo: 'https://aria-ai-demo.com',
      image: '🤖🧠'
    },
    {
      id: 'network-monitor',
      title: 'Deep Space Network Monitor',
      category: 'tools',
      description: 'Herramienta de monitoreo de red para comunicaciones espaciales. Visualiza tráfico de red y detecta intrusiones.',
      technologies: ['Go', 'Grafana', 'InfluxDB', 'Wireshark', 'Linux'],
      features: [
        'Monitoreo de tráfico en tiempo real',
        'Detección de intrusiones',
        'Visualización con Grafana',
        'Alertas automáticas'
      ],
      status: 'Completado',
      year: '2023',
      users: '2K+',
      github: 'https://github.com/username/network-monitor',
      demo: 'https://network-monitor-demo.com',
      image: '🌐📡'
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const getStatusColor = (status) => {
    const colors = {
      'Activo': '#00FF00',
      'En desarrollo': '#FFAA00',
      'Completado': '#0088FF',
      'Investigación': '#FF00FF'
    };
    return colors[status] || '#FFFFFF';
  };

  return (
    <section 
      id="projects"
      className="min-h-screen py-20 px-6 bg-black"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 font-space">
            <SectionTitle>
              Expediciones Espaciales
            </SectionTitle>
          </h2>
          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            Proyectos desarrollados en diferentes sectores del universo tecnológico. 
            Cada expedición representa una solución innovadora a desafíos complejos.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="px-6 py-3 rounded-full border font-mono text-sm transition-all duration-300 hover:glow-effect"
              style={{
                background: selectedCategory === category.id 
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'transparent',
                borderColor: selectedCategory === category.id 
                  ? '#FFFFFF60'
                  : '#FFFFFF20'
              }}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="project-card group relative overflow-hidden rounded-lg border glow-effect hover:scale-105 transition-all duration-500"
              style={{
                background: 'rgba(26, 26, 26, 0.8)',
                borderColor: '#FFFFFF20',
                backdropFilter: 'blur(10px)'
              }}
            >
              {/* Project Image */}
              <div 
                className="h-48 flex items-center justify-center text-6xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)'
                }}
              >
                {project.image}
                
                {/* Hover overlay */}
                <div 
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)'
                  }}
                />
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold font-space mb-2">{project.title}</h3>
                    <div className="flex items-center gap-2 text-sm opacity-60 font-mono">
                      <span>{project.year}</span>
                      <span>•</span>
                      <span>{project.users} usuarios</span>
                    </div>
                  </div>
                  <div 
                    className="px-2 py-1 rounded-full text-xs font-mono"
                    style={{
                      background: `${getStatusColor(project.status)}20`,
                      color: getStatusColor(project.status)
                    }}
                  >
                    {project.status}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm opacity-80 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold mb-2 font-space opacity-70">CARACTERÍSTICAS</h4>
                  <ul className="space-y-1 text-xs opacity-70">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div 
                          className="w-1 h-1 rounded-full"
                          style={{ background: getStatusColor(project.status) }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded text-xs font-mono border"
                        style={{
                          background: '#2A2A2A40',
                          borderColor: '#444444'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-3 py-2 text-center text-sm font-mono border rounded hover:glow-effect transition-all duration-300"
                    style={{
                      borderColor: '#FFFFFF40'
                    }}
                  >
                    GitHub
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-3 py-2 text-center text-sm font-mono border rounded hover:glow-effect transition-all duration-300"
                    style={{
                      borderColor: '#FFFFFF40',
                      background: 'rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Stats */}
        <div 
          className="mt-16 p-6 rounded-lg border text-center"
          style={{
            background: 'rgba(26, 26, 26, 0.5)',
            borderColor: '#444444'
          }}
        >
          <h3 className="text-2xl font-bold mb-6 font-space">Estadísticas de Expedición</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold font-space mb-2">{projects.length}</div>
              <div className="text-sm opacity-70">Proyectos Totales</div>
            </div>
            <div>
              <div className="text-3xl font-bold font-space mb-2">
                {projects.filter(p => p.status === 'Activo').length}
              </div>
              <div className="text-sm opacity-70">Activos</div>
            </div>
            <div>
              <div className="text-3xl font-bold font-space mb-2">68K+</div>
              <div className="text-sm opacity-70">Usuarios Totales</div>
            </div>
            <div>
              <div className="text-3xl font-bold font-space mb-2">5</div>
              <div className="text-sm opacity-70">Categorías</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}