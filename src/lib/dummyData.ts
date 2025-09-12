// Comprehensive dummy data for the nutrition platform

export interface Student {
  id: string;
  name: string;
  email: string;
  classId: string;
  grade: string;
  age?: number;
  allergies?: string[];
  dietaryRestrictions?: string[];
  points: number;
  badges: string[];
  currentStreak: number;
  longestStreak: number;
  lunchAttendance: AttendanceRecord[];
  profileCompleted: boolean;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  classId: string;
  className: string;
}

export interface AttendanceRecord {
  date: string;
  status: 'completed' | 'partial' | 'missed';
  method: 'manual' | 'qr';
  points: number;
}

export interface LunchPlan {
  id: string;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  ingredients: string[];
  allergens: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'streak' | 'achievement' | 'milestone';
  requirement: string;
}

export interface AwarenessContent {
  id: string;
  title: string;
  type: 'article' | 'video' | 'quiz';
  description: string;
  content: string;
  points: number;
  completedBy: string[];
  createdBy: string;
  createdAt: string;
}

// Dummy Students
export const dummyStudents: Student[] = [
  {
    id: 'student-1',
    name: 'John Doe',
    email: 'john.doe@student.greenwood.edu',
    classId: 'class-5a',
    grade: '5A',
    age: 11,
    allergies: ['nuts'],
    dietaryRestrictions: [],
    points: 450,
    badges: ['lunch-streak-7', 'healthy-eater', 'quiz-master'],
    currentStreak: 12,
    longestStreak: 18,
    profileCompleted: true,
    lunchAttendance: [
      { date: '2025-09-10', status: 'completed', method: 'qr', points: 10 },
      { date: '2025-09-11', status: 'completed', method: 'manual', points: 10 },
      { date: '2025-09-12', status: 'completed', method: 'qr', points: 10 },
    ]
  },
  {
    id: 'student-2',
    name: 'Emma Wilson',
    email: 'emma.wilson@student.greenwood.edu',
    classId: 'class-5a',
    grade: '5A',
    age: 10,
    allergies: [],
    dietaryRestrictions: ['vegetarian'],
    points: 380,
    badges: ['lunch-streak-5', 'veggie-lover'],
    currentStreak: 8,
    longestStreak: 15,
    profileCompleted: false,
    lunchAttendance: [
      { date: '2025-09-10', status: 'completed', method: 'manual', points: 10 },
      { date: '2025-09-11', status: 'partial', method: 'manual', points: 5 },
      { date: '2025-09-12', status: 'completed', method: 'qr', points: 10 },
    ]
  },
  {
    id: 'student-3',
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@student.greenwood.edu',
    classId: 'class-6b',
    grade: '6B',
    age: 12,
    allergies: ['dairy'],
    dietaryRestrictions: [],
    points: 520,
    badges: ['lunch-streak-10', 'healthy-eater', 'content-explorer', 'streak-champion'],
    currentStreak: 15,
    longestStreak: 22,
    profileCompleted: true,
    lunchAttendance: [
      { date: '2025-09-10', status: 'completed', method: 'qr', points: 10 },
      { date: '2025-09-11', status: 'completed', method: 'qr', points: 10 },
      { date: '2025-09-12', status: 'completed', method: 'qr', points: 10 },
    ]
  }
];

// Dummy Teachers
export const dummyTeachers: Teacher[] = [
  {
    id: 'teacher-1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@greenwood.edu',
    classId: 'class-5a',
    className: '5A'
  },
  {
    id: 'teacher-2',
    name: 'Mike Davis',
    email: 'mike.davis@greenwood.edu',
    classId: 'class-6b',
    className: '6B'
  }
];

// Dummy Lunch Plans
export const dummyLunchPlans: LunchPlan[] = [
  {
    id: 'plan-1',
    name: 'Balanced Monday',
    description: 'Grilled chicken with vegetables and whole grain rice',
    calories: 520,
    protein: 28,
    carbs: 45,
    fat: 18,
    fiber: 8,
    ingredients: ['grilled chicken breast', 'brown rice', 'steamed broccoli', 'carrots', 'olive oil'],
    allergens: []
  },
  {
    id: 'plan-2',
    name: 'Veggie Tuesday',
    description: 'Plant-based protein bowl with quinoa and fresh vegetables',
    calories: 480,
    protein: 22,
    carbs: 52,
    fat: 15,
    fiber: 12,
    ingredients: ['quinoa', 'black beans', 'avocado', 'cherry tomatoes', 'spinach', 'tahini dressing'],
    allergens: ['sesame']
  }
];

// Dummy Badges
export const dummyBadges: Badge[] = [
  {
    id: 'lunch-streak-5',
    name: 'Lunch Streak 5',
    description: 'Completed lunch plan for 5 consecutive days',
    icon: '🔥',
    category: 'streak',
    requirement: '5 consecutive days'
  },
  {
    id: 'lunch-streak-7',
    name: 'Weekly Champion',
    description: 'Completed lunch plan for 7 consecutive days',
    icon: '👑',
    category: 'streak',
    requirement: '7 consecutive days'
  },
  {
    id: 'lunch-streak-10',
    name: 'Nutrition Master',
    description: 'Completed lunch plan for 10 consecutive days',
    icon: '🏆',
    category: 'streak',
    requirement: '10 consecutive days'
  },
  {
    id: 'healthy-eater',
    name: 'Healthy Eater',
    description: 'Completed 50 lunch plans',
    icon: '🥗',
    category: 'achievement',
    requirement: '50 completed lunches'
  },
  {
    id: 'quiz-master',
    name: 'Quiz Master',
    description: 'Completed 10 nutrition quizzes',
    icon: '🧠',
    category: 'achievement',
    requirement: '10 quizzes completed'
  },
  {
    id: 'veggie-lover',
    name: 'Veggie Lover',
    description: 'Chose vegetarian options 20 times',
    icon: '🥕',
    category: 'achievement',
    requirement: '20 vegetarian choices'
  },
  {
    id: 'content-explorer',
    name: 'Content Explorer',
    description: 'Read 15 nutrition articles',
    icon: '📚',
    category: 'achievement',
    requirement: '15 articles read'
  },
  {
    id: 'streak-champion',
    name: 'Streak Champion',
    description: 'Achieved a 20-day lunch streak',
    icon: '⚡',
    category: 'milestone',
    requirement: '20-day streak'
  }
];

// Dummy Awareness Content
export const dummyAwarenessContent: AwarenessContent[] = [
  {
    id: 'content-1',
    title: 'The Importance of Balanced Nutrition',
    type: 'article',
    description: 'Learn about macronutrients and their role in your health',
    content: 'A balanced diet includes the right proportions of carbohydrates, proteins, and fats...',
    points: 15,
    completedBy: ['student-1', 'student-3'],
    createdBy: 'admin-1',
    createdAt: '2025-09-01'
  },
  {
    id: 'content-2',
    title: 'Hydration Habits',
    type: 'video',
    description: 'Understanding why water is essential for your body',
    content: 'Watch this engaging video about proper hydration...',
    points: 20,
    completedBy: ['student-1'],
    createdBy: 'admin-1',
    createdAt: '2025-09-05'
  },
  {
    id: 'content-3',
    title: 'Nutrition Knowledge Quiz',
    type: 'quiz',
    description: 'Test your knowledge about healthy eating habits',
    content: 'Interactive quiz with 10 questions about nutrition basics...',
    points: 25,
    completedBy: ['student-1', 'student-3'],
    createdBy: 'admin-1',
    createdAt: '2025-09-08'
  }
];

// Analytics dummy data
export const schoolAnalytics = {
  totalStudents: 245,
  lunchAttendanceRate: 87.3,
  averagePoints: 420,
  totalBadgesEarned: 1250,
  weeklyAttendance: [
    { day: 'Mon', rate: 89 },
    { day: 'Tue', rate: 85 },
    { day: 'Wed', rate: 91 },
    { day: 'Thu', rate: 86 },
    { day: 'Fri', rate: 83 },
  ],
  classComparison: [
    { class: '5A', attendance: 92, avgPoints: 445 },
    { class: '5B', attendance: 88, avgPoints: 398 },
    { class: '6A', attendance: 85, avgPoints: 420 },
    { class: '6B', attendance: 84, avgPoints: 385 },
  ]
};

export const adminAnalytics = {
  totalSchools: 15,
  totalStudents: 3680,
  overallAttendanceRate: 82.1,
  contentEngagement: 76.4,
  schoolPerformance: [
    { school: 'Greenwood Elementary', attendance: 87.3, students: 245 },
    { school: 'Oakfield Primary', attendance: 84.2, students: 198 },
    { school: 'Maple Grove School', attendance: 89.1, students: 312 },
    { school: 'Sunset Elementary', attendance: 78.5, students: 267 },
  ],
  monthlyTrends: [
    { month: 'Jan', attendance: 79.2, engagement: 71.5 },
    { month: 'Feb', attendance: 81.1, engagement: 73.2 },
    { month: 'Mar', attendance: 83.4, engagement: 75.8 },
    { month: 'Apr', attendance: 82.8, engagement: 76.4 },
  ]
};