import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Star, Flame, Target, Award } from 'lucide-react';
import { dummyBadges } from '@/lib/dummyData';

interface BadgeDisplayProps {
  userBadges: string[];
  showAll?: boolean;
  className?: string;
}

const getBadgeIcon = (category: string) => {
  switch (category) {
    case 'streak': return Flame;
    case 'achievement': return Trophy;
    case 'milestone': return Star;
    default: return Award;
  }
};

export const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ 
  userBadges, 
  showAll = false, 
  className = "" 
}) => {
  const earnedBadges = dummyBadges.filter(badge => userBadges.includes(badge.id));
  const availableBadges = dummyBadges.filter(badge => !userBadges.includes(badge.id));
  
  const displayBadges = showAll ? earnedBadges : earnedBadges.slice(0, 6);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Earned Badges */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Trophy className="h-5 w-5 text-gamification" />
            Earned Badges ({earnedBadges.length})
          </h3>
          {!showAll && earnedBadges.length > 6 && (
            <Button variant="outline" size="sm">
              View All
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayBadges.map((badge) => {
            const IconComponent = getBadgeIcon(badge.category);
            return (
              <Card 
                key={badge.id} 
                className="card-shadow transition-smooth hover:card-shadow-medium hover:scale-105 cursor-pointer"
              >
                <CardContent className="p-4 text-center">
                  <div className="gradient-gamification p-3 rounded-full w-fit mx-auto mb-3 animate-badge-glow">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{badge.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
                  <Badge variant="secondary" className="text-xs">
                    {badge.category}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Next Badge to Earn */}
      {availableBadges.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-primary" />
            Next Goal
          </h3>
          
          <Card className="card-shadow border-2 border-dashed border-primary/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="gradient-primary p-3 rounded-full opacity-50">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{availableBadges[0].name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{availableBadges[0].description}</p>
                  <Badge variant="outline" className="text-xs">
                    {availableBadges[0].requirement}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};