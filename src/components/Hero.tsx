
import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const textRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    // Animate the text with a typewriter effect
    const text = "Programista z pasją do tworzenia.";
    const element = textRef.current;
    let index = 0;
    
    if (element) {
      element.textContent = "";
      
      const typeEffect = setInterval(() => {
        if (index < text.length) {
          element.textContent += text.charAt(index);
          index++;
        } else {
          clearInterval(typeEffect);
        }
      }, 75);
      
      return () => clearInterval(typeEffect);
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-white/10 pointer-events-none" />
      
      <div className="container">
        <div className="max-w-3xl">
          <span className="badge animate-fade-in">Mateusz Kaźmierczak</span>
          
          <h1 className="mt-6 mb-4 font-bold animate-fade-in" style={{animationDelay: '100ms'}}>
            Frontend Developer
          </h1>
          
          <h2 ref={textRef} className="text-xl sm:text-2xl font-medium text-muted-foreground min-h-[2em]"></h2>
          
          <p className="mt-8 text-lg text-muted-foreground max-w-xl animate-fade-in" style={{animationDelay: '300ms'}}>
            Technik programista z certyfikatami INF.03 oraz INF.04, specjalizujący się w tworzeniu nowoczesnych 
            interfejsów użytkownika i aplikacji webowych.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: '400ms'}}>
            <a href="#projects" className="button-animated bg-primary text-white px-6 py-3 rounded-lg font-medium">
              Zobacz moje projekty
            </a>
            <a href="#contact" className="button-animated border border-primary/20 px-6 py-3 rounded-lg font-medium">
              Skontaktuj się
            </a>
          </div>
        </div>
      </div>
      
      <a 
        href="#about" 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-float"
      >
        <span className="text-sm font-medium mb-2">Przewiń w dół</span>
        <ArrowDown className="animate-bounce" size={20} />
      </a>
    </section>
  );
};

export default Hero;
