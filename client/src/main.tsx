import React from 'react';
import ReactDOM from 'react-dom/client';
import './shared/style/normalize.css';
import './shared/style/theme.css';
import './shared/style/global.css';
import { AppRouter } from 'shared/routes/AppRouter';

const root = document.getElementById('root');

if (root !== null) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>
  );
}
