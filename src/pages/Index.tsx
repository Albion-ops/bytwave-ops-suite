import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Waves, Ticket, Monitor, FolderKanban, ArrowRight, Camera, Laptop, ShoppingCart, Phone, Mail } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <header className="container mx-auto flex items-center justify-between py-6 px-4">
        <div className="flex items-center gap-2">
          <Waves className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">BytWave Technologies</span>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => navigate('/contact')}>
            Contact
          </Button>
          <Button onClick={() => navigate('/auth')}>
            Sign In
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto flex-1 px-4">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Enterprise Management
            <br />
            <span className="text-primary">Made Simple</span>
          </h1>
          <p className="mb-8 max-w-2xl text-xl text-muted-foreground">
            Comprehensive platform for ticket management, device inventory, and project tracking. 
            Everything your team needs in one place.
          </p>
          <div className="flex gap-4">
            <Button size="lg" onClick={() => navigate('/auth')}>
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="py-20">
          <h2 className="mb-12 text-center text-3xl font-bold">Management Features</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Ticket className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Ticket Management</h3>
              <p className="text-muted-foreground">
                Track and resolve support tickets efficiently with priority-based workflows
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Monitor className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Device Inventory</h3>
              <p className="text-muted-foreground">
                Manage your hardware assets with detailed tracking and status monitoring
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <FolderKanban className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Project Tracking</h3>
              <p className="text-muted-foreground">
                Organize and monitor projects from planning to completion
              </p>
            </div>
          </div>
        </div>

        <div className="py-20">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Services</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Camera className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">CCTV Installation</h3>
              <p className="text-muted-foreground">
                Professional surveillance systems installation and maintenance for enhanced security
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Laptop className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Computer Supply & Management</h3>
              <p className="text-muted-foreground">
                Complete IT hardware solutions with procurement, setup, and ongoing management
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <ShoppingCart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Custom POS Systems</h3>
              <p className="text-muted-foreground">
                Tailored point-of-sale solutions including hotel systems, school management, and more
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 BytWave Technologies. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
