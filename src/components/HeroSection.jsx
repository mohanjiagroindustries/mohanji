import React from 'react';

// Color Palette Definition (Adjusted for Golden Effect)
const COLORS = {
  PRIMARY: '#21421e',   
  SECONDARY: '#d4a574', // Reverted to original gold tone, now used for background glow
  ACCENT: '#f5f5dc',    
};

const HeroSection = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // New styles for the Golden Text Effect
  const goldenTextStyle = {
    // A linear gradient simulating light hitting a metallic surface
    background: 'linear-gradient(45deg, #FFD700 0%, #FFA500 25%, #FFD700 50%, #FFA500 75%, #FFD700 100%)',
    // These clip the background gradient to the shape of the text
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    // This makes the text color transparent so only the background gradient shows
    color: 'transparent',
    // Adds depth and subtle shine
    textShadow: '0 3px 6px rgba(0, 0, 0, 0.3)',
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden" style={{background: COLORS.PRIMARY}}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{background: COLORS.ACCENT}}></div>
        {/* Background glow now uses the original gold (SECONDARY) color */}
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{background: COLORS.SECONDARY, animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 text-center">

        
        {/* 1. MOHANJI AGRO INDUSTRIES - Now uses the goldenTextStyle object */}
        <p className="text-5xl sm:text4xl mb-4 max-w-5xl mx-auto font-extrabold uppercase tracking-widest" style={goldenTextStyle}>
          MOHANJI AGRO INDUSTRIES
        </p>

        {/* 2. Main Tagline */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 leading-tight">
          From Nature to Nurture
          <span className="block" style={{color: COLORS.ACCENT}}>
            Growing Naturally with Passion
          </span>
        </h1>
        
        {/* Secondary Tagline Badge */}
        <div className="mb-6 inline-block">
          <span className={`px-4 py-1 rounded-full text-sm font-semibold backdrop-blur-sm border text-white opacity-80`} style={{background: `${COLORS.PRIMARY}33`, borderColor: `${COLORS.ACCENT}33`}}>
             Nurturing Nature, Nourishing Globe
          </span>
        </div>
        
        <p className="text-lg sm:text-xl mb-12 max-w-3xl mx-auto" style={{color: COLORS.ACCENT}}>
          Premium agriculture products. Exporting locally & globally with pride.
        </p>

      </div>

      
    </section>
  );
}

export default HeroSection;