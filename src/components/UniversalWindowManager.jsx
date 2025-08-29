import { DEFAULT_WINDOW_MODE, WINDOW_MODES } from '../config/windowMode.js';
import WindowManager from './WindowManager.jsx';
import NativeWindowManager from './NativeWindowManager.jsx';

// Universal window manager that switches between native and custom modes
export default function UniversalWindowManager(props) {
  // You can change the window mode dynamically by setting a different value here
  // or by reading from localStorage, URL params, or environment variables
  const windowMode = DEFAULT_WINDOW_MODE;

  switch (windowMode) {
    case WINDOW_MODES.NATIVE:
      return <NativeWindowManager {...props} />;
    case WINDOW_MODES.CUSTOM:
      return <WindowManager {...props} />;
    default:
      return <NativeWindowManager {...props} />;
  }
}