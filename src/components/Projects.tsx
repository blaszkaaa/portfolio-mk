
import React, { useEffect, useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image_url: string;
  link: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setProjects(data || []);
      } catch (error: any) {
        console.error('Error fetching projects:', error);
        toast({
          title: "Błąd pobierania projektów",
          description: "Nie udało się pobrać listy projektów",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [toast]);

  if (isLoading) {
    return (
      <section id="projects" className="py-24">
        <div className="container">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
            <span className="ml-2">Ładowanie projektów...</span>
          </div>
        </div>
      </section>
    );
  }

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
        
        {projects.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>Nie znaleziono projektów.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className="project-card group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-56 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                    <ArrowRight size={24} className="text-white" />
                  </div>
                  <img 
                    src={project.image_url} 
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
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Zobacz więcej
                    <ArrowRight size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
