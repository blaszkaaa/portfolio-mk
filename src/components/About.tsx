
import React, { useRef, useEffect } from 'react';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initialize animation
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const containerTop = container.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (containerTop < windowHeight * 0.75) {
        container.classList.add('active');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="about" className="py-24 bg-secondary/10">
      <div className="container">
        <div ref={containerRef} className="reveal">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">O mnie</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg">
                Jestem <strong>technikiem programistą</strong> z certyfikatami INF.03 i INF.04, specjalizującym się w tworzeniu nowoczesnych interfejsów użytkownika. Moja pasja do kodowania i ciągłego rozwoju pozwala mi tworzyć intuicyjne i funkcjonalne aplikacje webowe.
              </p>
              
              <p className="text-lg">
                Posiadam doświadczenie w pracy z React, TypeScript i nowoczesnym ekosystemem front-endowym. Ciągle rozwijam swoje umiejętności, aby być na bieżąco z najnowszymi technologiami i trendami.
              </p>
              
              <p className="text-lg">
                Poza programowaniem, interesuje mnie również UX/UI design oraz dostępność aplikacji webowych. Wierzę, że połączenie dobrego kodu z przemyślanym designem jest kluczem do tworzenia doskonałych produktów cyfrowych.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
              <h3 className="text-xl font-semibold mb-4">Edukacja</h3>
              
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-accent font-medium">2019 - 2023</span>
                  <span className="font-medium">Technikum Programistyczne</span>
                  <span className="text-muted-foreground">Technik Programista</span>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Certyfikaty</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent"></span>
                      <span>INF.03 - Tworzenie i administrowanie stronami i aplikacjami internetowymi oraz bazami danych</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent"></span>
                      <span>INF.04 - Projektowanie, programowanie i testowanie aplikacji</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
