# 🚀 Portafolio Espacial - Space Portfolio

Un portafolio web profesional con temática espacial/astronauta para desarrolladores móviles e ingenieros en sistemas especializados en ciberseguridad.

## 🌌 Características

### ✨ Diseño y Temática
- **Temática Espacial**: Astronauta, galaxia, espacio, nave espacial, universo
- **Paleta Monocromática**: Diseño elegante en escala de grises con dos themes
- **Dark/Light Mode**: Sistema completo de themes con persistencia local
- **Responsive Design**: Optimizado para todos los dispositivos
- **Accesibilidad**: WCAG 2.1 compliant con navegación por teclado

### 🛸 Componentes Principales
- **Galaxy Background**: Componente 3D interactivo con partículas monocromáticas
- **Hero Section**: Aterrizaje espacial con animaciones GSAP
- **About Section**: Panel de control de astronauta con typing effects
- **Experience Section**: Línea temporal de "misiones espaciales"
- **Projects Section**: Expediciones y descubrimientos con filtros
- **Contact Section**: Centro de comunicaciones con formulario funcional

### 🎯 Tecnologías Utilizadas
- **Framework**: Astro 5.x
- **UI Components**: React 19
- **Animaciones**: GSAP con ScrollTrigger
- **3D Graphics**: OGL para el componente Galaxy
- **Styling**: Tailwind CSS
- **Motion**: Framer Motion
- **Build**: Vite

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

### Scripts Disponibles
```json
{
  "dev": "astro dev",
  "build": "astro build", 
  "preview": "astro preview"
}
```

## 🎨 Personalización

### 1. Información Personal
Edita los siguientes archivos para personalizar con tu información:

**Hero Section** (`src/components/Hero.jsx`):
```jsx
// Cambiar nombre y títulos
<h1>Tu Nombre</h1>
<h2>Desarrollador Móvil • Ingeniero en Sistemas</h2>
```

**About Section** (`src/components/About.jsx`):
```jsx
// Actualizar skills, certificaciones y bio
const skills = [
  { name: 'Tu Skill', level: 95, description: 'Tu descripción' }
  // ...
];
```

**Experience Section** (`src/components/Experience.jsx`):
```jsx
// Agregar tu experiencia laboral
const missions = [
  {
    title: 'Tu Puesto',
    company: 'Tu Empresa',
    period: '2023 - Presente',
    // ...
  }
];
```

**Projects Section** (`src/components/Projects.jsx`):
```jsx
// Mostrar tus proyectos reales
const projects = [
  {
    title: 'Tu Proyecto',
    description: 'Descripción del proyecto',
    technologies: ['React', 'Node.js'],
    // ...
  }
];
```

**Contact Section** (`src/components/Contact.jsx`):
```jsx
// Actualizar información de contacto
const communicationChannels = [
  {
    value: 'tu@email.com',  // Tu email real
    // ...
  }
];
```

### 2. Configuración del Galaxy
El componente Galaxy es totalmente configurable:

```jsx
<Galaxy 
  mouseRepulsion={true}      // Interacción con mouse
  mouseInteraction={true}    // Activar interactividad
  density={0.8}             // Densidad de partículas (0-1)
  glowIntensity={0.2}       // Intensidad del brillo
  saturation={0.0}          // Saturación (0 = monocromático)
  hueShift={0}              // Cambio de matiz
  twinkleIntensity={0.3}    // Intensidad del parpadeo
  rotationSpeed={0.02}      // Velocidad de rotación
  transparent={true}        // Background transparente
/>
```

### 3. Colores y Themes
Los colores están definidos en `tailwind.config.js`:

```javascript
colors: {
  space: {
    // Dark theme colors
    black: '#000000',
    surface: '#111111',
    'text-primary': '#FFFFFF',
    
    // Light theme colors  
    white: '#FFFFFF',
    'text-primary-light': '#000000',
    // ...
  }
}
```

## 🌐 Deployment

### Netlify
1. Conecta tu repositorio a Netlify
2. Configuración de build:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Vercel  
1. Conecta tu repositorio a Vercel
2. La configuración se detecta automáticamente

### GitHub Pages
```bash
# Instalar @astrojs/gh-pages
npm install --save-dev @astrojs/gh-pages

# Actualizar astro.config.mjs
export default defineConfig({
  site: 'https://tu-usuario.github.io',
  base: '/tu-repositorio',
});

# Deploy
npm run build
npx gh-pages -d dist
```

## 🎭 Características Avanzadas

### Theme System
- Detección automática de preferencia del sistema
- Persistencia en localStorage
- Transiciones suaves entre themes
- Eventos personalizados para componentes React

### Accessibility
- Navegación completa por teclado
- Skip links para screen readers
- Contraste alto (WCAG AA)
- Reducción de movimiento respetada
- ARIA labels y roles apropiados

### Performance
- Code splitting automático
- Lazy loading de componentes pesados  
- Optimización de imágenes automática
- Preload de assets críticos
- Bundle size optimizado

### SEO
- Meta tags completos
- Open Graph configurado
- Schema markup estructurado
- Sitemap automático
- URLs amigables

## 📱 Mobile Experience
- Touch gestures para Galaxy component
- Navigation drawer optimizado
- Tap targets de mínimo 44px
- Viewport configuration perfecta
- Performance optimizado para móviles

## 🔧 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Galaxy.jsx       # Background 3D interactivo
│   ├── ThemeToggle.jsx  # Cambio de theme
│   ├── Hero.jsx         # Sección principal
│   ├── About.jsx        # Panel de control
│   ├── Experience.jsx   # Timeline de experiencia
│   ├── Projects.jsx     # Grid de proyectos
│   └── Contact.jsx      # Formulario de contacto
├── layouts/
│   └── Layout.astro     # Layout principal
├── pages/
│   └── index.astro      # Página principal
├── styles/
│   └── global.css       # Estilos globales
└── utils/
    └── theme.js         # Utilidades de theme
```

## 🧞 Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

**Construido con ❤️ para la comunidad de desarrolladores espaciales** 🚀

¡Que tengas un vuelo exitoso! 🌌