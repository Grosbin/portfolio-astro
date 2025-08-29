import { useState, useEffect } from 'react';

const TerminalWindow = ({ 
  title = "SECURE_TERMINAL", 
  commands = [], 
  className = "",
  autoPlay = false,
  typingSpeed = 50 
}) => {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!autoPlay || commands.length === 0) return;

    const command = commands[currentCommandIndex];
    if (!command) return;

    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex <= command.input.length) {
        setCurrentText(command.input.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        
        setTimeout(() => {
          setCurrentCommandIndex((prev) => (prev + 1) % commands.length);
          setCurrentText('');
        }, 2000);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [currentCommandIndex, autoPlay, commands, typingSpeed]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const currentCommand = commands[currentCommandIndex] || { input: '', output: [] };

  return (
    <div className={`bg-cyber-void border border-cyber-matrix rounded-lg overflow-hidden shadow-lg ${className}`}>
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-cyber-surface border-b border-cyber-matrix/50">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-cyber-alert animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-cyber-warning animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-cyber-matrix animate-pulse"></div>
          </div>
          <span className="text-cyber-text-secondary text-sm font-terminal">{title}</span>
        </div>
        
        <div className="flex items-center gap-2 text-xs font-terminal text-cyber-text-muted">
          <span className="px-2 py-1 bg-cyber-matrix/20 rounded text-cyber-matrix">SECURE</span>
          <span>v2.1.0</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 font-terminal text-sm min-h-[200px] bg-cyber-void/50">
        {/* Previous Commands */}
        {commands.slice(0, currentCommandIndex).map((cmd, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center mb-1">
              <span className="text-cyber-matrix">root@cyberspace</span>
              <span className="text-cyber-text-tertiary">:~$ </span>
              <span className="text-cyber-text-secondary">{cmd.input}</span>
            </div>
            {cmd.output.map((line, lineIndex) => (
              <div key={lineIndex} className="text-cyber-text-secondary pl-4 opacity-80">
                {line}
              </div>
            ))}
          </div>
        ))}

        {/* Current Command */}
        <div className="flex items-center">
          <span className="text-cyber-matrix">root@cyberspace</span>
          <span className="text-cyber-text-tertiary">:~$ </span>
          <span className="text-cyber-text-secondary">{currentText}</span>
          {showCursor && <span className="text-cyber-matrix animate-pulse">█</span>}
        </div>

        {/* Current Command Output */}
        {currentText === currentCommand.input && currentCommand.output.length > 0 && (
          <div className="mt-2">
            {currentCommand.output.map((line, index) => (
              <div key={index} className="text-cyber-text-secondary pl-4 opacity-80 animate-system-boot">
                {line}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TerminalWindow;