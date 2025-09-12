import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Trophy,
  School,
  BookOpen,
  Plus,
  Eye
} from 'lucide-react';
import { adminAnalytics } from '@/lib/dummyData';

const StatCard = ({ title, value, change, icon: Icon, trend }: {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  trend: 'up' | 'down';
}) => (
  <Card className="card-shadow transition-smooth hover:card-shadow-medium">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-primary">{value}</p>
          <p className={`text-xs flex items-center mt-1 ${
            trend === 'up' ? 'text-success' : 'text-warning'
          }`}>
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

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor nutrition program performance across all schools</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            View Reports
          </Button>
          <Button className="gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add Content
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Schools"
          value={adminAnalytics.totalSchools.toString()}
          change="+2 this month"
          icon={School}
          trend="up"
        />
        <StatCard
          title="Total Students"
          value={adminAnalytics.totalStudents.toLocaleString()}
          change="+156 this month"
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Attendance Rate"
          value={`${adminAnalytics.overallAttendanceRate}%`}
          change="+3.2% vs last month"
          icon={BarChart3}
          trend="up"
        />
        <StatCard
          title="Content Engagement"
          value={`${adminAnalytics.contentEngagement}%`}
          change="+1.8% vs last month"
          icon={BookOpen}
          trend="up"
        />
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* School Performance */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-gamification" />
              Top Performing Schools
            </CardTitle>
            <CardDescription>
              Schools ranked by lunch attendance rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {adminAnalytics.schoolPerformance.map((school, index) => (
                <div key={school.school} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="gradient-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{school.school}</p>
                      <p className="text-sm text-muted-foreground">{school.students} students</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="gradient-success text-white">
                    {school.attendance}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Monthly Trends
            </CardTitle>
            <CardDescription>
              Attendance and engagement over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {adminAnalytics.monthlyTrends.map((month) => (
                <div key={month.month} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{month.month}</span>
                    <span className="text-muted-foreground">
                      Attendance: {month.attendance}% | Engagement: {month.engagement}%
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full gradient-primary"
                        style={{ width: `${month.attendance}%` }}
                      />
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full gradient-secondary"
                        style={{ width: `${month.engagement}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Awareness Content Management
          </CardTitle>
          <CardDescription>
            Create and manage educational content for students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-2 border-dashed border-border hover:border-primary transition-smooth cursor-pointer">
              <CardContent className="p-6 text-center">
                <Plus className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="font-medium">Create Article</p>
                <p className="text-sm text-muted-foreground">Write educational content</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-dashed border-border hover:border-primary transition-smooth cursor-pointer">
              <CardContent className="p-6 text-center">
                <Plus className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="font-medium">Add Video</p>
                <p className="text-sm text-muted-foreground">Upload video content</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-dashed border-border hover:border-primary transition-smooth cursor-pointer">
              <CardContent className="p-6 text-center">
                <Plus className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="font-medium">Create Quiz</p>
                <p className="text-sm text-muted-foreground">Build interactive quiz</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};