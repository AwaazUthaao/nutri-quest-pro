import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  Video, 
  Brain,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Users,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { dummyAwarenessContent } from '@/lib/dummyData';

const extendedContent = [
  ...dummyAwarenessContent,
  {
    id: 'content-4',
    title: 'Understanding Food Groups',
    type: 'article' as const,
    description: 'Learn about the five main food groups and their benefits',
    content: 'Comprehensive guide to understanding different food groups...',
    points: 20,
    completedBy: ['student-1', 'student-2'],
    createdBy: 'admin-1',
    createdAt: '2025-09-05'
  },
  {
    id: 'content-5',
    title: 'Healthy Cooking Basics',
    type: 'video' as const,
    description: 'Step-by-step cooking techniques for nutritious meals',
    content: 'Interactive video series on cooking healthy meals...',
    points: 30,
    completedBy: ['student-3'],
    createdBy: 'admin-1',
    createdAt: '2025-09-07'
  },
  {
    id: 'content-6',
    title: 'Portion Control Quiz',
    type: 'quiz' as const,
    description: 'Test your knowledge about proper portion sizes',
    content: '15-question quiz about healthy portion control...',
    points: 25,
    completedBy: [],
    createdBy: 'admin-1',
    createdAt: '2025-09-10'
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'article': return BookOpen;
    case 'video': return Video;
    case 'quiz': return Brain;
    default: return BookOpen;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'article': return 'bg-blue-100 text-blue-800';
    case 'video': return 'bg-purple-100 text-purple-800';
    case 'quiz': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const AdminContent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const filteredContent = extendedContent.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || content.type === selectedType;
    return matchesSearch && matchesType;
  });

  const totalEngagement = extendedContent.reduce((acc, content) => acc + content.completedBy.length, 0);
  const avgCompletionRate = Math.round(totalEngagement / (extendedContent.length * 3) * 100); // Assuming 3 students for demo

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Content Management</h1>
          <p className="text-muted-foreground">Create and manage educational content for students</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <TrendingUp className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button className="gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            Create Content
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Content</p>
                <p className="text-2xl font-bold text-primary">{extendedContent.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold text-primary">{totalEngagement}</p>
              </div>
              <Eye className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold text-primary">{avgCompletionRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                <p className="text-2xl font-bold text-primary">3</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 border-dashed border-primary/50 hover:border-primary transition-smooth cursor-pointer">
          <CardContent className="p-6 text-center">
            <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Create Article</h3>
            <p className="text-muted-foreground mb-4">Write educational content about nutrition topics</p>
            <Button className="gradient-primary">
              <Plus className="mr-2 h-4 w-4" />
              New Article
            </Button>
          </CardContent>
        </Card>
        <Card className="border-2 border-dashed border-purple-300 hover:border-purple-500 transition-smooth cursor-pointer">
          <CardContent className="p-6 text-center">
            <Video className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Add Video</h3>
            <p className="text-muted-foreground mb-4">Upload or embed educational videos</p>
            <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
              <Plus className="mr-2 h-4 w-4" />
              New Video
            </Button>
          </CardContent>
        </Card>
        <Card className="border-2 border-dashed border-green-300 hover:border-green-500 transition-smooth cursor-pointer">
          <CardContent className="p-6 text-center">
            <Brain className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Create Quiz</h3>
            <p className="text-muted-foreground mb-4">Build interactive quizzes and assessments</p>
            <Button variant="outline" className="border-green-300 text-green-600 hover:bg-green-50">
              <Plus className="mr-2 h-4 w-4" />
              New Quiz
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Content Library */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Content Library</CardTitle>
          <CardDescription>
            Manage your educational content and track engagement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="all">All Types</option>
              <option value="article">Articles</option>
              <option value="video">Videos</option>
              <option value="quiz">Quizzes</option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredContent.map((content) => {
              const IconComponent = getTypeIcon(content.type);
              return (
                <Card key={content.id} className="border border-border hover:card-shadow transition-smooth">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="gradient-primary p-2 rounded-lg">
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-semibold">{content.title}</h3>
                            <Badge className={getTypeColor(content.type)}>
                              {content.type}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{content.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{content.completedBy.length} completions</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(content.createdAt).toLocaleDateString()}</span>
                            </div>
                            <Badge variant="outline">
                              +{content.points} points
                            </Badge>
                          </div>
                        </div>
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
                        <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredContent.length === 0 && (
            <div className="text-center py-8">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No content found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or create new content
              </p>
              <Button className="gradient-primary">
                <Plus className="mr-2 h-4 w-4" />
                Create Content
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};