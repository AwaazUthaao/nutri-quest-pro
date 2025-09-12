import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  School, 
  Users, 
  TrendingUp, 
  MapPin,
  Plus,
  Search,
  Eye,
  Edit,
  MoreVertical
} from 'lucide-react';
import { adminAnalytics } from '@/lib/dummyData';

const schoolsData = [
  {
    id: 'school-1',
    name: 'Greenwood Elementary',
    principal: 'Dr. Sarah Mitchell',
    email: 'principal@greenwood.edu',
    location: 'Oak Street, Downtown',
    students: 245,
    teachers: 18,
    attendanceRate: 87.3,
    status: 'active',
    joinDate: '2024-01-15'
  },
  {
    id: 'school-2',
    name: 'Oakfield Primary',
    principal: 'Mr. James Wilson',
    email: 'admin@oakfield.edu',
    location: 'Pine Avenue, Suburbs',
    students: 198,
    teachers: 14,
    attendanceRate: 84.2,
    status: 'active',
    joinDate: '2024-02-20'
  },
  {
    id: 'school-3',
    name: 'Maple Grove School',
    principal: 'Ms. Lisa Chen',
    email: 'office@maplegrove.edu',
    location: 'Maple Road, Westside',
    students: 312,
    teachers: 22,
    attendanceRate: 89.1,
    status: 'active',
    joinDate: '2023-09-10'
  },
  {
    id: 'school-4',
    name: 'Sunset Elementary',
    principal: 'Dr. Michael Brown',
    email: 'contact@sunset.edu',
    location: 'Sunset Boulevard, East',
    students: 267,
    teachers: 19,
    attendanceRate: 78.5,
    status: 'pending',
    joinDate: '2024-08-01'
  }
];

export const AdminSchools: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredSchools = schoolsData.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.principal.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || school.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Schools Management</h1>
          <p className="text-muted-foreground">Manage and monitor all participating schools</p>
        </div>
        <Button className="gradient-primary">
          <Plus className="mr-2 h-4 w-4" />
          Add School
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Schools</p>
                <p className="text-2xl font-bold text-primary">{adminAnalytics.totalSchools}</p>
              </div>
              <School className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold text-primary">{adminAnalytics.totalStudents.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Attendance</p>
                <p className="text-2xl font-bold text-primary">{adminAnalytics.overallAttendanceRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Schools</p>
                <p className="text-2xl font-bold text-primary">{schoolsData.filter(s => s.status === 'active').length}</p>
              </div>
              <School className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>School Directory</CardTitle>
          <CardDescription>
            Search and filter through all participating schools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search schools, principals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Schools Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSchools.map((school) => (
              <Card key={school.id} className="border border-border hover:card-shadow-medium transition-smooth">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="gradient-primary p-2 rounded-lg">
                        <School className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{school.name}</h3>
                        <p className="text-sm text-muted-foreground">{school.principal}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={school.status === 'active' ? 'default' : 'secondary'}
                        className={school.status === 'active' ? 'gradient-success text-white' : ''}
                      >
                        {school.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{school.location}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 p-3 bg-muted rounded-lg">
                      <div className="text-center">
                        <p className="text-lg font-bold text-primary">{school.students}</p>
                        <p className="text-xs text-muted-foreground">Students</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-primary">{school.teachers}</p>
                        <p className="text-xs text-muted-foreground">Teachers</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-success">{school.attendanceRate}%</p>
                        <p className="text-xs text-muted-foreground">Attendance</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-muted-foreground">
                        Joined: {new Date(school.joinDate).toLocaleDateString()}
                      </span>
                      <div className="flex gap-2">
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
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSchools.length === 0 && (
            <div className="text-center py-8">
              <School className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No schools found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add New School
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};