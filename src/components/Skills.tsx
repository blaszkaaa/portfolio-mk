
import React, { useEffect, useRef, useState } from 'react';
import { Code, Computer, Database, Image, Loader2 } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Skill {
  id: string;
  name: string;
  category: string;
}

interface SkillCategory {
  name: string;
  icon: React.ReactNode;
  skills: string[];
}

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [skillsByCategory, setSkillsByCategory] = useState<SkillCategory[]>([]);
  const { toast } = useToast();
  
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

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('name', { ascending: true });
          
        if (error) throw error;
        
        // Group skills by category
        const groupedSkills: Record<string, string[]> = {};
        
        (data || []).forEach((skill: Skill) => {
          if (!groupedSkills[skill.category]) {
            groupedSkills[skill.category] = [];
          }
          groupedSkills[skill.category].push(skill.name);
        });
        
        // Map to skill categories with icons
        const categories: SkillCategory[] = Object.keys(groupedSkills).map(category => {
          let icon;
          
          switch (category.toLowerCase()) {
            case 'frontend':
              icon = <Code className="text-accent" size={24} />;
              break;
            case 'backend':
              icon = <Database className="text-accent" size={24} />;
              break;
            case 'narzędzia':
            case 'tools':
              icon = <Computer className="text-accent" size={24} />;
              break;
            case 'design':
              icon = <Image className="text-accent" size={24} />;
              break;
            default:
              icon = <Computer className="text-accent" size={24} />;
          }
          
          return {
            name: category,
            icon,
            skills: groupedSkills[category]
          };
        });
        
        setSkillsByCategory(categories);
      } catch (error: any) {
        console.error('Error fetching skills:', error);
        toast({
          title: "Błąd pobierania umiejętności",
          description: "Nie udało się pobrać listy umiejętności",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, [toast]);

  if (isLoading) {
    return (
      <section id="skills" className="py-24 bg-secondary/30">
        <div className="container">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
            <span className="ml-2">Ładowanie umiejętności...</span>
          </div>
        </div>
      </section>
    );
  }

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
        
        {skillsByCategory.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>Nie znaleziono umiejętności.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal">
            {skillsByCategory.map((category, index) => (
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
        )}
        
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
