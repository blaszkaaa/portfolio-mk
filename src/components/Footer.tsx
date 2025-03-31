
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 bg-secondary/30">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="font-bold text-lg mb-1">Mateusz Kaźmierczak</h3>
            <p className="text-sm text-muted-foreground">Frontend Developer</p>
          </div>
          
          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end space-x-4 mb-4">
              
              <a href="http://github.com/blaszkaaa" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-accent/10 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              
            </div>
            
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Mateusz Kaźmierczak. Wszelkie prawa zastrzeżone.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
