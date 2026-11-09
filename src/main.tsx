import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App, { preloadCurrentRoute } from './App.tsx';
import './index.css';

// Fetch the current page's code first so the first client render matches
// the prerendered HTML already on screen (see lazyPage in App.tsx). If the
// chunk fails to load, render anyway and let Suspense retry.
preloadCurrentRoute()
  .catch(() => undefined)
  .then(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  });
