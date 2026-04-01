import React from 'react';
import { Leaf, Award, Users, Globe, Heart, Zap, Truck } from 'lucide-react';

// Color Palette Definition (REVERTED)
const COLORS = {
  PRIMARY: '#21421e',   
  SECONDARY: '#d4a574', 
  ACCENT: '#f5f5dc',    
  DARK_TEXT: '#333333',
};

const About = () => {
  return (
    <section id="about" className="py-12 lg:py-25 overflow-hidden" style={{background: `linear-gradient(to bottom, white, ${COLORS.ACCENT})`}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Updated Title Section */}
        <div className="text-center mb-12 lg:mb-16">
          
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mt-0 mb-3 lg:mb-4 px-4" style={{color: COLORS.DARK_TEXT}}>
            <span style={{color: COLORS.PRIMARY}}>ABOUT US</span>
          </h2>
          <div className="w-20 lg:w-24 h-1 mx-auto" style={{background: `linear-gradient(to right, ${COLORS.PRIMARY}, ${COLORS.SECONDARY})`}}></div>
        </div>
        {/* End Updated Title Section */}

        {/* Vision and Mission Cards - Now side-by-side (horizontally) */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          
          {/* Vision Card (Left) */}
          <div className="p-6 lg:p-10 rounded-2xl shadow-xl border h-full flex flex-col" style={{background: 'white', borderColor: COLORS.ACCENT}}>
            <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4" style={{color: COLORS.DARK_TEXT}}>Our Vision</h3>
            <p style={{color: COLORS.DARK_TEXT}} className="leading-relaxed text-base lg:text-lg flex-grow">
              To promote sustainable agro products that enrich the soil, empower farmers, and deliver healthy, natural products to every household in India and across the world.
            </p>
          </div>

          {/* Mission Card (Right) */}
          <div className="p-6 lg:p-10 rounded-2xl shadow-xl text-white h-full flex flex-col" style={{background: COLORS.PRIMARY}}>
            <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">Our Mission</h3>
            <ul className="space-y-2 lg:space-y-3 text-base lg:text-lg font-medium flex-grow" style={{color: COLORS.ACCENT}}>
              <li>✓ 100% natural, chemical-free products</li>
              <li>✓ Revive traditional farming with modern science</li>
              <li>✓ Lead India to global organic excellence</li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;