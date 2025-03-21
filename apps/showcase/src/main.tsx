import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'tailwindcss';

import '@fontsource-variable/lexend-tera/index.css';
import '@fontsource-variable/archivo/index.css';
import '@fontsource/fira-mono/index.css';
import '@fontsource/major-mono-display/index.css';
import '@fontsource/space-mono/index.css';
import '@fontsource-variable/space-grotesk/index.css';

import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
