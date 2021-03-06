import React from 'react';
import ReactDOM from 'react-dom/client';
import './shared/style/normalize.css';
import './shared/style/theme.css';
import './shared/style/global.css';
import { AppRouter } from 'shared/routes/AppRouter';
import { UserLoginProvider } from 'shared/contexts/UserLogin';
import { BrowserRouter } from 'react-router-dom';
import { CurrentAlertProvider } from 'shared/contexts/CurrentAlert';

const root = document.getElementById('root');

if (root !== null) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
        <UserLoginProvider>
          <CurrentAlertProvider>
            <AppRouter />
          </CurrentAlertProvider>
        </UserLoginProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
