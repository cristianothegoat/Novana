
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import RouteExplorer from './pages/RouteExplorer';
import RouteSelection from './pages/RouteSelection';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import RouteSummary from './pages/RouteSummary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar isAuthenticated={isAuthenticated} onSignOut={() => setIsAuthenticated(false)} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/explore" element={<RouteSelection />} />
            <Route path="/visualizer/:id" element={<RouteExplorer />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn onSignIn={() => setIsAuthenticated(true)} />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />} />
            <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/signin" />} />
            <Route path="/summary/:id" element={<RouteSummary />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
      </div>
    </HashRouter>
  );
};

export default App;
