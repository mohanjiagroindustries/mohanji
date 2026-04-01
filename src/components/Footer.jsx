import React from 'react';
import { MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import whitelogo from "../assets/whitelogo.png";

const COLORS = {
  PRIMARY: '#21421e',   // deep green
  ACCENT: '#f5f5dc',    // beige
};

// Moving ContactInfo data here from Contact.jsx
const ContactInfo = [
    { 
        title: 'Address', 
        details: [
            'Mumbai, Maharashtra, India', 
            
        ],
        icon: MapPin 
    },
    { 
        title: 'Contact Numbers', 
        details: [
            '+91 98701 08612', 
            '+91 91377 36886'
        ],
        icon: Phone 
    },
    { 
        title: 'Email', 
        details: [
            'mohanjiagro@gmail.com',
            'heavyweightagro@gmail.com'
        ],
        icon: Mail 
    }
];

const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="text-white py-12" style={{ background: '#1a361a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===== Top Section ===== */}
        <div className="grid gap-8 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo + Motto */}
          <div>
            <div className="mb-4 -mt-20.5">
              <img 
                src={whitelogo}
                alt="Heavyweight Logo" 
                className="h-48 w-auto object-contain"
              />
              <p className="text-xs text-gray-400 -mt-10">by Mohanji Agro Industries</p>
            </div>
            <p className="text-gray-400 text-xs">
              Nurturing Nature, Nourishing Nation
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('products')}
                  className="hover:text-white transition-colors"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-bold mb-4">Contact Info</h4>
            {ContactInfo.map((item) => (
              <div key={item.title} className="mb-4 flex items-start space-x-2">
                <item.icon className="w-5 h-5 mt-1 text-white" />
                <div>
                  <p className="text-sm font-semibold text-white mb-1">{item.title}</p>
                  {item.details.map((detail, index) => (
                    <p key={index} className="text-gray-400 text-sm">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div>
            <h4 className="font-bold mb-4">Certifications</h4>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {['APEDA', 'ISO', 'FSSAI', 'Gomasta', 'IEC', 'Udyam'].map(cert => (
                <div
                  key={cert}
                  className="px-3 py-1 rounded text-xs font-bold text-center"
                  style={{ background: 'white', color: COLORS.PRIMARY }}
                >
                  {cert}
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-xs">
              Certified organic and quality assured
            </p>
          </div>
        </div>

        {/* ===== Bottom Section ===== */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left text-gray-400 text-sm gap-2">
          <div>
            <p>© 2025 Heavyweight - Mohanji Agro Industries. All rights reserved.</p>
            <p className="mt-1">From Nature to Nurture – Growing with Purity</p>
          </div>

          <p className="text-xs text-gray-500 md:text-right">
            Made with ❤️ by <span className="text-white font-medium">SimCorp</span>
          </p>
        </div>
        
        {/* Scroll to top button */}
        <button 
          className="fixed bottom-2 right-6 p-3 rounded-full text-white shadow-lg z-50 flex items-center justify-center transition-opacity hover:opacity-80" 
          style={{ background: COLORS.PRIMARY }} 
          onClick={() => scrollToSection('home')}
          aria-label="Go to top of page"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;