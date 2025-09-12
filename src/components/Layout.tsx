import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { SchoolLayout } from '@/components/layouts/SchoolLayout';
import { TeacherLayout } from '@/components/layouts/TeacherLayout';
import { StudentLayout } from '@/components/layouts/StudentLayout';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  switch (user.role) {
    case 'admin':
      return <AdminLayout>{children}</AdminLayout>;
    case 'school':
      return <SchoolLayout>{children}</SchoolLayout>;
    case 'teacher':
      return <TeacherLayout>{children}</TeacherLayout>;
    case 'student':
    case 'parent':
      return <StudentLayout>{children}</StudentLayout>;
    default:
      return <div className="min-h-screen bg-background">{children}</div>;
  }
};