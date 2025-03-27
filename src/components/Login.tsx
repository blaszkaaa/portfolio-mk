
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Lock, User } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Label } from './ui/label';
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Zalogowano pomyślnie",
        description: "Teraz możesz edytować swoje portfolio",
      });
    }, 1500);
  };

  return (
    <section id="login" className="py-16 bg-secondary/20">
      <div className="container">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto reveal">
          <h2 className="text-3xl font-bold mb-4">Panel Administratora</h2>
          <p className="text-muted-foreground mb-8">
            Zaloguj się, aby edytować swoje portfolio i dodawać nowe projekty.
          </p>

          <Sheet>
            <SheetTrigger asChild>
              <Button className="flex items-center gap-2">
                <Lock size={18} /> Zaloguj się
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Logowanie</SheetTitle>
                <SheetDescription>
                  Zaloguj się, aby zarządzać swoim portfolio.
                </SheetDescription>
              </SheetHeader>
              <form onSubmit={handleLogin} className="mt-8 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="twoj@email.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Hasło</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logowanie...' : 'Zaloguj się'}
                </Button>
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
};

export default Login;
