import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Apple, 
  Trophy, 
  TrendingUp,
  Calendar,
  BookOpen,
  Target,
  Flame,
  Star,
  Play
} from 'lucide-react';
import { dummyStudents, dummyLunchPlans, dummyBadges, dummyAwarenessContent } from '@/lib/dummyData';
import badgesImage from '@/assets/badges-collection.jpg';

const StatCard = ({ title, value, subtitle, icon: Icon, gradient }: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
  gradient?: string;
}) => (
  <Card className="card-shadow transition-smooth hover:card-shadow-medium">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-primary">{value}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <div className={`p-3 rounded-full ${gradient || 'gradient-primary'}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export const StudentDashboard: React.FC = () => {
  const student = dummyStudents[0]; // John Doe
  const todayPlan = dummyLunchPlans[0];
  const recentBadges = dummyBadges.filter(badge => student.badges.includes(badge.id));
  const availableContent = dummyAwarenessContent.filter(content => 
    !content.completedBy.includes(student.id)
  );

  const weekProgress = [
    { day: 'Mon', completed: true },
    { day: 'Tue', completed: true },
    { day: 'Wed', completed: true },
    { day: 'Thu', completed: false },
    { day: 'Fri', completed: false },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-lg gradient-primary p-6 text-white">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {student.name}! 👋</h1>
          <p className="text-white/90 mb-4">
            You're on a {student.currentStreak} day streak! Keep up the amazing work.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5" />
              <span className="font-semibold">{student.currentStreak} day streak</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              <span className="font-semibold">{student.points} points</span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
          <Apple className="w-full h-full" />
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Points"
          value={student.points.toString()}
          subtitle="Rank #2 in class"
          icon={Trophy}
          gradient="gradient-gamification"
        />
        <StatCard
          title="Current Streak"
          value={`${student.currentStreak} days`}
          subtitle={`Best: ${student.longestStreak} days`}
          icon={Flame}
          gradient="gradient-success"
        />
        <StatCard
          title="Badges Earned"
          value={student.badges.length.toString()}
          subtitle="3 new this month"
          icon={Star}
        />
        <StatCard
          title="Weekly Goal"
          value="3/5"
          subtitle="60% complete"
          icon={Target}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Lunch Plan */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Apple className="h-5 w-5 text-primary" />
                Today's Lunch Plan
              </CardTitle>
              <CardDescription>
                Your personalized nutrition plan for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{todayPlan.name}</h3>
                    <p className="text-muted-foreground">{todayPlan.description}</p>
                  </div>
                  <Badge className="gradient-success text-white">
                    {todayPlan.calories} cal
                  </Badge>
                </div>
                
                <div className="grid grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Protein</p>
                    <p className="font-semibold">{todayPlan.protein}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Carbs</p>
                    <p className="font-semibold">{todayPlan.carbs}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Fat</p>
                    <p className="font-semibold">{todayPlan.fat}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Fiber</p>
                    <p className="font-semibold">{todayPlan.fiber}g</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Ingredients:</h4>
                  <div className="flex flex-wrap gap-2">
                    {todayPlan.ingredients.map((ingredient, index) => (
                      <Badge key={index} variant="outline">
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full gradient-primary">
                  <Calendar className="mr-2 h-4 w-4" />
                  Mark as Completed
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Progress */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                This Week's Progress
              </CardTitle>
              <CardDescription>
                Track your daily lunch completion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Weekly Goal</span>
                  <span className="text-sm text-muted-foreground">60% (3/5 days)</span>
                </div>
                <Progress value={60} className="h-2" />
                
                <div className="flex justify-between gap-2">
                  {weekProgress.map((day) => (
                    <div key={day.day} className="flex flex-col items-center">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                        ${day.completed ? 'gradient-success text-white' : 'bg-muted text-muted-foreground'}
                      `}>
                        {day.completed ? '✓' : day.day[0]}
                      </div>
                      <span className="text-xs mt-1">{day.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Badges */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-gamification" />
                Recent Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentBadges.slice(0, 3).map((badge) => (
                  <div key={badge.id} className="flex items-center gap-3 p-2 bg-muted rounded-lg">
                    <div className="text-2xl">{badge.icon}</div>
                    <div>
                      <p className="font-medium text-sm">{badge.name}</p>
                      <p className="text-xs text-muted-foreground">{badge.description}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Badges
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Learning Content */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Learn & Earn
              </CardTitle>
              <CardDescription>
                Complete content to earn points
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {availableContent.slice(0, 2).map((content) => (
                  <div key={content.id} className="p-3 border border-border rounded-lg hover:bg-muted transition-smooth">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{content.title}</h4>
                      <Badge variant="secondary">+{content.points}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{content.description}</p>
                    <Button size="sm" variant="outline" className="w-full">
                      <Play className="mr-2 h-3 w-3" />
                      Start
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Content
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};