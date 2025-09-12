// Authentication and dummy user data
export type UserRole = 'admin' | 'school' | 'teacher' | 'parent' | 'student';

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  name: string;
  schoolId?: string;
  classId?: string;
  isFirstLogin?: boolean;
  profileCompleted?: boolean;
}

// Dummy users for different roles
export const dummyUsers: User[] = [
  // Admin
  {
    id: 'admin-1',
    email: 'admin@nutriplatform.com',
    password: 'admin123',
    role: 'admin',
    name: 'System Administrator',
    profileCompleted: true,
  },
  
  // School
  {
    id: 'school-1',
    email: 'principal@greenwood.edu',
    password: 'school123',
    role: 'school',
    name: 'Greenwood Elementary',
    schoolId: 'school-1',
    profileCompleted: true,
  },
  
  // Teachers
  {
    id: 'teacher-1',
    email: 'sarah.johnson@greenwood.edu',
    password: 'teacher123',
    role: 'teacher',
    name: 'Sarah Johnson',
    schoolId: 'school-1',
    classId: 'class-5a',
    profileCompleted: true,
  },
  {
    id: 'teacher-2',
    email: 'mike.davis@greenwood.edu',
    password: 'teacher456',
    role: 'teacher',
    name: 'Mike Davis',
    schoolId: 'school-1',
    classId: 'class-6b',
    profileCompleted: true,
  },
  
  // Students (some with first login)
  {
    id: 'student-1',
    email: 'john.doe@student.greenwood.edu',
    password: 'student123',
    role: 'student',
    name: 'John Doe',
    schoolId: 'school-1',
    classId: 'class-5a',
    isFirstLogin: false,
    profileCompleted: true,
  },
  {
    id: 'student-2',
    email: 'emma.wilson@student.greenwood.edu',
    password: 'student456',
    role: 'student',
    name: 'Emma Wilson',
    schoolId: 'school-1',
    classId: 'class-5a',
    isFirstLogin: true,
    profileCompleted: false,
  },
  
  // Parents
  {
    id: 'parent-1',
    email: 'mary.doe@parent.greenwood.edu',
    password: 'parent123',
    role: 'parent',
    name: 'Mary Doe',
    schoolId: 'school-1',
    profileCompleted: true,
  },
];

export const authenticateUser = (email: string, password: string): User | null => {
  return dummyUsers.find(user => user.email === email && user.password === password) || null;
};

export const getUserById = (id: string): User | null => {
  return dummyUsers.find(user => user.id === id) || null;
};

export const updateUserProfile = (userId: string, updates: Partial<User>): void => {
  const userIndex = dummyUsers.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    dummyUsers[userIndex] = { ...dummyUsers[userIndex], ...updates };
  }
};