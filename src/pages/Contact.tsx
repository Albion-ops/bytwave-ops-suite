import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Waves, Mail, Phone, ArrowLeft } from 'lucide-react';

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <header className="container mx-auto flex items-center justify-between py-6 px-4">
        <div className="flex items-center gap-2">
          <Waves className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">BytWave Technologies</span>
        </div>
        <Button variant="ghost" onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </header>

      <main className="container mx-auto flex-1 px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-center">
            Get in Touch
          </h1>
          <p className="mb-12 text-xl text-muted-foreground text-center">
            Have a question or need our services? We're here to help.
          </p>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Email
                </CardTitle>
                <CardDescription>Send us an email anytime</CardDescription>
              </CardHeader>
              <CardContent>
                <a 
                  href="mailto:bytewave25@gmail.com" 
                  className="text-lg font-medium text-primary hover:underline"
                >
                  bytewave25@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Phone Numbers
                </CardTitle>
                <CardDescription>Call us during business hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <a 
                  href="tel:+254706312266" 
                  className="block text-lg font-medium text-primary hover:underline"
                >
                  +254-706-312-266
                </a>
                <a 
                  href="tel:+254113480651" 
                  className="block text-lg font-medium text-primary hover:underline"
                >
                  +254-113-480-651
                </a>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 p-6 rounded-lg bg-card border border-border">
            <h2 className="mb-4 text-2xl font-bold">Our Services</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• CCTV Installation & Maintenance</li>
              <li>• Computer Supply & Management</li>
              <li>• Custom POS Systems (Hotel, School Management, etc.)</li>
              <li>• IT Support & Consultation</li>
              <li>• Enterprise Management Solutions</li>
            </ul>
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

export default Contact;
