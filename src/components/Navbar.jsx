import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import l1 from "../assets/heavyweightlogo.png";
import whitelogo from "../assets/whitelogo.png";

const HeavyweightLogo = ({ isHeroSection }) => (
  <img
    src={isHeroSection ? whitelogo : l1}
    alt="Mohanji Logo"
    className="w-40 h-40 sm:w-60 sm:h-60 object-contain transition-all duration-300"
  />
);

const Navbar = ({ onAdminClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isHeroSection, setIsHeroSection] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'products', 'why-us', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
        setIsHeroSection(current === 'home');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = ['Home', 'About', 'Products', 'Why Us', 'Contact'];

  return (
    <nav className="fixed w-full z-50 flex justify-center pt-4 px-4">
      <div
        className={`w-full max-w-7xl rounded-full transition-all duration-300 ${scrolled ? 'shadow-xl' : 'shadow-md'}`}
        style={{
          background: isHeroSection
            ? (scrolled ? 'rgba(33, 66, 30, 0.95)' : 'rgba(33, 66, 30, 0.7)')
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div className="px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-20 sm:h-22">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <HeavyweightLogo isHeroSection={isHeroSection} />
            </div>

            <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
              {navItems.map((item) => {
                const id = item.toLowerCase().replace(' ', '-');
                return (
                  <button
                    key={item}
                    onClick={() => scrollToSection(id)}
                    className={`font-medium transition-colors text-sm lg:text-base ${
                      isHeroSection ? 'text-white hover:text-[#d4a574]' : 'text-black hover:text-[#d4a574]'
                    } ${activeSection === id ? 'text-[#d4a574]' : ''}`}
                  >
                    {item}
                  </button>
                );
              })}
              <button
                onClick={onAdminClick}
                className={`text-xs font-medium transition-colors opacity-40 hover:opacity-100 ${
                  isHeroSection ? 'text-white' : 'text-black'
                }`}
              >
                Admin
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden transition-colors ${isHeroSection ? 'text-white' : 'text-black'}`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="absolute top-32 left-4 right-4 mx-auto max-w-md rounded-3xl border border-white/20 shadow-2xl"
          style={{
            background: isHeroSection ? 'rgba(33, 66, 30, 0.98)' : 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  isHeroSection ? 'text-white hover:bg-white/10' : 'text-black hover:bg-black/10'
                }`}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => { onAdminClick(); setIsMenuOpen(false); }}
              className={`block w-full text-left px-4 py-3 rounded-lg transition-colors opacity-40 text-xs ${
                isHeroSection ? 'text-white hover:bg-white/10' : 'text-black hover:bg-black/10'
              }`}
            >
              Admin
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;