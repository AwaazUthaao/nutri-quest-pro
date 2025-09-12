import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trophy,
  Apple,
  TrendingUp,
  UserPlus
} from 'lucide-react';
import { dummyStudents } from '@/lib/dummyData';

export const SchoolStudents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');

  const filteredStudents = dummyStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || student.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const totalStudents = dummyStudents.length;
  const averagePoints = Math.round(dummyStudents.reduce((acc, s) => acc + s.points, 0) / totalStudents);
  const activeStreaks = dummyStudents.filter(s => s.currentStreak > 0).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Students Management</h1>
          <p className="text-muted-foreground">Manage student profiles and track their progress</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button className="gradient-primary">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold text-primary">{totalStudents}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Points</p>
                <p className="text-2xl font-bold text-primary">{averagePoints}</p>
              </div>
              <Trophy className="h-8 w-8 text-gamification" />
            </div>
          </CardContent>
        </Card>
        <Card className="card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Streaks</p>
                <p className="text-2xl font-bold text-primary">{activeStreaks}</p>
              </div>
              <Apple className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold text-primary">87%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Directory */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Student Directory</CardTitle>
          <CardDescription>
            View and manage all enrolled students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="all">All Grades</option>
              <option value="5A">Grade 5A</option>
              <option value="5B">Grade 5B</option>
              <option value="6A">Grade 6A</option>
              <option value="6B">Grade 6B</option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <Card key={student.id} className="border border-border hover:card-shadow transition-smooth">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-lg font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">Grade {student.grade}</Badge>
                          {student.allergies.length > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {student.allergies.length} allergies
                            </Badge>
                          )}
                          {student.dietaryRestrictions.length > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {student.dietaryRestrictions[0]}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gamification">{student.points}</p>
                        <p className="text-xs text-muted-foreground">Points</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-success">{student.currentStreak}</p>
                        <p className="text-xs text-muted-foreground">Streak</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{student.badges.length}</p>
                        <p className="text-xs text-muted-foreground">Badges</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-3 w-3" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-3 w-3" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Recent Activity */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Last Attendance</p>
                        <p className="font-medium">
                          {student.lunchAttendance[student.lunchAttendance.length - 1]?.date || 'No data'}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Profile Status</p>
                        <Badge variant={student.profileCompleted ? "default" : "secondary"}>
                          {student.profileCompleted ? 'Complete' : 'Incomplete'}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Recent Badges</p>
                        <div className="flex gap-1 mt-1">
                          {student.badges.slice(0, 3).map((badge, index) => (
                            <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                              {badge.split('-')[0]}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No students found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or add new students
              </p>
              <Button className="gradient-primary">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};