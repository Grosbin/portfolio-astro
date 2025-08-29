import { useState, useEffect } from 'react';

export default function BootScreen({ onBootComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [bootComplete, setBootComplete] = useState(false);

  const bootMessages = [
    'Roberto Portfolio OS v1.0.0',
    'Copyright (c) 2025 Roberto Betancourth. All rights reserved.',
    '',
    'Initializing system components...',
    '[OK] Loading terminal interface',
    '[OK] Mounting portfolio filesystem',
    '[OK] Starting window manager',
    '[OK] Loading desktop environment',
    '[OK] Initializing network services',
    '[OK] Loading project database',
    '[OK] Starting security modules',
    '[OK] Mounting experience logs',
    '[OK] Loading contact services',
    '',
    'System ready.',
    'Welcome to Roberto Portfolio Terminal OS!',
    '',
    'Press any key to continue...'
  ];

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 300);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (currentStep >= bootMessages.length) {
      setBootComplete(true);
      // Auto-enter after 0.2 second when boot is complete
      setTimeout(() => {
        onBootComplete();
      }, 200);
      return;
    }

    const message = bootMessages[currentStep];
    let charIndex = 0;
    setCurrentMessage('');

    const typeMessage = () => {
      if (charIndex <= message.length) {
        setCurrentMessage(message.slice(0, charIndex));
        charIndex++;
        
        // Variable speed typing - much faster
        const delay = message === '' ? 20 : 
                     message.startsWith('[OK]') ? 8 :
                     message.includes('...') ? 12 : 5;
        
        setTimeout(typeMessage, delay);
      } else {
        // Message complete, move to next after delay - much faster
        setTimeout(() => {
          setCurrentStep(prev => prev + 1);
        }, message.startsWith('[OK]') ? 30 : 80);
      }
    };

    const initialDelay = currentStep === 0 ? 200 : 20;
    setTimeout(typeMessage, initialDelay);
  }, [currentStep]);


  return (
    <div className="fixed inset-0 boot-screen text-white font-mono overflow-hidden z-50">
      {/* Boot Screen Content */}
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 border-b border-gray-400 p-2 md:p-4">
          <div className="text-center">
            <div className="text-white text-sm md:text-lg font-bold">ROBERTO PORTFOLIO OS</div>
            <div className="text-gray-300 text-xs md:text-sm">Terminal Mode Activated</div>
          </div>
        </div>

        {/* Boot Messages */}
        <div className="flex-1 p-3 md:p-6 overflow-hidden">
          <div className="space-y-1">
            {/* Previous messages */}
            {bootMessages.slice(0, currentStep).map((message, index) => (
              <div key={index} className="text-xs md:text-sm leading-relaxed">
                {message === '' ? '\u00A0' : (
                  <span className={
                    message.startsWith('[OK]') ? 'text-gray-300' :
                    message.includes('Copyright') ? 'text-gray-400' :
                    message.includes('v1.0.0') ? 'text-white font-bold' :
                    'text-gray-200'
                  }>
                    {message}
                  </span>
                )}
              </div>
            ))}
            
            {/* Current typing message */}
            {currentStep < bootMessages.length && (
              <div className="text-xs md:text-sm leading-relaxed">
                <span className={
                  currentMessage.startsWith('[OK]') ? 'text-gray-300' :
                  currentMessage.includes('Copyright') ? 'text-gray-400' :
                  currentMessage.includes('v1.0.0') ? 'text-white font-bold' :
                  'text-gray-200'
                }>
                  {currentMessage}
                </span>
                <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                  █
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-gray-400 p-2 md:p-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 space-y-2 md:space-y-0">
            <div>System Status: {bootComplete ? 'READY' : 'BOOTING...'}</div>
            <div className="flex items-center space-x-2 md:space-x-4 text-xs">
              <div className="hidden md:block">Memory: 8GB</div>
              <div className="hidden sm:block">CPU: Portfolio Engine v2.0</div>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${bootComplete ? 'bg-white animate-pulse' : 'bg-gray-500 animate-pulse'}`}></div>
                {bootComplete ? 'READY' : 'LOADING'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading progress bar */}
      {!bootComplete && (
        <div className="absolute bottom-12 md:bottom-16 left-3 right-3 md:left-6 md:right-6">
          <div className="border border-gray-400 rounded p-2">
            <div className="text-xs text-gray-400 mb-2">Boot Progress:</div>
            <div className="w-full bg-black border border-gray-500 rounded overflow-hidden">
              <div 
                className="h-2 bg-white transition-all duration-300 ease-out"
                style={{ width: `${(currentStep / bootMessages.length) * 100}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-400 mt-1 text-right">
              {Math.round((currentStep / bootMessages.length) * 100)}%
            </div>
          </div>
        </div>
      )}

      {/* System ready indicator */}
      {bootComplete && (
        <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 px-2">
          <div className="text-white text-xs md:text-sm animate-pulse text-center">
            ⚡ System Ready - Entering Portfolio... ⚡
          </div>
        </div>
      )}

      {/* Scanlines effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="w-full h-full" style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.1) 2px, rgba(255, 255, 255, 0.1) 4px)'
        }}></div>
      </div>

      {/* Screen flicker effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-white boot-flicker"></div>
      </div>

    </div>
  );
}