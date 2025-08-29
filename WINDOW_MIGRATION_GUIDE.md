# Guía de Migración a Ventanas Nativas

Esta guía documenta la migración del sistema de gestión de ventanas personalizado a ventanas nativas del navegador.

## Cambios Implementados

### ✅ Sistema Anterior (Custom Windows)
- **Archivo**: `src/components/WindowManager.jsx`  
- **Características**:
  - Ventanas personalizadas arrastrables y redimensionables
  - Gestión completa de estado (minimizar, maximizar, cerrar)
  - Taskbar integrada con controles de ventana
  - Interfaz completamente custom con CSS

### ✅ Sistema Nuevo (Native Windows) 
- **Archivo**: `src/components/NativeWindowManager.jsx`
- **Características**:
  - Utiliza `window.open()` del navegador
  - Ventanas nativas con controles del sistema operativo
  - Mejor compatibilidad móvil
  - Contenido HTML completo en cada ventana
  - Gestión automática de popups bloqueados

## Configuración

### Cambiar Modo de Ventanas

Edita `src/config/windowMode.js`:

```javascript
// Para ventanas nativas (recomendado)
export const DEFAULT_WINDOW_MODE = WINDOW_MODES.NATIVE;

// Para ventanas personalizadas (legacy)
export const DEFAULT_WINDOW_MODE = WINDOW_MODES.CUSTOM;
```

### Configuración de Ventanas Nativas

```javascript
export const NATIVE_WINDOW_CONFIG = {
  defaultWidth: 900,      // Ancho por defecto
  defaultHeight: 700,     // Alto por defecto
  features: {
    scrollbars: true,     // Permite scroll
    resizable: true,      // Permite redimensionar
    menubar: false,       // Sin barra de menú
    toolbar: false,       // Sin toolbar
    location: false,      // Sin barra de dirección
    status: false         // Sin barra de estado
  }
};
```

## Estructura de Archivos

```
src/
├── components/
│   ├── WindowManager.jsx          # Sistema personalizado (legacy)
│   ├── NativeWindowManager.jsx    # Sistema nativo (nuevo)
│   └── UniversalWindowManager.jsx # Wrapper que cambia entre modos
├── config/
│   └── windowMode.js              # Configuración de modos
└── pages/
    └── index.astro                # Usa UniversalWindowManager
```

## Funcionamiento del Sistema Nativo

### 1. Apertura de Ventanas
```javascript
const openNativeWindow = (type) => {
  const newWindow = window.open(
    'about:blank',
    `window_${type}_${Date.now()}`,
    `width=${width},height=${height}...`
  );
  
  // Escribir contenido HTML completo
  newWindow.document.write(content.content);
  newWindow.document.close();
};
```

### 2. Gestión de Estado
- **Referencias**: Se almacenan en `openWindows` Map
- **Cleanup**: Se limpia automáticamente al cerrar
- **Detección**: Event listener en `beforeunload`

### 3. Contenido de Ventanas
Cada tipo de ventana tiene contenido HTML completo con:
- Estilos CSS embebidos
- Estructura semántica
- Diseño responsive
- Enlaces funcionales

## Ventajas del Sistema Nativo

### ✅ Beneficios
- **Compatibilidad**: Mejor soporte móvil y tablets
- **Performance**: Menos overhead de JavaScript
- **UX Nativa**: Controles familiares del SO
- **Accesibilidad**: Mejor soporte para lectores de pantalla
- **Multitarea**: Ventanas independientes en la taskbar del SO

### ⚠️ Consideraciones
- **Popups**: Requiere permitir popups en el navegador
- **Limitaciones**: Menos control sobre posicionamiento exacto
- **Estilo**: Depende del navegador/SO para controles

## Compatibilidad

### ✅ Navegadores Soportados
- Chrome/Chromium (Recomendado)
- Firefox 
- Safari
- Edge

### ✅ Dispositivos
- **Desktop**: Funcionalidad completa
- **Tablet**: Funciona como pestañas nuevas
- **Mobile**: Se abre en pestaña nueva automáticamente

## Migración Paso a Paso

1. **Backup**: El sistema original permanece intacto
2. **Testing**: Cambiar modo en `windowMode.js`  
3. **Verificar**: Probar en diferentes navegadores
4. **Deploy**: Sistema listo para producción

## Terminal en Ventana Nativa

### Nueva Implementación
- **Terminal independiente**: Se abre en su propia ventana nativa del navegador
- **Panel persistente**: Status bar siempre visible en la parte inferior
- **Comunicación**: Terminal comunica con ventana principal via `postMessage`
- **Indicador visual**: El panel muestra si la terminal está abierta
- **Acceso directo**: Botón dedicado para abrir/reabrir la terminal

### Panel Persistente
El nuevo sistema incluye un panel de estado que:
- Muestra información del portfolio
- Indica el estado de la terminal (abierta/cerrada)
- Proporciona acceso directo a la terminal
- Muestra la hora actual
- Mantiene el branding del portfolio

### Comandos de Terminal
- `open about` - Abre ventana About
- `open projects` - Abre ventana Projects  
- `open experience` - Abre ventana Experience
- `open contact` - Abre ventana Contact
- `help` - Lista todos los comandos disponibles
- `clear` - Limpia la terminal
- `whoami` - Información del usuario
- `cat about.txt` - Muestra información detallada

## Fallbacks y Manejo de Errores

```javascript
if (newWindow) {
  // Ventana abierta exitosamente
} else {
  // Fallback si se bloquean popups
  alert('Please allow popups for this site...');
  setTimeout(() => openNativeWindow(type), 100);
}
```

## Desarrollo Local

```bash
npm run dev
# Servidor en http://localhost:4323/
```

---

## ✅ Estado Final de la Migración

**Estado**: ✅ Migración completada y funcional
**Modo por defecto**: Native Windows  
**Terminal**: ✅ Movida a ventana nativa independiente
**Panel**: ✅ Interface persistente implementada
**Fallback disponible**: Custom Windows (legacy)

### Cambios Principales:
1. ✅ Terminal ahora se abre en ventana nativa del navegador
2. ✅ Panel de estado persistente siempre visible
3. ✅ Comunicación bidireccional entre terminal y ventana principal
4. ✅ Indicadores visuales del estado de la terminal
5. ✅ Acceso directo desde iconos y panel

### Archivos Modificados:
- `src/components/NativeWindowManager.jsx` - Sistema principal actualizado
- `src/components/UniversalWindowManager.jsx` - Wrapper de compatibilidad
- `src/config/windowMode.js` - Configuración del sistema
- `src/pages/index.astro` - Punto de entrada actualizado