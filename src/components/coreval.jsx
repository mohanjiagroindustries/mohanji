import React, { useState, useRef } from 'react';
import s1 from '../assets/Integrity.png';
import s2 from '../assets/innovation2.png';
import s3 from '../assets/sustain.png';
import s4 from '../assets/empower.png';

// Color Palette Definition (REVERTED)
const COLORS = {
  PRIMARY: '#21421e',   
  SECONDARY: '#d4a574', 
  ACCENT: '#f5f5dc',    
  DARK_TEXT: '#333333',
};

const coreValues = [
  {
    
    title: 'Integrity',
    desc: 'Absolute purity in products with complete transparency in every process. We maintain the highest standards from seed to harvest.',
    image: s1
  },
  {

    title: 'Innovation',
    desc: 'Blending traditional agricultural wisdom with cutting-edge modern science to create sustainable farming solutions.',
    image: s2
  },
  {
    
    title: 'Sustainability',
    desc: 'Protecting our environment through responsible practices at every step, ensuring a healthy planet for future generations.',
    image: s3
  },
  {
    
    title: 'Empowerment',
    desc: 'Building prosperous livelihoods and strong farming communities through fair practices and continuous support.',
    image: s4
  }
];

export default function CoreValuesScroll() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < coreValues.length - 1) {
      scrollToIndex(currentIndex + 1);
    } else {
      scrollToIndex(0); // Loop back to first slide
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth;
      const index = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(index);
    }
  };

  return (
    <div className="min-h-screen py-10 pt-23 px-4 sm:px-6" style={{background: COLORS.ACCENT}}>
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-8 sm:mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <span className="font-semibold text-xs sm:text-sm uppercase tracking-wider" style={{color: COLORS.SECONDARY}}>Cultivating excellence through harmony with nature.</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 mb-4 px-4" style={{color: COLORS.DARK_TEXT}}>
            Our Core Values
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mb-6 px-4">
           
    These principles guide everything we do, from farm to table
          </p>
          <div className="w-20 sm:w-24 h-1 mx-auto" style={{background: `linear-gradient(to right, ${COLORS.PRIMARY}, ${COLORS.SECONDARY})`}}></div>
        </div>

      </div>
        </div>
      {/* Carousel Container */}
      <div className="max-w-7xl mx-auto relative mt-8">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={{
            background: COLORS.PRIMARY,
            color: COLORS.ACCENT
          }}
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{
            background: COLORS.PRIMARY,
            color: COLORS.ACCENT
          }}
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {coreValues.map((value, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full snap-center px-2 sm:px-4"
            >
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-white">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image Side */}
                  <div className="relative h-85 sm:h-72 lg:h-[400px] xl:h-[500px]"> 
                    <img
                      src={value.image}
                      alt={value.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent" />
                    
                    {/* Emoji Badge */}
                    
                  </div>

                  {/* Content Side */}
                  <div 
                    // FIX: Reduced horizontal padding (px) across all screen sizes
                    className="py-8 px-6 sm:py-10 sm:px-8 lg:py-10 lg:px-10 xl:py-12 xl:px-10 flex flex-col justify-center"
                    style={{background: COLORS.PRIMARY}}
                  >
                    <div className="space-y-6 sm:space-y-8">
                      <div>
                        <div 
                          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 opacity-20" 
                          style={{color: COLORS.SECONDARY}}
                        >
                          0{index + 1}
                        </div>
                        <h3 
                          className="text-3xl sm:text-4xl lg:text-4xl font-bold" 
                          style={{color: COLORS.SECONDARY}}
                        >
                          {value.title}
                        </h3>
                      </div>
                      
                      <p 
                        className="text-base sm:text-lg lg:text-xl leading-relaxed" 
                        style={{color: COLORS.ACCENT}}
                      >
                        {value.desc}
                      </p>

                      {/* Progress Bar (Dots inside the card are kept) */}
                      <div className="pt-4">
                        <div className="flex items-center gap-2">
                          {coreValues.map((_, i) => (
                            <div
                              key={i}
                              className="h-1.5 rounded-full transition-all duration-300"
                              style={{
                                width: i === index ? '48px' : '24px',
                                background: i === index ? COLORS.SECONDARY : COLORS.ACCENT + '40'
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Removed: Dot Indicators below the card */}
        
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}