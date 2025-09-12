import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Apple, User, GraduationCap, Users } from 'lucide-react';
import heroImage from '@/assets/hero-nutrition.jpg';

const demoCredentials = [
  { role: 'Admin', email: 'admin@nutriplatform.com', password: 'admin123', icon: Users },
  { role: 'School', email: 'principal@greenwood.edu', password: 'school123', icon: GraduationCap },
  { role: 'Teacher', email: 'sarah.johnson@greenwood.edu', password: 'teacher123', icon: User },
  { role: 'Student', email: 'john.doe@student.greenwood.edu', password: 'student123', icon: Apple },
];

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    if (!success) {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img 
          src={heroImage} 
          alt="Nutrition Platform" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-primary opacity-80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h1 className="text-4xl font-bold mb-4">Integrated Nutrition Platform</h1>
            <p className="text-xl opacity-90">Empowering healthy eating habits in schools through gamification and engagement</p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <Card className="card-shadow-medium">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-primary">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to your nutrition platform account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button
                  type="submit"
                  className="w-full gradient-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Demo Credentials */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Demo Accounts</CardTitle>
              <CardDescription>
                Click to use demo credentials for different roles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {demoCredentials.map((demo, index) => {
                const IconComponent = demo.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start transition-smooth hover:gradient-secondary"
                    onClick={() => handleDemoLogin(demo.email, demo.password)}
                  >
                    <IconComponent className="mr-2 h-4 w-4" />
                    <span className="font-medium">{demo.role}</span>
                    <span className="ml-auto text-muted-foreground text-xs">
                      {demo.email}
                    </span>
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};