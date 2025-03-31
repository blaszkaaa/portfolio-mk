import React, { useEffect, useRef } from 'react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="relative aspect-square w-full max-w-sm mx-auto">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/20"></div>
                <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center overflow-hidden">
                  <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-r from-accent/20 to-accent/40 flex items-center justify-center text-5xl font-bold text-white">
                    MK
                  </div>
                </div>
                <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-xl bg-accent/10 backdrop-blur-sm border border-white"></div>
                <div className="absolute -left-6 -top-6 w-12 h-12 rounded-lg bg-accent/20 backdrop-blur-sm border border-white"></div>
              </div>
            </div>
            
            <div className="md:w-1/2" ref={sectionRef}>
              <div className="reveal">
                <h2 className="text-3xl font-bold mb-6">About Me</h2>
                <p className="text-muted-foreground mb-4">
                  I am a programming technician with INF.03 (Creating and administering websites, web applications and databases)
                  and INF.04 (Designing, programming and testing applications) diplomas.
                </p>
                <p className="text-muted-foreground mb-6">
                  My specialization is frontend development, where I combine technical knowledge with creativity to create modern and intuitive user interfaces.
                  I continuously develop my skills by following the latest trends and technologies in the world of web development.
                </p>
                
                <div className="flex flex-wrap gap-3 mt-6">
                  <span className="badge">Programming Technician</span>
                  <span className="badge">INF.03</span>
                  <span className="badge">INF.04</span>
                  <span className="badge">Frontend Developer</span>
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
