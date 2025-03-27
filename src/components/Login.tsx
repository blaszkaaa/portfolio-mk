
import React, { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Lock, User } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Label } from './ui/label';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsLoggedIn(true);
      }
    };

    checkSession();

    // Setup auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Zalogowano pomyślnie",
        description: "Teraz możesz edytować swoje portfolio",
      });
      
      // Redirect to admin panel after successful login
      navigate('/admin');
    } catch (error: any) {
      toast({
        title: "Błąd logowania",
        description: error.message || "Nie udało się zalogować. Sprawdź dane logowania.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    
    try {
      // Sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            is_admin: true,
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Rejestracja zakończona pomyślnie",
        description: "Sprawdź swoją skrzynkę email, aby potwierdzić konto.",
      });
    } catch (error: any) {
      toast({
        title: "Błąd rejestracji",
        description: error.message || "Nie udało się zarejestrować. Spróbuj ponownie.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // If already logged in, show a button to go to admin panel
  if (isLoggedIn) {
    return (
      <section id="login" className="py-16 bg-secondary/20">
        <div className="container">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto reveal">
            <h2 className="text-3xl font-bold mb-4">Panel Administratora</h2>
            <p className="text-muted-foreground mb-8">
              Jesteś już zalogowany. Przejdź do panelu administracyjnego, aby zarządzać portfolio.
            </p>
            <Button onClick={() => navigate('/admin')} className="flex items-center gap-2">
              <Lock size={18} /> Przejdź do panelu administracyjnego
            </Button>
          </div>
        </div>
      </section>
    );
  }

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
                <div className="text-center mt-4">
                  <p className="text-sm text-muted-foreground">
                    Nie masz jeszcze konta? 
                  </p>
                  <Button 
                    type="button" 
                    variant="link" 
                    onClick={handleSignUp}
                    disabled={isLoading}
                  >
                    Zarejestruj się
                  </Button>
                </div>
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
};

export default Login;
