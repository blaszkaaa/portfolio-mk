
import React, { useEffect, useRef } from 'react';
import { Code, Computer, Database, Image } from 'lucide-react';

interface SkillCategory {
  name: string;
  icon: React.ReactNode;
  skills: string[];
}

const Skills = () => {
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

  const skillCategories: SkillCategory[] = [
    {
      name: 'Frontend',
      icon: <Code className="text-accent" size={24} />,
      skills: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Tailwind CSS', 'SCSS', 'Responsive Design']
    },
    {
      name: 'Backend',
      icon: <Database className="text-accent" size={24} />,
      skills: ['Node.js', 'Express', 'PHP', 'MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'API Development']
    },
    {
      name: 'Narzędzia',
      icon: <Computer className="text-accent" size={24} />,
      skills: ['Git', 'GitHub', 'Webpack', 'Vite', 'VS Code', 'Docker', 'Figma', 'Postman', 'Terminal']
    },
    {
      name: 'Design',
      icon: <Image className="text-accent" size={24} />,
      skills: ['UI/UX Principles', 'Figma', 'Adobe XD', 'Web Design', 'Prototyping', 'Accessibility']
    }
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-24 bg-secondary/30">
      <div className="container">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h2 className="font-bold mb-4">Umiejętności</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Zdobyłem solidne umiejętności w różnych technologiach programistycznych, co pozwala mi na tworzenie 
            kompleksowych aplikacji webowych od strony wizualnej po funkcjonalność.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mr-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold">{category.name}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center reveal">
          <h3 className="text-xl font-semibold mb-6">Certyfikaty</h3>
          <div className="inline-flex flex-wrap justify-center gap-6">
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <div className="text-xl font-bold text-accent mb-2">INF.03</div>
              <p className="text-sm text-muted-foreground">Tworzenie i administrowanie stronami i aplikacjami internetowymi oraz bazami danych</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <div className="text-xl font-bold text-accent mb-2">INF.04</div>
              <p className="text-sm text-muted-foreground">Projektowanie, programowanie i testowanie aplikacji</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
