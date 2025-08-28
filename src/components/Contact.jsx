import { useState } from 'react';
import SectionTitle from './SectionTitle.jsx';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const communicationChannels = [
    {
      id: 'email',
      name: 'Transmisión Directa',
      value: 'tu@email.com',
      icon: '📡',
      status: 'ACTIVO',
      description: 'Canal principal de comunicación'
    },
    {
      id: 'linkedin',
      name: 'Red Profesional Galáctica',
      value: 'linkedin.com/in/tu-perfil',
      icon: '🌐',
      status: 'ACTIVO',
      description: 'Conexiones profesionales'
    },
    {
      id: 'github',
      name: 'Repositorio de Código',
      value: 'github.com/tu-usuario',
      icon: '👨‍💻',
      status: 'ACTIVO',
      description: 'Código y proyectos'
    },
    {
      id: 'twitter',
      name: 'Frecuencia Pública',
      value: 'twitter.com/tu-usuario',
      icon: '🐦',
      status: 'ACTIVO',
      description: 'Actualizaciones y pensamientos'
    }
  ];

  const missionStatus = {
    availability: 'DISPONIBLE',
    location: 'Remoto • Tierra',
    timezone: 'UTC-6 (América Central)',
    responseTime: '< 24 horas terrestres',
    languages: ['Español', 'Inglés', 'JavaScript', 'Python']
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    alert('¡Transmisión enviada exitosamente! Responderé en menos de 24 horas terrestres.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: 'normal'
    });
    setIsSubmitting(false);
  };

  return (
    <section 
      id="contact"
      className="min-h-screen py-20 px-6 bg-black"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 font-space">
            <SectionTitle>
              Centro de Comunicaciones
            </SectionTitle>
          </h2>
          <p className="text-lg opacity-70 max-w-2xl mx-auto mb-8">
            Establece contacto para nuevas misiones, colaboraciones o 
            emergencias técnicas. Todos los canales están monitoreados 24/7.
          </p>

          {/* Mission Status */}
          <div 
            className="inline-flex items-center gap-4 px-6 py-3 rounded-full border font-mono text-sm"
            style={{
              background: 'rgba(0, 255, 0, 0.1)',
              borderColor: '#00FF0040'
            }}
          >
            <div className="w-3 h-3 rounded-full animate-pulse bg-green-400" />
            <span>ESTADO: {missionStatus.availability}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Mission Control Form */}
          <div>
            <div 
              className="p-8 rounded-lg border"
              style={{
                background: 'rgba(26, 26, 26, 0.8)',
                borderColor: '#FFFFFF20',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold font-space mb-2">Iniciar Transmisión</h3>
                <div className="flex items-center gap-2 text-sm font-mono opacity-60">
                  <div className="w-2 h-2 rounded-full animate-pulse bg-blue-400" />
                  <span>CANAL SEGURO ESTABLECIDO</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Sender Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 font-space">
                      Identificación del Emisor
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded border bg-transparent transition-all duration-300 focus:glow-effect"
                      style={{
                        borderColor: '#444444'
                      }}
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 font-space">
                      Canal de Respuesta
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded border bg-transparent transition-all duration-300 focus:glow-effect"
                      style={{
                        borderColor: '#444444'
                      }}
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                {/* Priority & Subject */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 font-space">
                      Prioridad de Misión
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded border bg-transparent transition-all duration-300 focus:glow-effect"
                      style={{
                        borderColor: '#444444',
                        background: '#1A1A1A'
                      }}
                    >
                      <option value="low">Baja • Consulta General</option>
                      <option value="normal">Normal • Colaboración</option>
                      <option value="high">Alta • Proyecto Urgente</option>
                      <option value="critical">Crítica • Emergencia</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 font-space">
                      Asunto de la Misión
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded border bg-transparent transition-all duration-300 focus:glow-effect"
                      style={{
                        borderColor: '#444444'
                      }}
                      placeholder="Resumen de la misión o consulta"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-2 font-space">
                    Detalles de la Transmisión
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded border bg-transparent transition-all duration-300 focus:glow-effect resize-none"
                    style={{
                      borderColor: '#444444'
                    }}
                    placeholder="Describe tu proyecto, consulta o propuesta de colaboración..."
                  />
                  <div className="text-xs opacity-60 mt-2 font-mono">
                    {formData.message.length}/1000 caracteres
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded border font-medium transition-all duration-300 hover:scale-105 glow-effect disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                    borderColor: '#FFFFFF40'
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin border-white" />
                      Transmitiendo...
                    </span>
                  ) : (
                    '🚀 Enviar Transmisión'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Communication Channels */}
          <div className="space-y-8">
            {/* Status Panel */}
            <div 
              className="p-6 rounded-lg border"
              style={{
                background: 'rgba(26, 26, 26, 0.5)',
                borderColor: '#444444'
              }}
            >
              <h3 className="text-xl font-bold mb-4 font-space">Estado de la Misión</h3>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="opacity-70">Disponibilidad:</span>
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    {missionStatus.availability}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Ubicación:</span>
                  <span>{missionStatus.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Zona Horaria:</span>
                  <span>{missionStatus.timezone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Tiempo de Respuesta:</span>
                  <span>{missionStatus.responseTime}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="opacity-70">Idiomas:</span>
                  <div className="text-right">
                    {missionStatus.languages.map((lang, index) => (
                      <div key={index}>{lang}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Communication Channels */}
            <div>
              <h3 className="text-xl font-bold mb-6 font-space">Canales de Comunicación</h3>
              <div className="space-y-4">
                {communicationChannels.map((channel) => (
                  <div 
                    key={channel.id}
                    className="channel-card p-4 rounded border hover:scale-105 transition-all duration-300 glow-effect cursor-pointer"
                    style={{
                      background: 'rgba(26, 26, 26, 0.3)',
                      borderColor: '#444444'
                    }}
                    onClick={() => {
                      if (channel.id === 'email') {
                        window.location.href = `mailto:${channel.value}`;
                      } else {
                        window.open(`https://${channel.value}`, '_blank');
                      }
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{channel.icon}</span>
                        <div>
                          <h4 className="font-semibold">{channel.name}</h4>
                          <p className="text-sm opacity-70">{channel.description}</p>
                        </div>
                      </div>
                      <div 
                        className="px-2 py-1 rounded text-xs font-mono"
                        style={{
                          background: 'rgba(0, 255, 0, 0.2)',
                          color: '#00FF00'
                        }}
                      >
                        {channel.status}
                      </div>
                    </div>
                    <div className="text-sm font-mono opacity-60 ml-11">
                      {channel.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Protocol */}
            <div 
              className="p-4 rounded border"
              style={{
                background: 'rgba(255, 0, 0, 0.1)',
                borderColor: '#FF000040'
              }}
            >
              <h4 className="font-bold mb-2 font-space flex items-center gap-2">
                <span>🚨</span>
                Protocolo de Emergencia
              </h4>
              <p className="text-sm opacity-80">
                Para vulnerabilidades críticas o emergencias de seguridad, 
                utiliza el canal de transmisión directa con prioridad CRÍTICA.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}