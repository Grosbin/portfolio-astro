import { useState, useRef, useEffect } from 'react';
import BootScreen from './BootScreen.jsx';
import DarkVeil from './DarkVeil.jsx';

// Native browser window management system
export default function NativeWindowManager({ children, onTerminalCommand }) {
  const [showWelcome, setShowWelcome] = useState(true);
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });
  const [showBootScreen, setShowBootScreen] = useState(true);
  const [openWindows, setOpenWindows] = useState(new Map()); // Track native windows
  const [terminalWindow, setTerminalWindow] = useState(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Terminal content for native window
  const getTerminalContent = () => {
    return `<!DOCTYPE html>
<html>
<head>
  <title>Terminal - Roberto Betancourth</title>
  <meta charset="UTF-8">
  <style>
    body { 
      font-family: 'Courier New', monospace; 
      background: #000; 
      color: #00ff00;
      margin: 0;
      padding: 20px;
      height: 100vh;
      overflow: hidden;
    }
    .terminal-container {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .terminal-header {
      color: #00ff00;
      border-bottom: 1px solid #333;
      padding-bottom: 10px;
      margin-bottom: 15px;
    }
    .terminal-output {
      flex: 1;
      overflow-y: auto;
      padding-bottom: 10px;
      line-height: 1.4;
    }
    .terminal-input-line {
      display: flex;
      align-items: center;
      margin-top: auto;
    }
    .prompt {
      color: #00ff00;
      white-space: nowrap;
    }
    .command-input {
      background: transparent;
      border: none;
      color: #00ff00;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      outline: none;
      flex: 1;
      margin-left: 5px;
    }
    .cursor {
      color: #00ff00;
      animation: blink 1s infinite;
    }
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
    .output-line {
      margin: 2px 0;
    }
    .command-line {
      color: #ffffff;
    }
    .help-text {
      color: #ffff00;
    }
    .error-text {
      color: #ff4444;
    }
  </style>
</head>
<body>
  <div class="terminal-container">
    <div class="terminal-header">
      <div>Roberto Betancourth Terminal OS v1.0.0</div>
      <div>Ingeniero en Sistemas | SOC Analyst | Mobile Developer</div>
      <div>Type "help" for available commands</div>
    </div>
    
    <div class="terminal-output" id="terminal-output">
    </div>
    
    <div class="terminal-input-line">
      <span class="prompt">roberto@terminal:~$ </span>
      <input type="text" class="command-input" id="command-input" autofocus>
      <span class="cursor">█</span>
    </div>
  </div>

  <script>
    let commandHistory = [];
    let historyIndex = -1;
    let currentCommand = '';
    
    const outputElement = document.getElementById('terminal-output');
    const inputElement = document.getElementById('command-input');
    
    const availableCommands = {
      help: () => [
        'Available commands:',
        '  ls portfolio    - List all sections',
        '  open about      - Open About section',
        '  open projects   - Open Projects section', 
        '  open experience - Open Experience section',
        '  open contact    - Open Contact section',
        '  cat about.txt   - Show About content',
        '  whoami          - Show user info',
        '  contact         - Show contact information',
        '  location        - Show current location',
        '  clear           - Clear terminal',
        '  pwd             - Show current directory',
        ''
      ],
      'ls': (args) => {
        if (args.includes('portfolio')) {
          return [
            'portfolio/',
            '├── about.txt',
            '├── projects/',
            '├── experience/',
            '└── contact.txt',
            ''
          ];
        }
        return ['about.txt  projects/  experience/  contact.txt', ''];
      },
      whoami: () => ['Roberto Betancourth - Ingeniero en Sistemas | SOC Analyst', ''],
      location: () => ['Tegucigalpa, Honduras', ''],
      contact: () => [
        'Email: robertobetancourth96@gmail.com',
        'Phone: +504 88421892', 
        'LinkedIn: linkedin.com/in/roberto-betancourth',
        'GitHub: github.com/Grosbin',
        'Website: robertobetancourth.azurewebsites.net',
        ''
      ],
      pwd: () => ['/home/roberto/portfolio', ''],
      clear: () => {
        outputElement.innerHTML = '';
        return [];
      },
      'cat': (args) => {
        if (args.includes('about.txt')) {
          return [
            'Roberto Betancourth',
            '==================',
            '',
            'Ingeniero en Sistemas | SOC Analyst | Mobile Developer',
            'Especialista en Ciberseguridad con experiencia en análisis de',
            'vulnerabilidades, gestión de incidentes y desarrollo seguro.',
            '',
            'Educación:',
            '• Ingeniería en Sistemas - UNAH (2019-2023)',
            '• SOC/CTIS - IRSII Institute (2025)',
            '',
            'Certificaciones:',
            '• ISC2 - CC Certified in Cybersecurity',
            '• CISCO CCNA - Enterprise Networking & Security',
            '• CISCO Cybersecurity Analyst Career Path',
            ''
          ];
        }
        return [\`cat: \${args.join(' ')}: No such file or directory\`, ''];
      }
    };
    
    function openWindow(type) {
      // Send message to parent window to open section
      if (window.opener && !window.opener.closed) {
        window.opener.postMessage({ action: 'openWindow', type: type }, '*');
      }
    }
    
    function executeCommand(command) {
      const trimmedCommand = command.trim();
      if (!trimmedCommand) return;

      commandHistory.push(trimmedCommand);
      historyIndex = -1;
      
      const outputLines = [\`$ \${trimmedCommand}\`];
      const parts = trimmedCommand.split(' ');
      const cmd = parts[0];
      const args = parts.slice(1);

      if (cmd === 'open') {
        const section = args[0];
        if (['about', 'projects', 'experience', 'contact'].includes(section)) {
          openWindow(section);
          outputLines.push(\`Opening \${section} window...\`, '');
        } else {
          outputLines.push(\`open: \${section}: No such section\`, '');
        }
      } else if (availableCommands[cmd]) {
        const result = availableCommands[cmd](args);
        outputLines.push(...result);
      } else {
        outputLines.push(\`bash: \${cmd}: command not found\`, '');
      }

      // Add output to terminal
      outputLines.forEach(line => {
        const div = document.createElement('div');
        div.className = 'output-line';
        if (line.startsWith('$')) {
          div.className += ' command-line';
        } else if (line.includes('Available commands') || line.includes('Roberto Betancourth')) {
          div.className += ' help-text';
        } else if (line.includes('not found') || line.includes('No such')) {
          div.className += ' error-text';
        }
        div.textContent = line;
        outputElement.appendChild(div);
      });
      
      // Scroll to bottom
      outputElement.scrollTop = outputElement.scrollHeight;
      
      // Clear input
      inputElement.value = '';
    }
    
    inputElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeCommand(inputElement.value);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (commandHistory.length > 0) {
          historyIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
          inputElement.value = commandHistory[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex !== -1) {
          historyIndex = historyIndex + 1;
          if (historyIndex >= commandHistory.length) {
            historyIndex = -1;
            inputElement.value = '';
          } else {
            inputElement.value = commandHistory[historyIndex];
          }
        }
      }
    });
    
    // Focus input when window is clicked
    document.addEventListener('click', () => {
      inputElement.focus();
    });
  </script>
</body>
</html>`;
  };

  // Window content definitions
  const windowContent = {
    about: {
      title: 'Roberto Betancourth - About',
      content: `<!DOCTYPE html>
<html>
<head>
  <title>About - Roberto Betancourth</title>
  <meta charset="UTF-8">
  <style>
    body { 
      font-family: 'Courier New', monospace; 
      background: #f0f0f0; 
      margin: 20px; 
      line-height: 1.6;
      color: #333;
    }
    .container { max-width: 800px; margin: 0 auto; }
    h1 { color: #000; border-bottom: 2px solid #000; padding-bottom: 10px; }
    h2 { color: #333; margin-top: 30px; }
    .highlight { background: #ffff00; padding: 2px 4px; }
    .section { margin: 20px 0; padding: 15px; background: white; border: 1px solid #ccc; }
    ul { list-style-type: none; }
    li:before { content: "• "; color: #000; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Roberto Betancourth</h1>
    <div class="section">
      <p><strong>Ingeniero en Sistemas | SOC Analyst | Mobile Developer</strong></p>
      <p>¡Hola! Me llamo Roberto Betancourth y estoy apasionado por el desarrollo y la ciberseguridad. Me considero una persona orientada a la solución con mentalidad de aprendizaje continuo.</p>
    </div>
    
    <div class="section">
      <h2>Especialidades</h2>
      <ul>
        <li>Análisis de Vulnerabilidades y Gestión de Incidentes SOC</li>
        <li>Desarrollo Móvil Multiplataforma (React Native, Flutter)</li>
        <li>Análisis de Seguridad con Nmap, Wireshark, Burp Suite</li>
        <li>Implementación de autenticación biométrica</li>
        <li>Monitoreo y logging de seguridad</li>
        <li>Gestión de vulnerabilidades</li>
      </ul>
    </div>

    <div class="section">
      <h2>Educación</h2>
      <ul>
        <li>Ingeniería en Sistemas - UNAH (2019-2023)</li>
        <li>SOC/CTIS - IRSII Institute (2025)</li>
      </ul>
    </div>

    <div class="section">
      <h2>Certificaciones</h2>
      <ul>
        <li>ISC2 - CC Certified in Cybersecurity</li>
        <li>CISCO CCNA - Enterprise Networking & Security</li>
        <li>CISCO Cybersecurity Analyst Career Path</li>
      </ul>
    </div>

    <p><strong>Ubicación:</strong> Tegucigalpa, Honduras</p>
  </div>
</body>
</html>`
    },
    projects: {
      title: 'Roberto Betancourth - Projects',
      content: `<!DOCTYPE html>
<html>
<head>
  <title>Projects - Roberto Betancourth</title>
  <meta charset="UTF-8">
  <style>
    body { 
      font-family: 'Courier New', monospace; 
      background: #f0f0f0; 
      margin: 20px; 
      line-height: 1.6;
      color: #333;
    }
    .container { max-width: 900px; margin: 0 auto; }
    h1 { color: #000; border-bottom: 2px solid #000; padding-bottom: 10px; }
    .project { 
      margin: 20px 0; 
      padding: 20px; 
      background: white; 
      border: 1px solid #ccc; 
      border-left: 4px solid #000;
    }
    .project h3 { color: #000; margin-top: 0; }
    ul { list-style-type: none; }
    li:before { content: "▸ "; color: #000; font-weight: bold; }
    .tech-stack { 
      background: #e8e8e8; 
      padding: 10px; 
      margin: 10px 0; 
      border-radius: 4px; 
      font-size: 0.9em;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Proyectos Destacados</h1>
    
    <div class="project">
      <h3>1. Sistema de Autenticación Biométrica</h3>
      <ul>
        <li>Implementación de reconocimiento facial y huella dactilar</li>
        <li>Desarrollo multiplataforma</li>
        <li>Integración con sistemas de seguridad SOC</li>
      </ul>
      <div class="tech-stack"><strong>Tecnologías:</strong> React Native, OpenCV, Biometric APIs</div>
    </div>

    <div class="project">
      <h3>2. Plataforma de Gestión para Seguros de Automóviles</h3>
      <ul>
        <li>Participé en desarrollo en Seguros Atlántida</li>
        <li>Comunicaciones socket seguras</li>
        <li>Desarrollo de interfaces administrativas</li>
      </ul>
      <div class="tech-stack"><strong>Tecnologías:</strong> Java, WebSockets, OneSpan</div>
    </div>

    <div class="project">
      <h3>3. Aplicación Móvil "La Hora Del Té"</h3>
      <ul>
        <li>Sistemas de autenticación multifactor</li>
        <li>Gestión de sesiones de usuario</li>
      </ul>
      <div class="tech-stack"><strong>Tecnologías:</strong> React Native, OTP, Session Management</div>
    </div>

    <div class="project">
      <h3>4. Análisis de Vulnerabilidades y SOC</h3>
      <ul>
        <li>Identificación y corrección proactiva de vulnerabilidades</li>
        <li>Gestión de vulnerabilidades en aplicaciones móviles</li>
        <li>Análisis de tráfico con Wireshark</li>
        <li>Gestión de SIEM para correlación de eventos</li>
        <li>Procedimientos de respuesta a incidentes</li>
      </ul>
      <div class="tech-stack"><strong>Tecnologías:</strong> Nmap, Wireshark, Burp Suite, SIEM Tools</div>
    </div>

    <div class="project">
      <h3>5. Portfolio Terminal Interactivo</h3>
      <ul>
        <li>Terminal-style portfolio con React & Astro</li>
        <li>Diseño UX creativo y responsive</li>
        <li>Optimizado para móviles</li>
      </ul>
      <div class="tech-stack"><strong>Tecnologías:</strong> React, Astro, CSS Grid, Responsive Design</div>
    </div>
  </div>
</body>
</html>`
    },
    experience: {
      title: 'Roberto Betancourth - Experience',
      content: `<!DOCTYPE html>
<html>
<head>
  <title>Experience - Roberto Betancourth</title>
  <meta charset="UTF-8">
  <style>
    body { 
      font-family: 'Courier New', monospace; 
      background: #f0f0f0; 
      margin: 20px; 
      line-height: 1.6;
      color: #333;
    }
    .container { max-width: 900px; margin: 0 auto; }
    h1 { color: #000; border-bottom: 2px solid #000; padding-bottom: 10px; }
    .job { 
      margin: 20px 0; 
      padding: 20px; 
      background: white; 
      border: 1px solid #ccc;
      border-left: 4px solid #000;
    }
    .job h3 { color: #000; margin-top: 0; }
    .job-title { font-weight: bold; color: #333; }
    .company { font-style: italic; color: #666; }
    .period { font-size: 0.9em; color: #888; }
    ul { list-style-type: none; }
    li:before { content: "▸ "; color: #000; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Experiencia Profesional</h1>
    
    <div class="job">
      <h3>Desarrollo de app multiplataforma</h3>
      <div class="company">Beanario Software</div>
      <div class="period">2024 - 2025</div>
      <ul>
        <li>Implementación de autenticación biométrica</li>
        <li>Desarrollo e integré sistemas de reconocimiento facial y huella dactilar</li>
        <li>Monitoreo y logging de seguridad</li>
        <li>Análisis de dispositivos seguros</li>
      </ul>
    </div>

    <div class="job">
      <h3>Desarrollo de plataforma de gestión para seguros de automóviles</h3>
      <div class="company">Seguros Atlántida</div>
      <div class="period">Mayo 2023 - Nov 2023</div>
      <ul>
        <li>Firma electrónica: Integré soluciones OneSpan para garantizar la autenticidad</li>
        <li>Comunicaciones: Implementé conexiones socket seguras para transacciones en tiempo real</li>
        <li>Desarrollo de interfaces administrativas: Creé paneles seguros con controles de acceso apropiados</li>
      </ul>
    </div>

    <div class="job">
      <h3>Aplicación móvil "La Hora Del Té"</h3>
      <div class="company">Proyecto Independiente</div>
      <div class="period">Sep 2023 - Ene 2024</div>
      <ul>
        <li>Sistemas de autenticación multifactor: Implementé validación OTP para reforzar la seguridad de acceso</li>
        <li>Gestión de sesiones: Desarrollé mecanismos seguros de manejo de sesiones de usuario</li>
      </ul>
    </div>

    <div class="job">
      <h3>SOC Operations & Incident Response</h3>
      <div class="company">Google Cloud Platform</div>
      <div class="period">Experiencia Adicional</div>
      <ul>
        <li>Análisis de tráfico con Wireshark, gestión de SIEM para correlación de eventos</li>
        <li>Configuración de IDS/IPS, y procedimientos de respuesta a incidentes</li>
        <li>Reconocimiento con Nmap, testing de aplicaciones web con Burp Suite</li>
        <li>Administración de Proxmox y Windows Server, virtualización de entornos seguros</li>
        <li>Configuración de VPN empresariales, y hardening de sistemas Linux múltiples distribuciones</li>
      </ul>
    </div>
  </div>
</body>
</html>`
    },
    contact: {
      title: 'Roberto Betancourth - Contact',
      content: `<!DOCTYPE html>
<html>
<head>
  <title>Contact - Roberto Betancourth</title>
  <meta charset="UTF-8">
  <style>
    body { 
      font-family: 'Courier New', monospace; 
      background: #f0f0f0; 
      margin: 20px; 
      line-height: 1.8;
      color: #333;
    }
    .container { max-width: 700px; margin: 0 auto; }
    h1 { color: #000; border-bottom: 2px solid #000; padding-bottom: 10px; }
    .contact-section { 
      margin: 20px 0; 
      padding: 20px; 
      background: white; 
      border: 1px solid #ccc;
      border-left: 4px solid #000;
    }
    .contact-info { font-size: 1.1em; line-height: 1.8; }
    .contact-info a { color: #000; text-decoration: none; }
    .contact-info a:hover { text-decoration: underline; }
    .objective { 
      background: #e8f4fd; 
      padding: 15px; 
      border-left: 4px solid #0066cc; 
      margin: 20px 0; 
    }
    .tech-stack { 
      background: #f8f8f8; 
      padding: 15px; 
      margin: 15px 0; 
      border-radius: 4px; 
    }
    ul { list-style-type: none; }
    li:before { content: "▸ "; color: #000; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <h1>¡Conectemos!</h1>
    
    <div class="contact-section">
      <div class="contact-info">
        <p><strong>Email:</strong> <a href="mailto:robertobetancourth96@gmail.com">robertobetancourth96@gmail.com</a></p>
        <p><strong>Teléfono:</strong> +504 88421892</p>
        <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/roberto-betancourth" target="_blank">linkedin.com/in/roberto-betancourth</a></p>
        <p><strong>GitHub:</strong> <a href="https://github.com/Grosbin" target="_blank">github.com/Grosbin</a></p>
        <p><strong>Website:</strong> <a href="https://robertobetancourth.azurewebsites.net" target="_blank">robertobetancourth.azurewebsites.net</a></p>
      </div>
    </div>

    <div class="contact-section">
      <p><strong>Ubicación:</strong> Tegucigalpa, Honduras</p>
      <p><strong>Timezone:</strong> UTC-6</p>
    </div>

    <div class="objective">
      <h3>Objetivo Profesional</h3>
      <p>Consolidar mi carrera como SOC Analyst o CTIS, aplicando experiencia técnica en desarrollo seguro y análisis de vulnerabilidades para detección, análisis y respuesta a incidentes de seguridad en Security Operations Centers.</p>
    </div>

    <div class="contact-section">
      <h3>Abierto a:</h3>
      <ul>
        <li>Oportunidades SOC Analyst / CTIS</li>
        <li>Proyectos de Ciberseguridad</li>
        <li>Desarrollo móvil con enfoque en seguridad</li>
        <li>Consultoría en análisis de vulnerabilidades</li>
      </ul>
    </div>

    <div class="tech-stack">
      <h3>Tecnologías Principales</h3>
      <p>Nmap, Wireshark, Burp Suite, Kali Linux, SIEM, IDS/IPS, Python, Java, JavaScript, React Native, Docker, Azure Cloud, Linux</p>
    </div>
  </div>
</body>
</html>`
    }
  };

  // Available terminal commands
  const availableCommands = {
    help: () => [
      'Available commands:',
      '  ls portfolio    - List all sections',
      '  open about      - Open About section',
      '  open projects   - Open Projects section', 
      '  open experience - Open Experience section',
      '  open contact    - Open Contact section',
      '  cat about.txt   - Show About content',
      '  whoami          - Show user info',
      '  contact         - Show contact information',
      '  location        - Show current location',
      '  clear           - Clear terminal',
      '  pwd             - Show current directory',
      ''
    ],
    'ls': (args) => {
      if (args.includes('portfolio')) {
        return [
          'portfolio/',
          '├── about.txt',
          '├── projects/',
          '├── experience/',
          '└── contact.txt',
          ''
        ];
      }
      return ['about.txt  projects/  experience/  contact.txt', ''];
    },
    whoami: () => ['Roberto Betancourth - Ingeniero en Sistemas | SOC Analyst', ''],
    location: () => ['Tegucigalpa, Honduras', ''],
    contact: () => [
      'Email: robertobetancourth96@gmail.com',
      'Phone: +504 88421892', 
      'LinkedIn: linkedin.com/in/roberto-betancourth',
      'GitHub: github.com/Grosbin',
      'Website: robertobetancourth.azurewebsites.net',
      ''
    ],
    pwd: () => ['/home/roberto/portfolio', ''],
    clear: () => {
      setTerminalOutput([]);
      return [];
    },
    'cat': (args) => {
      if (args.includes('about.txt')) {
        return [
          'Roberto Betancourth',
          '==================',
          '',
          'Ingeniero en Sistemas | SOC Analyst | Mobile Developer',
          'Especialista en Ciberseguridad con experiencia en análisis de',
          'vulnerabilidades, gestión de incidentes y desarrollo seguro.',
          '',
          'Educación:',
          '• Ingeniería en Sistemas - UNAH (2019-2023)',
          '• SOC/CTIS - IRSII Institute (2025)',
          '',
          'Certificaciones:',
          '• ISC2 - CC Certified in Cybersecurity',
          '• CISCO CCNA - Enterprise Networking & Security',
          '• CISCO Cybersecurity Analyst Career Path',
          ''
        ];
      }
      return [`cat: ${args.join(' ')}: No such file or directory`, ''];
    }
  };

  // Open terminal in native window
  const openTerminalWindow = () => {
    // Close existing terminal window
    if (terminalWindow && !terminalWindow.closed) {
      terminalWindow.close();
    }

    // Calculate window size and position
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const width = Math.min(800, screenWidth * 0.6);
    const height = Math.min(600, screenHeight * 0.7);
    const left = (screenWidth - width) / 2;
    const top = (screenHeight - height) / 2;

    // Open terminal window
    const newTerminalWindow = window.open(
      'about:blank',
      'terminal_window',
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes,menubar=no,toolbar=no,location=no,status=no`
    );

    if (newTerminalWindow) {
      // Write terminal content
      newTerminalWindow.document.write(getTerminalContent());
      newTerminalWindow.document.close();
      
      // Store reference
      setTerminalWindow(newTerminalWindow);
      setIsTerminalOpen(true);

      // Handle window close event
      newTerminalWindow.addEventListener('beforeunload', () => {
        setTerminalWindow(null);
        setIsTerminalOpen(false);
      });

      return newTerminalWindow;
    } else {
      alert('Please allow popups for this site to use the terminal window.');
      return null;
    }
  };

  // Open native browser window
  const openNativeWindow = (type) => {
    const content = windowContent[type];
    if (!content) return;

    // Close existing window of same type
    const existingWindow = openWindows.get(type);
    if (existingWindow && !existingWindow.closed) {
      existingWindow.close();
    }

    // Calculate window position and size
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const width = Math.min(900, screenWidth * 0.7);
    const height = Math.min(700, screenHeight * 0.8);
    const left = (screenWidth - width) / 2;
    const top = (screenHeight - height) / 2;

    // Open new native browser window
    const newWindow = window.open(
      'about:blank',
      `window_${type}_${Date.now()}`,
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes,menubar=no,toolbar=no,location=no,status=no`
    );

    if (newWindow) {
      // Write content to the new window
      newWindow.document.write(content.content);
      newWindow.document.close();
      
      // Store window reference
      setOpenWindows(prev => new Map(prev.set(type, newWindow)));

      // Handle window close event
      newWindow.addEventListener('beforeunload', () => {
        setOpenWindows(prev => {
          const newMap = new Map(prev);
          newMap.delete(type);
          return newMap;
        });
      });

      return newWindow;
    } else {
      // Fallback if popup blocked
      alert('Please allow popups for this site to use native window mode. Trying to open window...');
      // Try again after user interaction
      setTimeout(() => openNativeWindow(type), 100);
    }
  };

  const executeCommand = (command) => {
    const trimmedCommand = command.trim();
    if (!trimmedCommand) return;

    setCommandHistory(prev => [...prev, trimmedCommand]);
    setHistoryIndex(-1);
    
    const output = [`$ ${trimmedCommand}`];
    const parts = trimmedCommand.split(' ');
    const cmd = parts[0];
    const args = parts.slice(1);

    if (cmd === 'open') {
      const section = args[0];
      if (['about', 'projects', 'experience', 'contact'].includes(section)) {
        const window = openNativeWindow(section);
        if (window) {
          output.push(`Opening ${section} in native browser window...`, '');
        } else {
          output.push(`Failed to open ${section} window. Please allow popups.`, '');
        }
      } else {
        output.push(`open: ${section}: No such section`, '');
      }
    } else if (availableCommands[cmd]) {
      const result = availableCommands[cmd](args);
      output.push(...result);
    } else {
      output.push(`bash: ${cmd}: command not found`, '');
    }

    setTerminalOutput(prev => [...prev, ...output]);
    setCurrentCommand('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentCommand('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[newIndex]);
        }
      }
    }
  };


  useEffect(() => {
    const handleRightClick = (e) => {
      e.preventDefault();
      setContextMenu({ show: true, x: e.clientX, y: e.clientY });
    };

    const handleClick = () => {
      setContextMenu({ show: false, x: 0, y: 0 });
    };

    // Handle messages from terminal window
    const handleMessage = (event) => {
      if (event.data && event.data.action === 'openWindow') {
        openNativeWindow(event.data.type);
      }
    };

    document.addEventListener('contextmenu', handleRightClick);
    document.addEventListener('click', handleClick);
    window.addEventListener('message', handleMessage);

    return () => {
      document.removeEventListener('contextmenu', handleRightClick);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleBootComplete = () => {
    setShowBootScreen(false);
  };

  // Cleanup windows on unmount
  useEffect(() => {
    return () => {
      openWindows.forEach((window) => {
        if (!window.closed) {
          window.close();
        }
      });
    };
  }, []);

  // Show boot screen first
  if (showBootScreen) {
    return <BootScreen onBootComplete={handleBootComplete} />;
  }

  return (
    <div className="fixed inset-0 w-screen h-screen font-mono text-black overflow-hidden" style={{ margin: 0, padding: 0 }}>
      {/* DarkVeil Background */}
      <div className="absolute inset-0 w-screen h-screen" style={{ zIndex: 1 }}>
        <DarkVeil
          hueShift={0}
          noiseIntensity={0.05}
          scanlineIntensity={0.1}
          speed={0.5}
          scanlineFrequency={1.0}
          warpAmount={0.3}
          resolutionScale={1.0}
        />
      </div>
      
      {/* Overlay for better readability - reduced opacity to show DarkVeil */}
      <div className="absolute inset-0 bg-black bg-opacity-5" style={{ zIndex: 2 }} />
      
      {/* Desktop Background */}
      <div className="relative w-screen h-screen" style={{ margin: 0, padding: 0, zIndex: 10 }}>
        
        {/* Desktop Icons */}
        <div className="absolute top-6 left-6 grid gap-6 z-30 mobile-icons md:grid-cols-1">
          <DesktopIcon 
            icon="💻" 
            label="Terminal" 
            onClick={() => openTerminalWindow()}
          />
          <DesktopIcon 
            icon="📄" 
            label="About" 
            onClick={() => openNativeWindow('about')}
          />
          <DesktopIcon 
            icon="💼" 
            label="Projects" 
            onClick={() => openNativeWindow('projects')}
          />
          <DesktopIcon 
            icon="🏢" 
            label="Experience" 
            onClick={() => openNativeWindow('experience')}
          />
          <DesktopIcon 
            icon="📧" 
            label="Contact" 
            onClick={() => openNativeWindow('contact')}
          />
        </div>

        {/* Welcome Message */}
        {showWelcome && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-50 bg-white border-2 border-black rounded-lg p-8 shadow-xl max-w-lg mobile-welcome">
            <h2 className="text-xl font-bold mb-4 font-mono">¡Bienvenido al Portfolio Terminal de Roberto!</h2>
            <div className="text-sm font-mono mb-6 text-left space-y-3">
              <div>
                <p className="font-bold">🖱️ Modo Visual:</p>
                <p>• Haz clic en los iconos del escritorio ⬆️</p>
                <p>• Las ventanas se abren en pestañas nativas</p>
                <p>• Usa los controles del navegador para gestionar</p>
              </div>
              <div>
                <p className="font-bold">💻 Terminal:</p>
                <p>• Haz clic en el icono "Terminal" para abrir</p>
                <p>• Escribe "help" para ver comandos</p>
                <p>• Usa "open [sección]" desde la terminal</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setShowWelcome(false);
                  openTerminalWindow();
                }}
                className="px-4 py-2 bg-black text-white font-mono hover:bg-gray-800 transition-colors mobile-button"
              >
                ¡Abrir Terminal!
              </button>
              <button 
                onClick={() => {
                  setShowWelcome(false);
                  openNativeWindow('about');
                }}
                className="px-4 py-2 bg-gray-200 text-black font-mono hover:bg-gray-300 transition-colors border border-black mobile-button"
              >
                ¡Comenzar Tour!
              </button>
            </div>
          </div>
        )}

        {/* Right Click Context Menu */}
        {contextMenu.show && (
          <div 
            className="absolute bg-white border-2 border-black rounded-lg shadow-lg z-50 font-mono text-sm"
            style={{ left: contextMenu.x, top: contextMenu.y }}
          >
            <div className="py-1">
              <button 
                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  openTerminalWindow();
                  setContextMenu({ show: false, x: 0, y: 0 });
                }}
              >
                💻 Abrir Terminal
              </button>
              <hr className="border-gray-300 my-1" />
              <button 
                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  openNativeWindow('about');
                  setContextMenu({ show: false, x: 0, y: 0 });
                }}
              >
                📄 Abrir About
              </button>
              <button 
                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  openNativeWindow('projects');
                  setContextMenu({ show: false, x: 0, y: 0 });
                }}
              >
                💼 Abrir Proyectos
              </button>
              <button 
                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  openNativeWindow('experience');
                  setContextMenu({ show: false, x: 0, y: 0 });
                }}
              >
                🏢 Abrir Experiencia
              </button>
              <button 
                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  openNativeWindow('contact');
                  setContextMenu({ show: false, x: 0, y: 0 });
                }}
              >
                📧 Abrir Contacto
              </button>
              <hr className="border-gray-300 my-1" />
              <button 
                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  setShowWelcome(true);
                  setContextMenu({ show: false, x: 0, y: 0 });
                }}
              >
                ❓ Mostrar Ayuda
              </button>
            </div>
          </div>
        )}
        
        {/* Status Panel */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-200 text-black p-3 border-t-2 border-black">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-sm font-mono font-bold">ROBERTO BETANCOURTH PORTFOLIO</div>
              <div className="text-xs font-mono text-gray-600">SOC Analyst | Mobile Developer</div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => openTerminalWindow()}
                className={`px-3 py-1 text-xs font-mono border-2 transition-all ${
                  isTerminalOpen
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-black border-gray-400 hover:bg-gray-100'
                }`}
              >
                💻 TERMINAL {isTerminalOpen ? '(OPEN)' : ''}
              </button>
              <div className="text-xs font-mono text-gray-600">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopIcon({ icon, label, onClick }) {
  return (
    <div 
      className="flex flex-col items-center cursor-pointer group p-2 rounded-lg hover:bg-gray-100 transition-colors"
      onClick={onClick}
      onDoubleClick={onClick}
    >
      <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="text-xs font-mono text-center bg-white px-2 py-1 rounded border border-black group-hover:bg-gray-100">
        {label}
      </span>
    </div>
  );
}