import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { updateUserProfile } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  User, 
  Heart, 
  Apple, 
  Activity, 
  Users, 
  Trophy,
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ProfileData {
  age: number;
  gender: string;
  height: number;
  weight: number;
  allergies: string[];
  chronicConditions: string[];
  dietaryRestrictions: string[];
  activityLevel: string;
  exerciseFrequency: string;
  parentConsent: boolean;
  parentContact: string;
}

const steps = [
  { id: 1, title: 'Personal Info', icon: User },
  { id: 2, title: 'Health Info', icon: Heart },
  { id: 3, title: 'Nutrition Preferences', icon: Apple },
  { id: 4, title: 'Activity Level', icon: Activity },
  { id: 5, title: 'Parent Consent', icon: Users },
];

const commonAllergies = ['Nuts', 'Dairy', 'Eggs', 'Shellfish', 'Wheat', 'Soy', 'Fish'];
const commonDietaryRestrictions = ['Vegetarian', 'Vegan', 'Halal', 'Kosher', 'Low Sodium', 'Gluten-Free'];

export const FirstLoginFlow: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<ProfileData>({
    age: 0,
    gender: '',
    height: 0,
    weight: 0,
    allergies: [],
    chronicConditions: [],
    dietaryRestrictions: [],
    activityLevel: '',
    exerciseFrequency: '',
    parentConsent: false,
    parentContact: '',
  });

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    if (user) {
      // Update user profile
      updateUserProfile(user.id, {
        isFirstLogin: false,
        profileCompleted: true,
      });
      
      updateUser({
        isFirstLogin: false,
        profileCompleted: true,
      });

      // Show success toast with gamification
      toast({
        title: "🎉 Profile Complete!",
        description: "You've earned 50 points and your first badge!",
      });
    }
  };

  const toggleArrayItem = (array: string[], item: string, setter: (value: string[]) => void) => {
    if (array.includes(item)) {
      setter(array.filter(i => i !== item));
    } else {
      setter([...array, item]);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={profileData.age || ''}
                  onChange={(e) => setProfileData({...profileData, age: parseInt(e.target.value)})}
                  placeholder="Enter your age"
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <select
                  className="w-full p-2 border border-input rounded-md bg-background"
                  value={profileData.gender}
                  onChange={(e) => setProfileData({...profileData, gender: e.target.value})}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={profileData.height || ''}
                  onChange={(e) => setProfileData({...profileData, height: parseInt(e.target.value)})}
                  placeholder="Height in cm"
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={profileData.weight || ''}
                  onChange={(e) => setProfileData({...profileData, weight: parseInt(e.target.value)})}
                  placeholder="Weight in kg"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Food Allergies</Label>
              <p className="text-sm text-muted-foreground mb-3">Select any food allergies you have</p>
              <div className="flex flex-wrap gap-2">
                {commonAllergies.map((allergy) => (
                  <Badge
                    key={allergy}
                    variant={profileData.allergies.includes(allergy) ? "default" : "outline"}
                    className="cursor-pointer transition-smooth"
                    onClick={() => toggleArrayItem(
                      profileData.allergies, 
                      allergy, 
                      (newAllergies) => setProfileData({...profileData, allergies: newAllergies})
                    )}
                  >
                    {allergy}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="chronic">Chronic Conditions (Optional)</Label>
              <Input
                id="chronic"
                value={profileData.chronicConditions.join(', ')}
                onChange={(e) => setProfileData({
                  ...profileData, 
                  chronicConditions: e.target.value.split(', ').filter(c => c.trim())
                })}
                placeholder="Enter any chronic conditions (comma separated)"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Dietary Restrictions</Label>
              <p className="text-sm text-muted-foreground mb-3">Select your dietary preferences</p>
              <div className="flex flex-wrap gap-2">
                {commonDietaryRestrictions.map((restriction) => (
                  <Badge
                    key={restriction}
                    variant={profileData.dietaryRestrictions.includes(restriction) ? "default" : "outline"}
                    className="cursor-pointer transition-smooth"
                    onClick={() => toggleArrayItem(
                      profileData.dietaryRestrictions, 
                      restriction, 
                      (newRestrictions) => setProfileData({...profileData, dietaryRestrictions: newRestrictions})
                    )}
                  >
                    {restriction}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Daily Activity Level</Label>
              <div className="space-y-2 mt-3">
                {['Low (mostly sitting)', 'Moderate (some walking)', 'Active (regular movement)', 'Very Active (lots of sports)'].map((level) => (
                  <div key={level} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={level}
                      name="activity"
                      checked={profileData.activityLevel === level}
                      onChange={() => setProfileData({...profileData, activityLevel: level})}
                      className="text-primary"
                    />
                    <Label htmlFor={level}>{level}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-base font-medium">Exercise Frequency</Label>
              <div className="space-y-2 mt-3">
                {['Never', '1-2 times per week', '3-4 times per week', '5+ times per week'].map((freq) => (
                  <div key={freq} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={freq}
                      name="exercise"
                      checked={profileData.exerciseFrequency === freq}
                      onChange={() => setProfileData({...profileData, exerciseFrequency: freq})}
                      className="text-primary"
                    />
                    <Label htmlFor={freq}>{freq}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="parentContact">Parent/Guardian Contact</Label>
              <Input
                id="parentContact"
                type="email"
                value={profileData.parentContact}
                onChange={(e) => setProfileData({...profileData, parentContact: e.target.value})}
                placeholder="parent@email.com"
              />
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox
                id="consent"
                checked={profileData.parentConsent}
                onCheckedChange={(checked) => setProfileData({...profileData, parentConsent: checked as boolean})}
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="consent" className="text-sm">
                  Parental Consent
                </Label>
                <p className="text-xs text-muted-foreground">
                  I give consent for my child to participate in the nutrition program and data collection.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl card-shadow-medium">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
            <Trophy className="h-6 w-6" />
            Complete Your Profile
          </CardTitle>
          <CardDescription>
            Set up your nutrition profile to get started! You'll earn 50 points and your first badge.
          </CardDescription>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              Step {currentStep} of {steps.length}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Steps Navigation */}
          <div className="flex justify-between">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`
                    rounded-full p-2 transition-smooth
                    ${isActive ? 'bg-primary text-white' : 
                      isCompleted ? 'bg-success text-white' : 
                      'bg-muted text-muted-foreground'}
                  `}>
                    {isCompleted ? <CheckCircle className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                  </div>
                  <span className="text-xs mt-1 text-center">{step.title}</span>
                </div>
              );
            })}
          </div>

          {/* Step Content */}
          <div className="min-h-[300px]">
            <h3 className="text-lg font-semibold mb-4">
              {steps[currentStep - 1]?.title}
            </h3>
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              className="gradient-primary"
              disabled={currentStep === 5 && !profileData.parentConsent}
            >
              {currentStep === steps.length ? (
                <>
                  Complete Profile
                  <Trophy className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};