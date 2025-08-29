// Window management configuration
export const WINDOW_MODES = {
  NATIVE: 'native',      // Uses browser native windows (window.open)
  CUSTOM: 'custom'       // Uses custom draggable windows
};

// Default window mode - change this to switch between modes
export const DEFAULT_WINDOW_MODE = WINDOW_MODES.NATIVE;

// Native window configuration
export const NATIVE_WINDOW_CONFIG = {
  defaultWidth: 900,
  defaultHeight: 700,
  features: {
    scrollbars: true,
    resizable: true,
    menubar: false,
    toolbar: false,
    location: false,
    status: false
  }
};

// Custom window configuration  
export const CUSTOM_WINDOW_CONFIG = {
  defaultSize: { width: 600, height: 400 },
  minSize: { width: 300, height: 200 },
  positions: {
    about: { x: 100, y: 100 },
    projects: { x: 150, y: 150 },
    experience: { x: 200, y: 200 },
    contact: { x: 250, y: 250 }
  }
};