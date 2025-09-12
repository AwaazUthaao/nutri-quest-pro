import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  GraduationCap, 
  QrCode, 
  TrendingUp,
  Apple,
  Trophy,
  Calendar,
  Plus
} from 'lucide-react';
import { schoolAnalytics, dummyStudents, dummyTeachers } from '@/lib/dummyData';

const StatCard = ({ title, value, change, icon: Icon }: {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
}) => (
  <Card className="card-shadow transition-smooth hover:card-shadow-medium">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-primary">{value}</p>
          <p className="text-xs flex items-center mt-1 text-success">
            <TrendingUp className="h-3 w-3 mr-1" />
            {change}
          </p>
        </div>
        <div className="gradient-primary p-3 rounded-full">
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export const SchoolDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">School Dashboard</h1>
          <p className="text-muted-foreground">Manage your school's nutrition program</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <QrCode className="mr-2 h-4 w-4" />
            Generate QR
          </Button>
          <Button className="gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={schoolAnalytics.totalStudents.toString()}
          change="+12 this month"
          icon={Users}
        />
        <StatCard
          title="Lunch Attendance"
          value={`${schoolAnalytics.lunchAttendanceRate}%`}
          change="+2.5% this week"
          icon={Apple}
        />
        <StatCard
          title="Average Points"
          value={schoolAnalytics.averagePoints.toString()}
          change="+45 this month"
          icon={Trophy}
        />
        <StatCard
          title="Total Badges"
          value={schoolAnalytics.totalBadgesEarned.toString()}
          change="+89 this month"
          icon={Trophy}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Attendance */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Weekly Attendance
            </CardTitle>
            <CardDescription>
              Daily lunch attendance rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schoolAnalytics.weeklyAttendance.map((day) => (
                <div key={day.day} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{day.day}</span>
                    <span className="text-muted-foreground">{day.rate}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full gradient-primary transition-all duration-500"
                      style={{ width: `${day.rate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Class Comparison */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Class Performance
            </CardTitle>
            <CardDescription>
              Attendance and points by class
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schoolAnalytics.classComparison.map((classData) => (
                <div key={classData.class} className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Class {classData.class}</span>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{classData.attendance}% attendance</Badge>
                      <Badge variant="outline">{classData.avgPoints} avg points</Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-2 bg-background rounded-full overflow-hidden">
                      <div 
                        className="h-full gradient-primary"
                        style={{ width: `${classData.attendance}%` }}
                      />
                    </div>
                    <div className="h-2 bg-background rounded-full overflow-hidden">
                      <div 
                        className="h-full gradient-gamification"
                        style={{ width: `${(classData.avgPoints / 500) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Management */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Recent Students
            </CardTitle>
            <CardDescription>
              Quick access to student profiles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dummyStudents.slice(0, 4).map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">Grade {student.grade}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{student.points} pts</p>
                    <p className="text-xs text-muted-foreground">{student.currentStreak} day streak</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Teacher Management */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Teachers
            </CardTitle>
            <CardDescription>
              Manage teaching staff
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dummyTeachers.map((teacher) => (
                <div key={teacher.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-sm font-bold">
                      {teacher.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{teacher.name}</p>
                      <p className="text-sm text-muted-foreground">{teacher.email}</p>
                    </div>
                  </div>
                  <Badge variant="outline">Class {teacher.className}</Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Teacher
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};