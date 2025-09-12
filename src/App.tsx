import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import { LoginForm } from "@/components/auth/LoginForm";
import { FirstLoginFlow } from "@/components/auth/FirstLoginFlow";

// Dashboard Components
import { AdminDashboard } from "@/pages/admin/Dashboard";
import { AdminSchools } from "@/pages/admin/Schools";
import { AdminContent } from "@/pages/admin/Content";
import { AdminSettings } from "@/pages/admin/Settings";
import { SchoolDashboard } from "@/pages/school/Dashboard";
import { SchoolStudents } from "@/pages/school/Students";
import { TeacherDashboard } from "@/pages/teacher/Dashboard";
import { StudentDashboard } from "@/pages/student/Dashboard";
import { StudentLunch } from "@/pages/student/Lunch";
import { StudentAchievements } from "@/pages/student/Achievements";

// Additional Pages
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  // Check if student needs to complete first login
  if (user.role === 'student' && user.isFirstLogin && !user.profileCompleted) {
    return <FirstLoginFlow />;
  }

  return <>{children}</>;
};

// Route Guard for Role-based Access
const RoleRoute = ({ allowedRoles, children }: { allowedRoles: string[]; children: React.ReactNode }) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const { user } = useAuth();

  // Redirect to appropriate dashboard based on role
  const getDefaultRoute = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'admin': return '/admin/dashboard';
      case 'school': return '/school/dashboard';
      case 'teacher': return '/teacher/dashboard';
      case 'student':
      case 'parent': return '/student/dashboard';
      default: return '/';
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />
      
      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={
        <RoleRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </RoleRoute>
      } />
      <Route path="/admin/schools" element={
        <RoleRoute allowedRoles={['admin']}>
          <AdminSchools />
        </RoleRoute>
      } />
      <Route path="/admin/content" element={
        <RoleRoute allowedRoles={['admin']}>
          <AdminContent />
        </RoleRoute>
      } />
      <Route path="/admin/settings" element={
        <RoleRoute allowedRoles={['admin']}>
          <AdminSettings />
        </RoleRoute>
      } />
      
      {/* School Routes */}
      <Route path="/school/dashboard" element={
        <RoleRoute allowedRoles={['school']}>
          <SchoolDashboard />
        </RoleRoute>
      } />
      <Route path="/school/students" element={
        <RoleRoute allowedRoles={['school']}>
          <SchoolStudents />
        </RoleRoute>
      } />
      <Route path="/school/teachers" element={
        <RoleRoute allowedRoles={['school']}>
          <div className="p-6"><h1 className="text-2xl font-bold">Teachers Management</h1><p>Coming soon...</p></div>
        </RoleRoute>
      } />
      <Route path="/school/attendance" element={
        <RoleRoute allowedRoles={['school']}>
          <div className="p-6"><h1 className="text-2xl font-bold">Attendance Management</h1><p>Coming soon...</p></div>
        </RoleRoute>
      } />
      
      {/* Teacher Routes */}
      <Route path="/teacher/dashboard" element={
        <RoleRoute allowedRoles={['teacher']}>
          <TeacherDashboard />
        </RoleRoute>
      } />
      <Route path="/teacher/class" element={
        <RoleRoute allowedRoles={['teacher']}>
          <div className="p-6"><h1 className="text-2xl font-bold">My Class</h1><p>Coming soon...</p></div>
        </RoleRoute>
      } />
      <Route path="/teacher/attendance" element={
        <RoleRoute allowedRoles={['teacher']}>
          <div className="p-6"><h1 className="text-2xl font-bold">Attendance Tracking</h1><p>Coming soon...</p></div>
        </RoleRoute>
      } />
      <Route path="/teacher/gamification" element={
        <RoleRoute allowedRoles={['teacher']}>
          <div className="p-6"><h1 className="text-2xl font-bold">Gamification</h1><p>Coming soon...</p></div>
        </RoleRoute>
      } />
      
      {/* Student/Parent Routes */}
      <Route path="/student/dashboard" element={
        <RoleRoute allowedRoles={['student', 'parent']}>
          <StudentDashboard />
        </RoleRoute>
      } />
      <Route path="/student/lunch" element={
        <RoleRoute allowedRoles={['student', 'parent']}>
          <StudentLunch />
        </RoleRoute>
      } />
      <Route path="/student/achievements" element={
        <RoleRoute allowedRoles={['student', 'parent']}>
          <StudentAchievements />
        </RoleRoute>
      } />
      <Route path="/student/learn" element={
        <RoleRoute allowedRoles={['student', 'parent']}>
          <div className="p-6"><h1 className="text-2xl font-bold">Learning Content</h1><p>Coming soon...</p></div>
        </RoleRoute>
      } />
      <Route path="/student/profile" element={
        <RoleRoute allowedRoles={['student', 'parent']}>
          <div className="p-6"><h1 className="text-2xl font-bold">Profile</h1><p>Coming soon...</p></div>
        </RoleRoute>
      } />
      
      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ProtectedRoute>
            <Layout>
              <AppRoutes />
            </Layout>
          </ProtectedRoute>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
