export const THEME_KEY = 'space-portfolio-theme';
export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light'
};

export function getTheme() {
  if (typeof window === 'undefined') return THEMES.DARK;
  
  const stored = localStorage.getItem(THEME_KEY);
  if (stored && Object.values(THEMES).includes(stored)) {
    return stored;
  }
  
  // Check system preference
  return window.matchMedia('(prefers-color-scheme: light)').matches 
    ? THEMES.LIGHT 
    : THEMES.DARK;
}

export function setTheme(theme) {
  if (typeof window === 'undefined') return;
  
  const validTheme = Object.values(THEMES).includes(theme) ? theme : THEMES.DARK;
  
  localStorage.setItem(THEME_KEY, validTheme);
  
  if (validTheme === THEMES.LIGHT) {
    document.body.classList.add('light');
    document.documentElement.classList.add('light');
  } else {
    document.body.classList.remove('light');
    document.documentElement.classList.remove('light');
  }
  
  // Dispatch event for components to listen
  window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme: validTheme } }));
}

export function toggleTheme() {
  const current = getTheme();
  const next = current === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
  setTheme(next);
  return next;
}

// Initialize theme on load
export function initTheme() {
  if (typeof window === 'undefined') return;
  
  const theme = getTheme();
  setTheme(theme);
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_KEY)) {
      setTheme(e.matches ? THEMES.LIGHT : THEMES.DARK);
    }
  });
}