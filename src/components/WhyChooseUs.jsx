import React from 'react';
import { Award, Users, Leaf, Globe, Truck, Package } from 'lucide-react';
import CoreValuesScroll from "../components/coreval.jsx";
// Color Palette Definition (REVERTED)
const COLORS = {
  PRIMARY: '#21421e',   
  SECONDARY: '#d4a574', 
  ACCENT: '#f5f5dc',    
  DARK_TEXT: '#333333',
};

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-12 sm:py-16 lg:py-22" style={{background: COLORS.ACCENT}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-10">
          <span className="font-semibold text-xs sm:text-sm uppercase tracking-wider" style={{color: COLORS.SECONDARY}}>Prosperity Through Purity</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 mb-4 px-4" style={{color: COLORS.DARK_TEXT}}>
            Farm-To-Home Excellence
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mb-6 px-4">
            Committed to delivering the finest organic products while empowering farmers and protecting our planet
          </p>
          <div className="w-20 sm:w-24 h-1 mx-auto" style={{background: `linear-gradient(to right, ${COLORS.PRIMARY}, ${COLORS.SECONDARY})`}}></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {[
            // 1. FARMERS FIRST (Users icon)
            { icon: Users, title: 'Farmer First', desc: 'Securing farmer income stability by establishing direct, supportive partnerships i.e. We buy direct from Farmers' },
            // 2. NATURAL & FRESH (Leaf icon)
            { icon: Leaf, title: 'Natural & Fresh', desc: 'Sourced purely and naturally, guaranteeing products free from harmful pesticides and artificial chemicals in every batch.' },
            // 3. GLOBAL REACH (Globe icon)
            { icon: Globe, title: 'Global Reach', desc: 'Exporting premium Indian agro products to 25+ countries across USA, Europe, Asia and many more regions all over the Globe.' },
            // 4. QUALITY ASSURANCE (Award icon)
            { icon: Award, title: 'Quality Assurance', desc: 'APEDA, ISO, FSSAI, Gomasta license, IEC license & Udyam License certified facilities upholding rigorous quality checks to meet international standards in every batch.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300" style={{background: `linear-gradient(135deg, ${COLORS.ACCENT}, ${COLORS.SECONDARY}20)`}}>
                <item.icon className="w-7 h-7 sm:w-8 sm:h-8" style={{color: COLORS.PRIMARY}} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3" style={{color: COLORS.DARK_TEXT}}>{item.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Export Feature Highlight */}
        <div className="mt-30 mb-12 sm:mb-10 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden" style={{background: COLORS.PRIMARY}}>
          <div className="p-8 sm:p-12 text-center text-white">
            <Truck className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 animate-pulse" style={{color: COLORS.SECONDARY}} />
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Export Excellence Worldwide</h3>
            <p className="text-base sm:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4" style={{color: COLORS.ACCENT}}>
              We proudly export our premium agro products to global markets, bringing the authentic quality of Indian agriculture to discerning customers worldwide. Trusted by international partners for consistent excellence.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {[
                { icon: Package, title: 'Premium Packaging', desc: 'Export-grade materials preserving freshness' },
                { icon: Award, title: 'Global Certifications', desc: 'Meets international quality standards' },
                { icon: Globe, title: 'Worldwide Partners', desc: 'Reliable distribution in 25+ countries' }
              ].map((item, idx) => (
                <div key={idx} className="p-4 sm:p-0">
                  <item.icon className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3" style={{color: COLORS.SECONDARY}} />
                  <h4 className="font-bold text-base sm:text-lg mb-2">{item.title}</h4>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{color: COLORS.ACCENT}}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

       <CoreValuesScroll />
      </div>
    </section>
  );
}

export default WhyChooseUs;