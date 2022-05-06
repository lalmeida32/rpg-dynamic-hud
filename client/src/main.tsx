import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRoom } from './app/app_room/AppRoom';
import './shared/style/normalize.css';
import './shared/style/colors.css';
import './shared/style/global.css';

const root = document.getElementById('root');

if (root !== null) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <AppRoom />
    </React.StrictMode>
  );
}
