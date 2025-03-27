
import React from 'react';
import { ArrowLeft, LogOut, Edit, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Dummy data for projects
  const projects = [
    {
      id: 1,
      title: 'E-commerce Dashboard',
      description: 'Panel administracyjny dla sklepu internetowego z analizą danych sprzedażowych i zarządzaniem produktami.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase'],
      imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80',
      link: '#'
    },
    {
      id: 2,
      title: 'Aplikacja do zarządzania wydatkami',
      description: 'Aplikacja webowa pomagająca śledzić wydatki osobiste i tworzyć budżety miesięczne.',
      technologies: ['Vue.js', 'Node.js', 'Express', 'MongoDB'],
      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80',
      link: '#'
    },
    {
      id: 3,
      title: 'System rezerwacji online',
      description: 'System rezerwacji dla restauracji umożliwiający zarządzanie stolikami i przyjmowanie rezerwacji online.',
      technologies: ['React', 'Next.js', 'PostgreSQL', 'Stripe'],
      imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80',
      link: '#'
    }
  ];
  
  // Dummy data for skills
  const skills = [
    { id: 1, name: 'HTML5', category: 'Frontend' },
    { id: 2, name: 'CSS3', category: 'Frontend' },
    { id: 3, name: 'JavaScript', category: 'Frontend' },
    { id: 4, name: 'React', category: 'Frontend' },
    { id: 5, name: 'Node.js', category: 'Backend' },
    { id: 6, name: 'Express', category: 'Backend' },
    { id: 7, name: 'MongoDB', category: 'Backend' },
    { id: 8, name: 'Git', category: 'Narzędzia' }
  ];

  const handleLogout = () => {
    toast({
      title: "Wylogowano",
      description: "Pomyślnie wylogowano z panelu administracyjnego",
    });
    navigate('/');
  };

  const handleSaveProject = () => {
    toast({
      title: "Zapisano projekt",
      description: "Zmiany zostały zapisane pomyślnie",
    });
  };

  const handleSaveSkill = () => {
    toast({
      title: "Zapisano umiejętność",
      description: "Zmiany zostały zapisane pomyślnie",
    });
  };

  const handleDeleteProject = (id: number) => {
    toast({
      title: "Usunięto projekt",
      description: `Projekt o ID ${id} został usunięty`,
    });
  };

  const handleDeleteSkill = (id: number) => {
    toast({
      title: "Usunięto umiejętność",
      description: `Umiejętność o ID ${id} została usunięta`,
    });
  };

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
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="projects">Projekty</TabsTrigger>
            <TabsTrigger value="skills">Umiejętności</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Zarządzaj projektami</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus size={16} />
                    Dodaj nowy projekt
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dodaj nowy projekt</DialogTitle>
                    <DialogDescription>
                      Wypełnij poniższy formularz, aby dodać nowy projekt do swojego portfolio.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="title">Tytuł projektu</Label>
                      <Input id="title" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="description">Opis projektu</Label>
                      <Textarea id="description" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="technologies">Technologie (oddzielone przecinkami)</Label>
                      <Input id="technologies" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="imageUrl">URL obrazka</Label>
                      <Input id="imageUrl" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="link">Link do projektu</Label>
                      <Input id="link" className="mt-1" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleSaveProject}>Zapisz projekt</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Tytuł</TableHead>
                    <TableHead>Technologie</TableHead>
                    <TableHead className="text-right">Akcje</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>{project.id}</TableCell>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell>{project.technologies.join(', ')}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="icon">
                                <Edit size={16} />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edytuj projekt</DialogTitle>
                                <DialogDescription>
                                  Wprowadź zmiany w projekcie.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div>
                                  <Label htmlFor={`edit-title-${project.id}`}>Tytuł projektu</Label>
                                  <Input id={`edit-title-${project.id}`} defaultValue={project.title} className="mt-1" />
                                </div>
                                <div>
                                  <Label htmlFor={`edit-description-${project.id}`}>Opis projektu</Label>
                                  <Textarea id={`edit-description-${project.id}`} defaultValue={project.description} className="mt-1" />
                                </div>
                                <div>
                                  <Label htmlFor={`edit-technologies-${project.id}`}>Technologie</Label>
                                  <Input id={`edit-technologies-${project.id}`} defaultValue={project.technologies.join(', ')} className="mt-1" />
                                </div>
                                <div>
                                  <Label htmlFor={`edit-imageUrl-${project.id}`}>URL obrazka</Label>
                                  <Input id={`edit-imageUrl-${project.id}`} defaultValue={project.imageUrl} className="mt-1" />
                                </div>
                                <div>
                                  <Label htmlFor={`edit-link-${project.id}`}>Link do projektu</Label>
                                  <Input id={`edit-link-${project.id}`} defaultValue={project.link} className="mt-1" />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit" onClick={handleSaveProject}>Zapisz zmiany</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
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
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="skills" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Zarządzaj umiejętnościami</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus size={16} />
                    Dodaj nową umiejętność
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dodaj nową umiejętność</DialogTitle>
                    <DialogDescription>
                      Wypełnij poniższy formularz, aby dodać nową umiejętność do swojego portfolio.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="skill-name">Nazwa umiejętności</Label>
                      <Input id="skill-name" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="skill-category">Kategoria</Label>
                      <Input id="skill-category" className="mt-1" placeholder="np. Frontend, Backend, Narzędzia" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleSaveSkill}>Zapisz umiejętność</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nazwa</TableHead>
                    <TableHead>Kategoria</TableHead>
                    <TableHead className="text-right">Akcje</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {skills.map((skill) => (
                    <TableRow key={skill.id}>
                      <TableCell>{skill.id}</TableCell>
                      <TableCell className="font-medium">{skill.name}</TableCell>
                      <TableCell>{skill.category}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="icon">
                                <Edit size={16} />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edytuj umiejętność</DialogTitle>
                                <DialogDescription>
                                  Wprowadź zmiany w umiejętności.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div>
                                  <Label htmlFor={`edit-skill-name-${skill.id}`}>Nazwa umiejętności</Label>
                                  <Input id={`edit-skill-name-${skill.id}`} defaultValue={skill.name} className="mt-1" />
                                </div>
                                <div>
                                  <Label htmlFor={`edit-skill-category-${skill.id}`}>Kategoria</Label>
                                  <Input id={`edit-skill-category-${skill.id}`} defaultValue={skill.category} className="mt-1" />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit" onClick={handleSaveSkill}>Zapisz zmiany</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
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
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPanel;
