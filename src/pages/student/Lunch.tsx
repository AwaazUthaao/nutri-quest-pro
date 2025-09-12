import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Apple, 
  Calendar,
  CheckCircle,
  Clock,
  Utensils,
  Info,
  Trophy,
  Target,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { dummyLunchPlans, dummyStudents } from '@/lib/dummyData';

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const currentWeekPlans = [
  { ...dummyLunchPlans[0], day: 'Monday', completed: true },
  { ...dummyLunchPlans[1], day: 'Tuesday', completed: true },
  { ...dummyLunchPlans[0], day: 'Wednesday', completed: true, name: 'Mediterranean Lunch' },
  { ...dummyLunchPlans[1], day: 'Thursday', completed: false, name: 'Asian Fusion Bowl' },  
  { ...dummyLunchPlans[0], day: 'Friday', completed: false, name: 'Fresh Garden Salad' }
];

export const StudentLunch: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('Wednesday');
  const student = dummyStudents[0]; // John Doe
  
  const selectedPlan = currentWeekPlans.find(plan => plan.day === selectedDay) || currentWeekPlans[2];
  const completedCount = currentWeekPlans.filter(plan => plan.completed).length;
  const weekProgress = (completedCount / 5) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">My Lunch Plan</h1>
          <p className="text-muted-foreground">Track your daily nutrition and earn points</p>
        </div>
        <Badge className="gradient-success text-white text-lg px-4 py-2">
          <Trophy className="mr-2 h-4 w-4" />
          {student.points} Points
        </Badge>
      </div>

      {/* Weekly Progress */}
      <Card className="card-shadow gradient-primary text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">This Week's Progress</h2>
              <p className="text-white/80">Keep up the great work! 🌟</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{completedCount}/5</p>
              <p className="text-white/80">Days Complete</p>
            </div>
          </div>
          <Progress value={weekProgress} className="h-3 bg-white/20" />
          <div className="flex justify-between mt-4">
            {weekDays.map((day, index) => {
              const dayPlan = currentWeekPlans[index];
              return (
                <div key={day} className="text-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-smooth
                    ${dayPlan.completed ? 'bg-white text-primary' : 'bg-white/20 text-white'}
                  `}>
                    {dayPlan.completed ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                  </div>
                  <p className="text-xs">{day.slice(0, 3)}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Day Selector */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Week Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentWeekPlans.map((plan) => (
              <div
                key={plan.day}
                className={`
                  p-3 rounded-lg border transition-smooth cursor-pointer
                  ${selectedDay === plan.day ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted'}
                `}
                onClick={() => setSelectedDay(plan.day)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{plan.day}</p>
                    <p className="text-sm text-muted-foreground">{plan.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {plan.completed ? (
                      <Badge className="gradient-success text-white">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Done
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        <Clock className="mr-1 h-3 w-3" />
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Selected Day Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="card-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Apple className="h-5 w-5 text-primary" />
                  {selectedDay}'s Lunch Plan
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>
                Nutritionally balanced meal designed for your dietary preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{selectedPlan.name}</h3>
                  <p className="text-muted-foreground">{selectedPlan.description}</p>
                </div>
                <Badge className="gradient-success text-white text-lg px-3 py-1">
                  {selectedPlan.calories} cal
                </Badge>
              </div>

              {/* Nutrition Facts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">{selectedPlan.protein}g</p>
                  <p className="text-sm text-muted-foreground">Protein</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">{selectedPlan.carbs}g</p>
                  <p className="text-sm text-muted-foreground">Carbs</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">{selectedPlan.fat}g</p>
                  <p className="text-sm text-muted-foreground">Fat</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">{selectedPlan.fiber}g</p>
                  <p className="text-sm text-muted-foreground">Fiber</p>
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Utensils className="h-4 w-4" />
                  Ingredients
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPlan.ingredients.map((ingredient, index) => (
                    <Badge key={index} variant="outline" className="capitalize">
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Allergen Information */}
              {selectedPlan.allergens.length > 0 && (
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-800">Allergen Information</p>
                      <p className="text-sm text-yellow-700">
                        Contains: {selectedPlan.allergens.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-4">
                {selectedPlan.completed ? (
                  <div className="flex items-center justify-center gap-2 p-4 bg-success/10 rounded-lg border border-success/20">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="font-medium text-success">Completed! Great job! 🎉</span>
                  </div>
                ) : (
                  <Button className="w-full gradient-primary text-lg py-6">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Mark as Completed (+10 points)
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Daily Goals */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Today's Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border border-border rounded-lg">
                  <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-2">
                    <Apple className="h-6 w-6 text-white" />
                  </div>
                  <p className="font-medium">Complete Lunch</p>
                  <p className="text-sm text-muted-foreground">+10 points</p>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <div className="w-12 h-12 gradient-gamification rounded-full flex items-center justify-center mx-auto mb-2">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <p className="font-medium">Maintain Streak</p>
                  <p className="text-sm text-muted-foreground">+5 bonus points</p>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <div className="w-12 h-12 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-2">
                    <Info className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <p className="font-medium">Learn Something</p>
                  <p className="text-sm text-muted-foreground">Visit Learn tab</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};