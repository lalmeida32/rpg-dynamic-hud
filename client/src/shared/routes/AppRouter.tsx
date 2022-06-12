import { AppGameRoom } from 'app/app_game_room/AppGameRoom';
import { NotFound } from 'app/landing_page/NotFound';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app-game-room" element={<AppGameRoom />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </BrowserRouter>
  );
};
