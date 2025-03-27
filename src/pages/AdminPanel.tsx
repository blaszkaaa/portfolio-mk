import React, { useEffect, useState } from 'react';
import { ArrowLeft, LogOut, Edit, Plus, Trash2, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image_url: string;
  link: string;
}

interface Skill {
  id: string;
  name: string;
  category: string;
}

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isChecking, setIsChecking] = useState(true);
  
  // Check authentication status
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        toast({
          title: "Nie jesteś zalogowany",
          description: "Musisz się zalogować, aby uzyskać dostęp do panelu administracyjnego",
          variant: "destructive",
        });
        navigate('/');
        return;
      }
      
      // Verify this is the allowed admin user
      const email = data.session.user.email;
      if (email !== 'mateuszniema1@gmail.com') {
        toast({
          title: "Dostęp zabroniony",
          description: "Tylko administrator może uzyskać dostęp do panelu administracyjnego",
          variant: "destructive",
        });
        
        // Force logout
        await supabase.auth.signOut();
        navigate('/');
        return;
      }
      
      setIsChecking(false);
      fetchData();
    };
    
    checkSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/');
      } else if (session.user.email !== 'mateuszniema1@gmail.com') {
        // If somehow a non-admin user gets a session, log them out
        supabase.auth.signOut();
        navigate('/');
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);
  
  const fetchData = async () => {
    setIsLoading(true);
    
    try {
      // Fetch projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*');
        
      if (projectsError) throw projectsError;
      setProjects(projectsData || []);
      
      // Fetch skills
      const { data: skillsData, error: skillsError } = await supabase
        .from('skills')
        .select('*');
        
      if (skillsError) throw skillsError;
      setSkills(skillsData || []);
    } catch (error: any) {
      toast({
        title: "Błąd pobierania danych",
        description: error.message || "Nie udało się pobrać danych z bazy",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Wylogowano",
      description: "Pomyślnie wylogowano z panelu administracyjnego",
    });
    navigate('/');
  };

  // Project management functions
  const handleSaveProject = async (project: Partial<Project>, isEdit = false) => {
    try {
      let result;
      
      if (isEdit && project.id) {
        // Update existing project
        result = await supabase
          .from('projects')
          .update({
            title: project.title,
            description: project.description,
            technologies: project.technologies,
            image_url: project.image_url,
            link: project.link,
            updated_at: new Date().toISOString(),
          })
          .eq('id', project.id);
      } else {
        // Create new project
        result = await supabase
          .from('projects')
          .insert([{
            title: project.title,
            description: project.description,
            technologies: project.technologies,
            image_url: project.image_url,
            link: project.link,
          }]);
      }
      
      if (result.error) throw result.error;
      
      toast({
        title: isEdit ? "Zaktualizowano projekt" : "Dodano nowy projekt",
        description: "Zmiany zostały zapisane pomyślnie",
      });
      
      fetchData();
    } catch (error: any) {
      toast({
        title: "Błąd zapisywania projektu",
        description: error.message || "Nie udało się zapisać projektu",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: "Usunięto projekt",
        description: "Projekt został pomyślnie usunięty",
      });
      
      setProjects(projects.filter(project => project.id !== id));
    } catch (error: any) {
      toast({
        title: "Błąd usuwania projektu",
        description: error.message || "Nie udało się usunąć projektu",
        variant: "destructive",
      });
    }
  };

  // Skill management functions
  const handleSaveSkill = async (skill: Partial<Skill>, isEdit = false) => {
    try {
      let result;
      
      if (isEdit && skill.id) {
        // Update existing skill
        result = await supabase
          .from('skills')
          .update({
            name: skill.name,
            category: skill.category,
            updated_at: new Date().toISOString(),
          })
          .eq('id', skill.id);
      } else {
        // Create new skill
        result = await supabase
          .from('skills')
          .insert([{
            name: skill.name,
            category: skill.category,
          }]);
      }
      
      if (result.error) throw result.error;
      
      toast({
        title: isEdit ? "Zaktualizowano umiejętność" : "Dodano nową umiejętność",
        description: "Zmiany zostały zapisane pomyślnie",
      });
      
      fetchData();
    } catch (error: any) {
      toast({
        title: "Błąd zapisywania umiejętności",
        description: error.message || "Nie udało się zapisać umiejętności",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSkill = async (id: string) => {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: "Usunięto umiejętność",
        description: "Umiejętność została pomyślnie usunięta",
      });
      
      setSkills(skills.filter(skill => skill.id !== id));
    } catch (error: any) {
      toast({
        title: "Błąd usuwania umiejętności",
        description: error.message || "Nie udało się usunąć umiejętności",
        variant: "destructive",
      });
    }
  };

  // Loading state
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
        <span className="ml-2">Sprawdzanie uprawnień...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/')}
              className="rounded-full"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-xl font-bold">Panel Administracyjny</h1>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut size={16} />
            Wyloguj się
          </Button>
        </div>
      </header>

      <main className="container py-8">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
            <span className="ml-2">Ładowanie danych...</span>
          </div>
        ) : (
          <Tabs defaultValue="projects" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="projects">Projekty</TabsTrigger>
              <TabsTrigger value="skills">Umiejętności</TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Zarządzaj projektami</h2>
                <ProjectDialog onSave={(data) => handleSaveProject(data)} />
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tytuł</TableHead>
                      <TableHead>Technologie</TableHead>
                      <TableHead className="text-right">Akcje</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                          Nie znaleziono projektów. Dodaj swój pierwszy projekt.
                        </TableCell>
                      </TableRow>
                    ) : (
                      projects.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell className="font-medium">{project.title}</TableCell>
                          <TableCell>{project.technologies.join(', ')}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <ProjectDialog project={project} onSave={(data) => handleSaveProject({...data, id: project.id}, true)} />
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleDeleteProject(project.id)}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="skills" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Zarządzaj umiejętnościami</h2>
                <SkillDialog onSave={(data) => handleSaveSkill(data)} />
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nazwa</TableHead>
                      <TableHead>Kategoria</TableHead>
                      <TableHead className="text-right">Akcje</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {skills.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                          Nie znaleziono umiejętności. Dodaj swoją pierwszą umiejętność.
                        </TableCell>
                      </TableRow>
                    ) : (
                      skills.map((skill) => (
                        <TableRow key={skill.id}>
                          <TableCell className="font-medium">{skill.name}</TableCell>
                          <TableCell>{skill.category}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <SkillDialog skill={skill} onSave={(data) => handleSaveSkill({...data, id: skill.id}, true)} />
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleDeleteSkill(skill.id)}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
};

// Project Dialog Component
const ProjectDialog = ({ project, onSave }: { project?: Project, onSave: (data: Partial<Project>) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(project?.title || '');
  const [description, setDescription] = useState(project?.description || '');
  const [technologies, setTechnologies] = useState(project?.technologies.join(', ') || '');
  const [imageUrl, setImageUrl] = useState(project?.image_url || '');
  const [link, setLink] = useState(project?.link || '');
  
  const resetForm = () => {
    if (!project) {
      setTitle('');
      setDescription('');
      setTechnologies('');
      setImageUrl('');
      setLink('');
    } else {
      setTitle(project.title);
      setDescription(project.description);
      setTechnologies(project.technologies.join(', '));
      setImageUrl(project.image_url);
      setLink(project.link);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      description,
      technologies: technologies.split(',').map(tech => tech.trim()),
      image_url: imageUrl,
      link
    });
    setIsOpen(false);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (open) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          {project ? <Edit size={16} /> : <Plus size={16} />}
          {project ? 'Edytuj' : 'Dodaj nowy projekt'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{project ? 'Edytuj projekt' : 'Dodaj nowy projekt'}</DialogTitle>
          <DialogDescription>
            {project ? 'Wprowadź zmiany w projekcie.' : 'Wypełnij poniższy formularz, aby dodać nowy projekt do swojego portfolio.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="title">Tytuł projektu</Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="mt-1" 
                required 
              />
            </div>
            <div>
              <Label htmlFor="description">Opis projektu</Label>
              <Textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                className="mt-1" 
                required 
              />
            </div>
            <div>
              <Label htmlFor="technologies">Technologie (oddzielone przecinkami)</Label>
              <Input 
                id="technologies" 
                value={technologies} 
                onChange={(e) => setTechnologies(e.target.value)} 
                className="mt-1" 
                required 
              />
            </div>
            <div>
              <Label htmlFor="imageUrl">URL obrazka</Label>
              <Input 
                id="imageUrl" 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)} 
                className="mt-1" 
                required 
              />
            </div>
            <div>
              <Label htmlFor="link">Link do projektu</Label>
              <Input 
                id="link" 
                value={link} 
                onChange={(e) => setLink(e.target.value)} 
                className="mt-1" 
                required 
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Zapisz</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Skill Dialog Component
const SkillDialog = ({ skill, onSave }: { skill?: Skill, onSave: (data: Partial<Skill>) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(skill?.name || '');
  const [category, setCategory] = useState(skill?.category || '');
  
  const resetForm = () => {
    if (!skill) {
      setName('');
      setCategory('');
    } else {
      setName(skill.name);
      setCategory(skill.category);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, category });
    setIsOpen(false);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (open) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          {skill ? <Edit size={16} /> : <Plus size={16} />}
          {skill ? 'Edytuj' : 'Dodaj nową umiejętność'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{skill ? 'Edytuj umiejętność' : 'Dodaj nową umiejętność'}</DialogTitle>
          <DialogDescription>
            {skill ? 'Wprowadź zmiany w umiejętności.' : 'Wypełnij poniższy formularz, aby dodać nową umiejętność do swojego portfolio.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="name">Nazwa umiejętności</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="mt-1" 
                required 
              />
            </div>
            <div>
              <Label htmlFor="category">Kategoria</Label>
              <Input 
                id="category" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                className="mt-1" 
                placeholder="np. Frontend, Backend, Narzędzia" 
                required 
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Zapisz</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;
