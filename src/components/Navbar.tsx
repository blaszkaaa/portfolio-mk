
import React, { useState, useEffect } from 'react';
import { Menu, X, Lock } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'O mnie', href: '#about' },
    { name: 'Projekty', href: '#projects' },
    { name: 'Umiejętności', href: '#skills' },
    { name: 'Kontakt', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3 bg-white/90 backdrop-blur-md shadow-sm' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="#" className="text-lg font-bold tracking-tight">
          Mateusz Kaźmierczak
        </a>
        
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium hover:text-accent transition-colors relative after:absolute after:w-full after:h-[2px] after:bg-accent after:bottom-0 after:left-0 after:scale-x-0 after:transition-transform after:origin-bottom-right hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#login" 
            className="flex items-center gap-1 text-sm font-medium py-1.5 px-4 rounded-full bg-accent text-white hover:bg-accent/90 transition-colors"
          >
            <Lock size={14} /> Admin
          </a>
        </nav>
        
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[60px] bg-white z-40 p-4">
            <div className="flex flex-col space-y-6 pt-10">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-xl font-medium py-2 px-4 hover:bg-secondary rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#login"
                className="flex items-center gap-2 text-xl font-medium py-2 px-4 hover:bg-accent hover:text-white rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Lock size={18} /> Panel Administratora
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
