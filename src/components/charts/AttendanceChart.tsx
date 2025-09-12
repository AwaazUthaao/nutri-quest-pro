import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface AttendanceData {
  day: string;
  rate: number;
}

interface AttendanceChartProps {
  data: AttendanceData[];
  title?: string;
  description?: string;
  className?: string;
}

export const AttendanceChart: React.FC<AttendanceChartProps> = ({
  data,
  title = "Attendance Overview",
  description = "Daily attendance rates",
  className = ""
}) => {
  const maxRate = Math.max(...data.map(d => d.rate));
  const avgRate = Math.round(data.reduce((acc, d) => acc + d.rate, 0) / data.length);
  const trend = data.length > 1 ? data[data.length - 1].rate - data[0].rate : 0;

  return (
    <Card className={`card-shadow ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          <div className="flex items-center gap-2 text-sm">
            {trend >= 0 ? (
              <TrendingUp className="h-4 w-4 text-success" />
            ) : (
              <TrendingDown className="h-4 w-4 text-destructive" />
            )}
            <span className={trend >= 0 ? 'text-success' : 'text-destructive'}>
              {trend >= 0 ? '+' : ''}{trend.toFixed(1)}%
            </span>
          </div>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Average Rate */}
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-2xl font-bold text-primary">{avgRate}%</p>
            <p className="text-sm text-muted-foreground">Average Rate</p>
          </div>

          {/* Bar Chart */}
          <div className="space-y-3">
            {data.map((item, index) => (
              <div key={item.day} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.day}</span>
                  <span className="text-muted-foreground">{item.rate}%</span>
                </div>
                <div className="relative">
                  {/* Background bar */}
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    {/* Progress bar with animation */}
                    <div 
                      className="h-full gradient-primary transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${item.rate}%`,
                        animationDelay: `${index * 100}ms`
                      }}
                    />
                  </div>
                  {/* Highlight if this is the best day */}
                  {item.rate === maxRate && (
                    <div className="absolute -top-1 -right-1">
                      <div className="w-2 h-2 bg-gamification rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t border-border">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};