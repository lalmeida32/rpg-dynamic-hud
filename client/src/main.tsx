import React from 'react';
import ReactDOM from 'react-dom/client';
import './shared/style/normalize.css';
import './shared/style/theme.css';
import './shared/style/global.css';
import { AppGameRoom } from './app/app_game_room/AppGameRoom';

const root = document.getElementById('root');

if (root !== null) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <AppGameRoom />
    </React.StrictMode>
  );
}
