import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Apple, 
  Trophy, 
  BookOpen, 
  User, 
  LogOut, 
  Bell,
  Search
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface StudentLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/student/dashboard', icon: Home },
  { name: 'Lunch Plan', href: '/student/lunch', icon: Apple },
  { name: 'Achievements', href: '/student/achievements', icon: Trophy },
  { name: 'Learn', href: '/student/learn', icon: BookOpen },
  { name: 'Profile', href: '/student/profile', icon: User },
];

export const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border card-shadow">
        <div className="p-6">
          <h2 className="text-xl font-bold text-primary">
            {user?.role === 'student' ? 'Student Portal' : 'Parent Portal'}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">{user?.name}</p>
        </div>
        
        <nav className="px-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Button
                key={item.name}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start transition-smooth ${
                  isActive ? 'gradient-primary text-white' : 'hover:bg-accent'
                }`}
                onClick={() => handleNavigation(item.href)}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.name}
              </Button>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="p-3 bg-muted rounded-lg mb-3">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            <p className="text-xs text-primary font-medium capitalize">{user?.role}</p>
          </div>
          <Button 
            variant="outline" 
            className="w-full justify-start hover:bg-destructive hover:text-destructive-foreground transition-smooth"
            onClick={logout}
          >
            <LogOut className="mr-3 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-card border-b border-border p-4 card-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};