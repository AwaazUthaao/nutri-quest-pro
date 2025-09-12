import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  QrCode,
  Trophy,
  TrendingUp,
  Apple,
  Calendar,
  Award
} from 'lucide-react';
import { dummyStudents } from '@/lib/dummyData';

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

export const TeacherDashboard: React.FC = () => {
  const classStudents = dummyStudents.filter(student => student.classId === 'class-5a');
  const avgAttendance = Math.round(classStudents.reduce((acc, student) => 
    acc + (student.lunchAttendance.filter(a => a.status === 'completed').length / student.lunchAttendance.length), 0
  ) / classStudents.length * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Manage your class lunch attendance and track student progress</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <QrCode className="mr-2 h-4 w-4" />
            Scan QR Code
          </Button>
          <Button className="gradient-primary">
            <Calendar className="mr-2 h-4 w-4" />
            Mark Attendance
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Class Size"
          value={classStudents.length.toString()}
          change="No changes"
          icon={Users}
        />
        <StatCard
          title="Avg Attendance"
          value={`${avgAttendance}%`}
          change="+5% this week"
          icon={Apple}
        />
        <StatCard
          title="Total Points"
          value={classStudents.reduce((acc, s) => acc + s.points, 0).toString()}
          change="+150 this week"
          icon={Trophy}
        />
        <StatCard
          title="Active Streaks"
          value={classStudents.filter(s => s.currentStreak > 0).length.toString()}
          change="+2 this week"
          icon={Award}
        />
      </div>

      {/* Student Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Attendance */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Apple className="h-5 w-5 text-primary" />
              Today's Lunch Attendance
            </CardTitle>
            <CardDescription>
              Mark attendance for your students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {classStudents.map((student) => {
                const todayAttendance = student.lunchAttendance.find(a => a.date === '2025-09-12');
                const status = todayAttendance?.status || 'not_marked';
                
                return (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.currentStreak} day streak</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={status === 'completed' ? 'default' : status === 'partial' ? 'secondary' : 'outline'}
                        className={status === 'completed' ? 'gradient-success text-white' : ''}
                      >
                        {status === 'completed' ? 'Present' : status === 'partial' ? 'Partial' : 'Not Marked'}
                      </Badge>
                      {status === 'not_marked' && (
                        <Button size="sm" variant="outline">
                          Mark
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Student Leaderboard */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-gamification" />
              Class Leaderboard
            </CardTitle>
            <CardDescription>
              Top performers in your class
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {classStudents
                .sort((a, b) => b.points - a.points)
                .map((student, index) => (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`
                        rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold text-white
                        ${index === 0 ? 'gradient-gamification' : 
                          index === 1 ? 'bg-muted-foreground' : 
                          'bg-secondary'}
                      `}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <div className="flex gap-1">
                          {student.badges.slice(0, 2).map((badge, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {badge.replace('-', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gamification">{student.points}</p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* QR Code Scanner */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-primary" />
            QR Code Attendance
          </CardTitle>
          <CardDescription>
            Quick attendance marking via QR code scanning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-8">
            <div className="w-48 h-48 mx-auto bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center">
                <QrCode className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Click to activate QR scanner</p>
                <Button className="gradient-primary">
                  Start Scanning
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Students can scan their lunch trays to automatically mark attendance
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};