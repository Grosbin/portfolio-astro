import { useState, useRef, useEffect } from 'react';
import BootScreen from './BootScreen.jsx';

export default function WindowManager({ children, onTerminalCommand }) {
  const [windows, setWindows] = useState([]);
  const [focusedWindow, setFocusedWindow] = useState(null);
  const [nextZIndex, setNextZIndex] = useState(100);
  const [terminalOutput, setTerminalOutput] = useState([
    'Portfolio Terminal v1.0.0',
    'Type "help" for available commands',
    ''
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentCommand, setCurrentCommand] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });
  const [showBootScreen, setShowBootScreen] = useState(true);
  const [terminalWindow, setTerminalWindow] = useState({
    position: { x: 0, y: 0 },
    size: { width: 800, height: 300 },
    isMinimized: false,
    isMaximized: false
  });
  const terminalRef = useRef(null);

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
    whoami: () => ['Roberto Betancourth - Mobile Developer & Cybersecurity Specialist', ''],
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
          'Mobile Developer & Cybersecurity Specialist',
          'Passionate about building secure digital solutions',
          'with focus on technical excellence and responsible innovation.',
          ''
        ];
      }
      return [`cat: ${args.join(' ')}: No such file or directory`, ''];
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
        openWindow(section);
        output.push(`Opening ${section} window...`, '');
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

  const openWindow = (type, initialPosition = null) => {
    const id = `${type}_${Date.now()}`;
    const defaultPositions = {
      about: { x: 100, y: 100 },
      projects: { x: 150, y: 150 }, 
      experience: { x: 200, y: 200 },
      contact: { x: 250, y: 250 }
    };

    const newWindow = {
      id,
      type,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      position: initialPosition || defaultPositions[type] || { x: 100, y: 100 },
      size: { width: 600, height: 400 },
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZIndex
    };

    setWindows(prev => [...prev, newWindow]);
    setFocusedWindow(id);
    setNextZIndex(prev => prev + 1);
  };

  const closeWindow = (id) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (focusedWindow === id) {
      setFocusedWindow(null);
    }
  };

  const minimizeWindow = (id) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  };

  const maximizeWindow = (id) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { 
        ...w, 
        isMaximized: !w.isMaximized,
        prevPosition: w.isMaximized ? w.prevPosition : w.position,
        prevSize: w.isMaximized ? w.prevSize : w.size,
        position: w.isMaximized ? (w.prevPosition || w.position) : { x: 0, y: 0 },
        size: w.isMaximized ? (w.prevSize || w.size) : { width: window.innerWidth, height: window.innerHeight - 60 }
      } : w
    ));
  };

  const focusWindow = (id) => {
    setFocusedWindow(id);
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: nextZIndex } : w
    ));
    setNextZIndex(prev => prev + 1);
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
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  useEffect(() => {
    // Initialize terminal position
    setTerminalWindow(prev => ({
      ...prev,
      position: { x: 50, y: window.innerHeight - 350 },
      size: { width: Math.min(800, window.innerWidth - 100), height: 300 }
    }));

    const handleRightClick = (e) => {
      e.preventDefault();
      setContextMenu({ show: true, x: e.clientX, y: e.clientY });
    };

    const handleClick = () => {
      setContextMenu({ show: false, x: 0, y: 0 });
    };

    document.addEventListener('contextmenu', handleRightClick);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('contextmenu', handleRightClick);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleBootComplete = () => {
    setShowBootScreen(false);
  };

  // Show boot screen first
  if (showBootScreen) {
    return <BootScreen onBootComplete={handleBootComplete} />;
  }

  return (
    <div className="fixed inset-0 w-screen h-screen font-mono text-black overflow-hidden" style={{ margin: 0, padding: 0, background: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 25%, #f5f5f5 50%, #e8e8e8 75%, #f0f0f0 100%)' }}>
      {/* Desktop Wallpaper Pattern */}
      <div 
        className="absolute inset-0 w-screen h-screen opacity-10" 
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #000000 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, #000000 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px, 25px 25px'
        }}
      />
      
      {/* Desktop Background with Interactive Icons */}
      <div className="relative w-screen h-screen" style={{ margin: 0, padding: 0 }}>
        
        {/* Desktop Icons for Non-Terminal Users */}
        <div className="absolute top-6 left-6 grid gap-6 z-30 mobile-icons md:grid-cols-1">
          <DesktopIcon 
            icon="📄" 
            label="About" 
            onClick={() => openWindow('about', { x: 50, y: 50 })}
          />
          <DesktopIcon 
            icon="💼" 
            label="Projects" 
            onClick={() => openWindow('projects', { x: 100, y: 100 })}
          />
          <DesktopIcon 
            icon="🏢" 
            label="Experience" 
            onClick={() => openWindow('experience', { x: 150, y: 150 })}
          />
          <DesktopIcon 
            icon="📧" 
            label="Contact" 
            onClick={() => openWindow('contact', { x: 200, y: 200 })}
          />
        </div>

        {/* Welcome Message for New Users */}
        {showWelcome && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-50 bg-white border-2 border-black rounded-lg p-8 shadow-xl max-w-lg mobile-welcome">
            <h2 className="text-xl font-bold mb-4 font-mono">¡Bienvenido al Portfolio Terminal de Roberto!</h2>
            <div className="text-sm font-mono mb-6 text-left space-y-3">
              <div>
                <p className="font-bold">🖱️ Modo Visual (Recomendado):</p>
                <p>• Haz clic en los iconos del escritorio ⬆️</p>
                <p>• Arrastra las ventanas para moverlas</p>
                <p>• Usa los botones de colores para controlar ventanas</p>
                <p>• Clic derecho para menú contextual</p>
              </div>
              <div>
                <p className="font-bold">💻 Modo Terminal (Para Expertos):</p>
                <p>• Escribe "help" para ver comandos</p>
                <p>• Prueba: "open projects" o "open about"</p>
                <p>• Usa "ls portfolio" para listar secciones</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setShowWelcome(false);
                  openWindow('about', { x: 50, y: 50 });
                }}
                className="px-4 py-2 bg-black text-white font-mono hover:bg-gray-800 transition-colors mobile-button"
              >
                ¡Comenzar Tour!
              </button>
              <button 
                onClick={() => setShowWelcome(false)}
                className="px-4 py-2 bg-gray-200 text-black font-mono hover:bg-gray-300 transition-colors border border-black mobile-button"
              >
                ¡Explorar Solo!
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
                  openWindow('about', { x: 50, y: 50 });
                  setContextMenu({ show: false, x: 0, y: 0 });
                }}
              >
                📄 Abrir About
              </button>
              <button 
                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  openWindow('projects', { x: 100, y: 100 });
                  setContextMenu({ show: false, x: 0, y: 0 });
                }}
              >
                💼 Abrir Proyectos
              </button>
              <button 
                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  openWindow('experience', { x: 150, y: 150 });
                  setContextMenu({ show: false, x: 0, y: 0 });
                }}
              >
                🏢 Abrir Experiencia
              </button>
              <button 
                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  openWindow('contact', { x: 200, y: 200 });
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
        
        {/* Terminal Window */}
        {!terminalWindow.isMinimized && (
          <TerminalWindow
            terminalWindow={terminalWindow}
            setTerminalWindow={setTerminalWindow}
            terminalOutput={terminalOutput}
            currentCommand={currentCommand}
            setCurrentCommand={setCurrentCommand}
            handleKeyDown={handleKeyDown}
            terminalRef={terminalRef}
          />
        )}

        {/* Taskbar */}
        <div className="fixed bottom-0 left-0 right-0 h-12 bg-gray-100 border-t-2 border-black flex items-center px-4 z-40">
          <div className="flex space-x-2">
            <div className="px-2 py-1 bg-black text-white text-xs font-mono rounded">
              TERMINAL OS
            </div>
            
            {/* Terminal button */}
            <button
              onClick={() => setTerminalWindow(prev => ({ ...prev, isMinimized: !prev.isMinimized }))}
              className={`px-3 py-1 text-sm font-mono border-2 transition-all ${
                !terminalWindow.isMinimized
                  ? 'bg-black text-white border-black' 
                  : 'bg-gray-300 text-gray-600 border-gray-400 hover:bg-gray-400'
              }`}
            >
              [TERMINAL]
            </button>
            
            {windows.filter(w => !w.isMinimized).map(window => (
              <button
                key={window.id}
                onClick={() => focusWindow(window.id)}
                className={`px-3 py-1 text-sm font-mono border-2 transition-all ${
                  focusedWindow === window.id 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-black border-black hover:bg-gray-200'
                }`}
              >
                [{window.title.toUpperCase()}]
              </button>
            ))}
            {windows.filter(w => w.isMinimized).map(window => (
              <button
                key={window.id}
                onClick={() => {
                  setWindows(prev => prev.map(w => 
                    w.id === window.id ? { ...w, isMinimized: false } : w
                  ));
                  focusWindow(window.id);
                }}
                className="px-3 py-1 text-sm font-mono bg-gray-300 text-gray-600 border-2 border-gray-400 hover:bg-gray-400"
              >
                [{window.title.toUpperCase()}]
              </button>
            ))}
          </div>
          <div className="flex-1"></div>
          <div className="text-xs font-mono text-black">
            {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Windows */}
        {windows.filter(w => !w.isMinimized).map(window => (
          <Window
            key={window.id}
            window={window}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onMaximize={() => maximizeWindow(window.id)}
            onFocus={() => focusWindow(window.id)}
            isFocused={focusedWindow === window.id}
            setWindows={setWindows}
          />
        ))}
      </div>
    </div>
  );
}

function TerminalWindow({ terminalWindow, setTerminalWindow, terminalOutput, currentCommand, setCurrentCommand, handleKeyDown, terminalRef }) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  const startDrag = (clientX, clientY) => {
    if (!windowRef.current) return;
    
    setIsDragging(true);
    setDragStart({
      x: clientX - terminalWindow.position.x,
      y: clientY - terminalWindow.position.y
    });
  };

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls')) return;
    e.preventDefault();
    e.stopPropagation();
    startDrag(e.clientX, e.clientY);
  };

  const handleTouchStart = (e) => {
    if (e.target.closest('.window-controls')) return;
    e.preventDefault();
    e.stopPropagation();
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
  };

  const moveTo = (clientX, clientY) => {
    if (!isDragging || !windowRef.current) return;
    
    const browserWindow = globalThis.window;
    
    const newX = Math.max(0, Math.min(browserWindow.innerWidth - terminalWindow.size.width, clientX - dragStart.x));
    const newY = Math.max(0, Math.min(browserWindow.innerHeight - terminalWindow.size.height - 48, clientY - dragStart.y));
    
    // Update DOM directly for smooth movement
    windowRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
    
    // Throttle state updates
    if (!windowRef.current.terminalPendingUpdate) {
      windowRef.current.terminalPendingUpdate = true;
      requestAnimationFrame(() => {
        setTerminalWindow(prev => ({
          ...prev,
          position: { x: newX, y: newY }
        }));
        windowRef.current.terminalPendingUpdate = false;
      });
    }
  };

  const handleMouseMove = (e) => {
    moveTo(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    moveTo(touch.clientX, touch.clientY);
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      const handleMouseMoveGlobal = (e) => handleMouseMove(e);
      const handleTouchMoveGlobal = (e) => handleTouchMove(e);
      const handleMouseUpGlobal = () => stopDrag();
      const handleTouchEndGlobal = () => stopDrag();
      
      document.addEventListener('mousemove', handleMouseMoveGlobal);
      document.addEventListener('mouseup', handleMouseUpGlobal);
      document.addEventListener('touchmove', handleTouchMoveGlobal, { passive: false });
      document.addEventListener('touchend', handleTouchEndGlobal);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMoveGlobal);
        document.removeEventListener('mouseup', handleMouseUpGlobal);
        document.removeEventListener('touchmove', handleTouchMoveGlobal);
        document.removeEventListener('touchend', handleTouchEndGlobal);
      };
    }
  }, [isDragging, dragStart, terminalWindow.position]);

  const windowStyle = {
    transform: `translate(${terminalWindow.position.x}px, ${terminalWindow.position.y}px)`,
    width: `${terminalWindow.size.width}px`,
    height: `${terminalWindow.size.height}px`,
    minWidth: `${terminalWindow.size.width}px`,
    maxWidth: `${terminalWindow.size.width}px`,
    minHeight: `${terminalWindow.size.height}px`,
    maxHeight: `${terminalWindow.size.height}px`,
    zIndex: 45,
    willChange: isDragging ? 'transform' : 'auto'
  };

  return (
    <div
      ref={windowRef}
      className={`absolute bg-black rounded-lg shadow-2xl border-2 border-black ${
        isDragging ? 'window-dragging' : 'window-draggable'
      }`}
      style={{
        ...windowStyle,
        resize: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none'
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-4 py-2 rounded-t-lg cursor-move border-b-2 select-none bg-gray-200 text-black border-black"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{ touchAction: 'none' }}
      >
        <div className="text-sm font-bold font-mono">[TERMINAL]</div>
        <div className="window-controls flex items-center space-x-2">
          <button
            onClick={(e) => { 
              e.stopPropagation(); 
              setTerminalWindow(prev => ({ ...prev, isMinimized: true }));
            }}
            className="w-4 h-4 rounded-full bg-yellow-500 hover:bg-yellow-600 border border-black"
            title="Minimize"
          />
          <button
            onClick={(e) => { 
              e.stopPropagation(); 
              setTerminalWindow(prev => ({ 
                ...prev, 
                isMaximized: !prev.isMaximized,
                prevPosition: prev.isMaximized ? prev.prevPosition : prev.position,
                prevSize: prev.isMaximized ? prev.prevSize : prev.size,
                position: prev.isMaximized ? (prev.prevPosition || prev.position) : { x: 0, y: 0 },
                size: prev.isMaximized ? (prev.prevSize || prev.size) : { width: window.innerWidth, height: window.innerHeight - 48 }
              }));
            }}
            className="w-4 h-4 rounded-full bg-green-500 hover:bg-green-600 border border-black"
            title="Maximize"
          />
          <button
            onClick={(e) => { 
              e.stopPropagation(); 
              setTerminalWindow(prev => ({ ...prev, isMinimized: true }));
            }}
            className="w-4 h-4 rounded-full bg-red-500 hover:bg-red-600 border border-black"
            title="Close"
          />
        </div>
      </div>

      {/* Terminal Content */}
      <div className="h-full overflow-hidden rounded-b-lg bg-black">
        <div ref={terminalRef} className="h-full overflow-y-auto px-4 py-2 bg-black">
          {terminalOutput.map((line, index) => (
            <div key={index} className="text-green-400 text-sm leading-relaxed font-mono">
              {line}
            </div>
          ))}
          <div className="flex items-center text-green-400 text-sm font-mono">
            <span className="text-white">roberto@terminal</span>
            <span className="text-green-400">:~$ </span>
            <input
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none flex-1 text-green-400 ml-1 font-mono"
              placeholder=""
              autoFocus
            />
            <span className="animate-pulse text-white">█</span>
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

function Window({ window: windowData, onClose, onMinimize, onMaximize, onFocus, isFocused, setWindows }) {
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls')) return;
    
    console.log('Mouse down on window:', windowData.title); // Debug
    e.preventDefault();
    e.stopPropagation();
    
    onFocus();
    setIsDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !windowRef.current) return;
    
    const deltaX = e.clientX - lastPos.x;
    const deltaY = e.clientY - lastPos.y;
    
    const newX = Math.max(0, Math.min(window.innerWidth - windowData.size.width, windowData.position.x + deltaX));
    const newY = Math.max(0, Math.min(window.innerHeight - windowData.size.height - 48, windowData.position.y + deltaY));
    
    console.log('Moving window to:', newX, newY); // Debug
    
    setWindows(prev => prev.map(w => 
      w.id === windowData.id 
        ? { ...w, position: { x: newX, y: newY } }
        : w
    ));
    
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    console.log('Mouse up, stopping drag'); // Debug
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      console.log('Adding global listeners'); // Debug
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        console.log('Removing global listeners'); // Debug
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, lastPos, windowData]);

  const windowStyle = {
    transform: `translate(${windowData.position.x}px, ${windowData.position.y}px)`,
    width: `${windowData.size.width}px`,
    height: `${windowData.size.height}px`,
    minWidth: `${windowData.size.width}px`,
    maxWidth: `${windowData.size.width}px`,
    minHeight: `${windowData.size.height}px`,
    maxHeight: `${windowData.size.height}px`,
    zIndex: windowData.zIndex,
    willChange: isDragging ? 'transform' : 'auto'
  };

  return (
    <div
      ref={windowRef}
      className={`absolute bg-white rounded-lg shadow-2xl border-2 ${
        isFocused ? 'border-black shadow-xl' : 'border-gray-400 shadow-lg'
      } ${isDragging ? 'window-dragging' : 'window-draggable'}`}
      style={{
        ...windowStyle,
        resize: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none'
      }}
      onClick={onFocus}
    >
      {/* Title bar */}
      <div
        className={`flex items-center justify-between px-4 py-2 rounded-t-lg cursor-move border-b-2 select-none ${
          isFocused ? 'bg-gray-200 text-black border-black' : 'bg-gray-100 text-gray-600 border-gray-300'
        } ${isDragging ? 'bg-blue-200' : ''}`}
        onMouseDown={handleMouseDown}
        style={{ touchAction: 'none' }}
      >
        <div className="text-sm font-bold font-mono">[{windowData.title.toUpperCase()}]</div>
        <div className="window-controls flex items-center space-x-2">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-4 h-4 rounded-full bg-yellow-500 hover:bg-yellow-600 border border-black"
            title="Minimize"
          />
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            className="w-4 h-4 rounded-full bg-green-500 hover:bg-green-600 border border-black"
            title="Maximize"
          />
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-4 h-4 rounded-full bg-red-500 hover:bg-red-600 border border-black"
            title="Close"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 h-full overflow-auto rounded-b-lg bg-white">
        <WindowContent type={windowData.type} />
      </div>
    </div>
  );
}

function WindowContent({ type }) {
  const content = {
    about: {
      title: 'About Me',
      content: `Roberto Betancourth
      
Mobile Developer & Cybersecurity Specialist

Passionate about building secure digital solutions with focus on technical excellence and responsible innovation. 

I specialize in creating robust mobile applications while ensuring the highest security standards throughout the development lifecycle.

Skills:
• Mobile Development (iOS/Android)
• Cybersecurity & Penetration Testing
• Secure Code Review
• Risk Assessment & Mitigation
• System Architecture Design`
    },
    projects: {
      title: 'Projects',
      content: `Recent Projects
      
1. SecureChat Mobile App
   - End-to-end encrypted messaging
   - React Native & Node.js
   - Advanced security protocols
   
2. VulnScanner Pro
   - Automated vulnerability assessment tool
   - Python & Docker
   - CI/CD security integration
   
3. Portfolio Terminal
   - Interactive terminal-style portfolio
   - React & Astro framework
   - Creative UX design`
    },
    experience: {
      title: 'Experience',
      content: `Professional Experience
      
Senior Mobile Developer
TechSecure Solutions (2022 - Present)
• Led development of secure mobile banking app
• Implemented security best practices
• Mentored junior developers

Cybersecurity Analyst
CyberDefense Corp (2020 - 2022)
• Conducted penetration testing
• Performed security audits
• Developed security protocols

Mobile Developer
AppInnovate (2018 - 2020)
• Built React Native applications
• Integrated security features
• Collaborated with security teams`
    },
    contact: {
      title: 'Contact',
      content: `Get In Touch
      
Email: roberto.betancourth@example.com
LinkedIn: linkedin.com/in/roberto-betancourth
GitHub: github.com/roberto-betancourth

Location: Remote / Available Worldwide
Timezone: UTC-5

Open to:
• Full-time opportunities
• Consulting projects
• Security audits
• Mobile development contracts

Preferred Technologies:
React Native, Swift, Kotlin, Python, Node.js, Docker, AWS`
    }
  };

  const sectionData = content[type] || { title: 'Unknown', content: 'Content not found' };

  return (
    <div className="h-full">
      <h2 className="text-xl font-bold mb-4 border-b-2 border-black pb-2 font-mono">
        {sectionData.title.toUpperCase()}
      </h2>
      <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono text-black">
        {sectionData.content}
      </pre>
    </div>
  );
}