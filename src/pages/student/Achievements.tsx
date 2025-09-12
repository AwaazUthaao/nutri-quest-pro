import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Star,
  Target,
  Flame,
  Award,
  Crown,
  Zap,
  Calendar
} from 'lucide-react';
import { dummyStudents, dummyBadges } from '@/lib/dummyData';
import { BadgeDisplay } from '@/components/gamification/BadgeDisplay';
import { StreakCounter } from '@/components/gamification/StreakCounter';

const leaderboardData = [
  { name: 'Alex Rodriguez', points: 520, position: 1 },
  { name: 'John Doe', points: 450, position: 2 },
  { name: 'Emma Wilson', points: 380, position: 3 },
  { name: 'Sarah Kim', points: 340, position: 4 },
  { name: 'Mike Johnson', points: 310, position: 5 }
];

const milestones = [
  { 
    id: 1, 
    title: 'First Week Champion', 
    description: 'Complete 7 consecutive lunch days', 
    target: 7, 
    current: 7, 
    completed: true,
    icon: Crown,
    reward: '50 points + Special Badge'
  },
  { 
    id: 2, 
    title: 'Nutrition Explorer', 
    description: 'Try 10 different lunch plans', 
    target: 10, 
    current: 6, 
    completed: false,
    icon: Star,
    reward: '75 points + Explorer Badge'
  },
  { 
    id: 3, 
    title: 'Learning Master', 
    description: 'Complete 15 educational contents', 
    target: 15, 
    current: 3, 
    completed: false,
    icon: Award,
    reward: '100 points + Master Badge'
  },
  { 
    id: 4, 
    title: 'Streak Legend', 
    description: 'Achieve 30-day eating streak', 
    target: 30, 
    current: 12, 
    completed: false,
    icon: Flame,
    reward: '200 points + Legend Badge'
  }
];

export const StudentAchievements: React.FC = () => {
  const [activeTab, setActiveTab] = useState('badges');
  const student = dummyStudents[0]; // John Doe
  
  const completedMilestones = milestones.filter(m => m.completed).length;
  const totalMilestones = milestones.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">My Achievements</h1>
          <p className="text-muted-foreground">Track your progress and celebrate your successes</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-gamification">{student.points}</p>
          <p className="text-muted-foreground">Total Points</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-shadow gradient-gamification text-white">
          <CardContent className="p-6 text-center">
            <Trophy className="h-8 w-8 mx-auto mb-2" />
            <p className="text-2xl font-bold">{student.badges.length}</p>
            <p className="text-white/80">Badges Earned</p>
          </CardContent>
        </Card>
        <Card className="card-shadow gradient-success text-white">
          <CardContent className="p-6 text-center">
            <Flame className="h-8 w-8 mx-auto mb-2" />
            <p className="text-2xl font-bold">{student.currentStreak}</p>
            <p className="text-white/80">Current Streak</p>
          </CardContent>
        </Card>
        <Card className="card-shadow gradient-primary text-white">
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 mx-auto mb-2" />
            <p className="text-2xl font-bold">{completedMilestones}/{totalMilestones}</p>
            <p className="text-white/80">Milestones</p>
          </CardContent>
        </Card>
        <Card className="card-shadow gradient-secondary text-secondary-foreground">
          <CardContent className="p-6 text-center">
            <Crown className="h-8 w-8 mx-auto mb-2" />
            <p className="text-2xl font-bold">#2</p>
            <p className="opacity-80">Class Rank</p>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <Card className="card-shadow">
        <CardHeader>
          <div className="flex space-x-4">
            {[
              { id: 'badges', label: 'My Badges', icon: Trophy },
              { id: 'milestones', label: 'Milestones', icon: Target },
              { id: 'leaderboard', label: 'Leaderboard', icon: Crown },
              { id: 'streak', label: 'Streak Tracker', icon: Flame }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  className={activeTab === tab.id ? "gradient-primary" : ""}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </CardHeader>
        <CardContent>
          {/* Badges Tab */}
          {activeTab === 'badges' && (
            <BadgeDisplay userBadges={student.badges} showAll />
          )}

          {/* Milestones Tab */}
          {activeTab === 'milestones' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">Achievement Milestones</h3>
                <p className="text-muted-foreground">Complete challenges to unlock special rewards</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {milestones.map((milestone) => {
                  const Icon = milestone.icon;
                  const progress = (milestone.current / milestone.target) * 100;
                  
                  return (
                    <Card 
                      key={milestone.id} 
                      className={`
                        border-2 transition-smooth
                        ${milestone.completed 
                          ? 'border-success bg-success/5' 
                          : 'border-border hover:border-primary'
                        }
                      `}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`
                              p-3 rounded-full
                              ${milestone.completed 
                                ? 'gradient-success text-white' 
                                : 'gradient-primary text-white'
                              }
                            `}>
                              <Icon className="h-6 w-6" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{milestone.title}</h4>
                              <p className="text-sm text-muted-foreground">{milestone.description}</p>
                            </div>
                          </div>
                          {milestone.completed && (
                            <Badge className="gradient-success text-white">
                              <Trophy className="mr-1 h-3 w-3" />
                              Complete
                            </Badge>
                          )}
                        </div>
                        
                        <div className="space-y-3">
                          <Progress value={Math.min(progress, 100)} className="h-2" />
                          <div className="flex justify-between text-sm">
                            <span>{milestone.current} / {milestone.target}</span>
                            <span className="text-muted-foreground">
                              {Math.round(progress)}% complete
                            </span>
                          </div>
                          <div className="text-sm font-medium text-primary">
                            🎁 Reward: {milestone.reward}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Leaderboard Tab */}
          {activeTab === 'leaderboard' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">Class Leaderboard</h3>
                <p className="text-muted-foreground">See how you rank against your classmates</p>
              </div>
              
              <div className="space-y-3">
                {leaderboardData.map((player, index) => (
                  <Card 
                    key={player.name}
                    className={`
                      border transition-smooth
                      ${player.name === 'John Doe' 
                        ? 'border-primary bg-primary/5 card-glow' 
                        : 'border-border hover:card-shadow'
                      }
                    `}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`
                            w-12 h-12 rounded-full flex items-center justify-center font-bold text-white
                            ${index === 0 ? 'gradient-gamification' : 
                              index === 1 ? 'bg-slate-400' : 
                              index === 2 ? 'bg-amber-600' : 
                              'bg-muted-foreground'}
                          `}>
                            {index < 3 ? <Crown className="h-6 w-6" /> : player.position}
                          </div>
                          <div>
                            <p className="font-semibold flex items-center gap-2">
                              {player.name}
                              {player.name === 'John Doe' && (
                                <Badge variant="secondary">You</Badge>
                              )}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Rank #{player.position}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gamification">{player.points}</p>
                          <p className="text-sm text-muted-foreground">points</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Streak Tracker Tab */}
          {activeTab === 'streak' && (
            <div className="space-y-6">
              <StreakCounter 
                currentStreak={student.currentStreak}
                longestStreak={student.longestStreak}
              />
              
              {/* Weekly Calendar */}
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    This Week's Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                      const completed = index < 3; // First 3 days completed for demo
                      return (
                        <div key={day} className="text-center">
                          <p className="text-xs text-muted-foreground mb-2">{day}</p>
                          <div className={`
                            w-12 h-12 rounded-full flex items-center justify-center transition-smooth
                            ${completed 
                              ? 'gradient-success text-white' 
                              : index === 3
                                ? 'border-2 border-primary bg-primary/10'
                                : 'bg-muted text-muted-foreground'
                            }
                          `}>
                            {completed ? (
                              <Zap className="h-5 w-5" />
                            ) : index === 3 ? (
                              <Target className="h-5 w-5 text-primary" />
                            ) : (
                              index + 1
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};