import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider, useAuth } from './auth/AuthProvider';
import NetworkNotifier from './components/NetworkNotifier';

const NavBar = lazy(() => import('./components/NavBar'));

const SignInScreen = lazy(() => import('./pages/SignInScreen'));
const SignUpScreen = lazy(() => import('./pages/SignUpScreen'));
const HomeScreen = lazy(() => import('./pages/HomeScreen'));
const CategoryScreen = lazy(() => import('./pages/CategoryScreen'));
const SearchScreen = lazy(() => import('./pages/SearchScreen'));
const ProfileScreen = lazy(() => import('./pages/ProfileScreen'));

const AnimatedPage = ({ children }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0, y: -10 }} 
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/signin" replace />;
  return (
    <>
      <Suspense fallback={null}><NavBar /></Suspense>
      <main style={{ paddingTop: '70px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>
    </>
  );
};

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) return <Navigate to="/home" replace />;
  return children;
};

const ScreenLoading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div className="loader"></div>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/signin" element={<PublicRoute><AnimatedPage><SignInScreen /></AnimatedPage></PublicRoute>}/>
        <Route path="/signup" element={<PublicRoute><AnimatedPage><SignUpScreen /></AnimatedPage></PublicRoute>}/>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<ProtectedRoute><AnimatedPage><HomeScreen /></AnimatedPage></ProtectedRoute>} />
        <Route path="/category/:type" element={<ProtectedRoute><AnimatedPage><CategoryScreen /></AnimatedPage></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><AnimatedPage><SearchScreen /></AnimatedPage></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><AnimatedPage><ProfileScreen /></AnimatedPage></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <NetworkNotifier />
        <Suspense fallback={<ScreenLoading />}>
          <AnimatedRoutes />
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
