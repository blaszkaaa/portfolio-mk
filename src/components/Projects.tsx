
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  link: string;
}

const Projects = () => {
  const projects: Project[] = [
    {
      title: 'E-commerce Dashboard',
      description: 'Panel administracyjny dla sklepu internetowego z analizą danych sprzedażowych i zarządzaniem produktami.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase'],
      imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80',
      link: '#'
    },
    {
      title: 'Aplikacja do zarządzania wydatkami',
      description: 'Aplikacja webowa pomagająca śledzić wydatki osobiste i tworzyć budżety miesięczne.',
      technologies: ['Vue.js', 'Node.js', 'Express', 'MongoDB'],
      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80',
      link: '#'
    },
    {
      title: 'System rezerwacji online',
      description: 'System rezerwacji dla restauracji umożliwiający zarządzanie stolikami i przyjmowanie rezerwacji online.',
      technologies: ['React', 'Next.js', 'PostgreSQL', 'Stripe'],
      imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80',
      link: '#'
    }
  ];

  return (
    <section id="projects" className="py-24">
      <div className="container">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h2 className="font-bold mb-4">Moje projekty</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Poniżej przedstawiam wybrane projekty, które zrealizowałem. Każdy z nich prezentuje moje 
            umiejętności programistyczne oraz zdolność do tworzenia kompleksowych rozwiązań.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="project-card group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-56 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                  <ArrowRight size={24} className="text-white" />
                </div>
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="badge">{tech}</span>
                  ))}
                </div>
                
                <a 
                  href={project.link} 
                  className="inline-flex items-center text-sm font-medium text-accent hover:underline"
                >
                  Zobacz więcej
                  <ArrowRight size={14} className="ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
