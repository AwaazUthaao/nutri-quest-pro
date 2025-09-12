import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Flame, Calendar, Trophy } from 'lucide-react';

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
  className?: string;
}

export const StreakCounter: React.FC<StreakCounterProps> = ({ 
  currentStreak, 
  longestStreak, 
  className = "" 
}) => {
  const nextMilestone = currentStreak < 7 ? 7 : currentStreak < 14 ? 14 : currentStreak < 30 ? 30 : currentStreak + 10;
  const progressToNext = (currentStreak / nextMilestone) * 100;

  return (
    <Card className={`card-shadow ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Flame className="h-5 w-5 text-orange-500" />
          Lunch Streak
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Streak Display */}
        <div className="text-center">
          <div className="relative">
            <div className="gradient-gamification rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3 animate-float">
              <span className="text-2xl font-bold text-white">{currentStreak}</span>
            </div>
            <div className="absolute -top-1 -right-1">
              <Flame className="h-6 w-6 text-orange-500 animate-pulse" />
            </div>
          </div>
          <p className="text-sm font-medium">
            {currentStreak === 0 ? 'Start your streak!' : 
             currentStreak === 1 ? 'Great start!' :
             currentStreak < 7 ? 'Building momentum!' :
             currentStreak < 14 ? 'Awesome streak!' :
             'Incredible dedication!'}
          </p>
        </div>

        {/* Progress to Next Milestone */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Next milestone</span>
            <span className="font-medium">{nextMilestone} days</span>
          </div>
          <Progress value={Math.min(progressToNext, 100)} className="h-2" />
          <p className="text-xs text-muted-foreground text-center">
            {nextMilestone - currentStreak} days to go!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Current</span>
            </div>
            <p className="text-lg font-bold text-primary">{currentStreak}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Trophy className="h-4 w-4 text-gamification" />
              <span className="text-sm font-medium">Best</span>
            </div>
            <p className="text-lg font-bold text-gamification">{longestStreak}</p>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            {currentStreak === 0 ? '🍎 Start your healthy eating journey today!' :
             currentStreak < longestStreak ? '🔥 You can beat your record!' :
             currentStreak === longestStreak && currentStreak > 0 ? '🏆 New personal best!' :
             '⭐ You are a nutrition champion!'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};