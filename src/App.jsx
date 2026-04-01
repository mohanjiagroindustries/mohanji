import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import About from './components/About';
import Products from './components/Products';
import WhyChooseUs from './components/WhyChooseUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';
import AdminLoginModal from './components/AdminLoginModal';

const COLORS = { ACCENT: '#f5f5dc' };

const App = () => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    !!localStorage.getItem('adminToken')
  );

  const handleLoginSuccess = (token) => {
    localStorage.setItem('adminToken', token);
    setIsAdminLoggedIn(true);
    setShowAdminLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdminLoggedIn(false);
  };

  if (isAdminLoggedIn) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen" style={{ background: COLORS.ACCENT }}>
      <Navbar onAdminClick={() => setShowAdminLogin(true)} />
      <main>
        <HeroSection />
        <About />
        <Products />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />
      {showAdminLogin && (
        <AdminLoginModal
          onClose={() => setShowAdminLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
};

export default App; 