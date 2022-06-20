import { GameRoom } from 'app/game_room_page/GameRoom';
import { LandingTextTemplate } from 'app/landing_page/LandingTextTemplate';
import { LandingTemplate } from 'app/landing_page/LandingTemplate';
import { NotFound } from 'app/landing_page/NotFound';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomeText } from 'app/landing_page/HomeText';
import { AboutText } from 'app/landing_page/AboutText';
import { ContactText } from 'app/landing_page/ContactText';
import { AuthTemplate } from 'app/auth_page/AuthTemplate';
import { LogInForm } from 'app/auth_page/LogInForm';
import { RegisterForm } from 'app/auth_page/RegisterForm';
import { ResetForm } from 'app/auth_page/ResetForm';
import { Rooms } from 'app/rooms_page/Rooms';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="home" element={<LandingTemplate />}>
        <Route element={<LandingTextTemplate />}>
          <Route index element={<HomeText />} />
          <Route path="about" element={<AboutText />} />
          <Route path="contact" element={<ContactText />} />
        </Route>
        <Route path="not-found" element={<NotFound />} />
      </Route>
      <Route path="auth" element={<AuthTemplate />}>
        <Route index element={<Navigate to="/auth/login" />} />
        <Route path="login" element={<LogInForm />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="reset" element={<ResetForm />} />
      </Route>
      <Route path="rooms" element={<Rooms />} />
      <Route path="room" element={<GameRoom />} />
      <Route path="*" element={<Navigate to="/home/not-found" />} />
    </Routes>
  );
};
