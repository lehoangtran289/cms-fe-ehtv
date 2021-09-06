import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import NotFound from 'src/pages/NotFound';
import Settings from 'src/pages/Settings';
import LessonsLocale from './pages/LessonsLocale';
import MessageSettings from './pages/MessageSettings';
import Dashboard from 'src/pages/Dashboard';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: '/', element: <Navigate to='/app/dashboard' /> },
      { path: 'settings', element: <Settings /> },
      { path: 'lessons/locale', element: <LessonsLocale /> },
      { path: 'message-settings', element: <MessageSettings /> },
      { path: '*', element: <Navigate to='/404' /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to='/app/dashboard' /> },
      { path: '*', element: <Navigate to='/404' /> }
    ]
  }
];

export default routes;
