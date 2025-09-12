import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon, 
  Shield, 
  Bell,
  Database,
  Mail,
  Globe,
  Save,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    // General Settings
    platformName: 'Integrated Nutrition Platform',
    defaultLanguage: 'english',
    timezone: 'UTC-5',
    
    // Notifications
    emailNotifications: true,
    systemAlerts: true,
    weeklyReports: true,
    
    // Security
    twoFactorAuth: false,
    sessionTimeout: 60,
    passwordPolicy: 'strong',
    
    // Features
    gamificationEnabled: true,
    qrScanningEnabled: true,
    parentPortalEnabled: true,
    
    // Data & Analytics
    dataRetention: 365,
    analyticsEnabled: true,
    exportEnabled: true
  });

  const handleToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleInputChange = (key: string, value: string | number) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Platform Settings</h1>
          <p className="text-muted-foreground">Configure system-wide settings and preferences</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset to Default
          </Button>
          <Button className="gradient-primary">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-primary" />
              General Settings
            </CardTitle>
            <CardDescription>
              Basic platform configuration and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platformName">Platform Name</Label>
              <Input
                id="platformName"
                value={settings.platformName}
                onChange={(e) => handleInputChange('platformName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Default Language</Label>
              <select
                id="language"
                value={settings.defaultLanguage}
                onChange={(e) => handleInputChange('defaultLanguage', e.target.value)}
                className="w-full p-2 border border-input rounded-md bg-background"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <select
                id="timezone"
                value={settings.timezone}
                onChange={(e) => handleInputChange('timezone', e.target.value)}
                className="w-full p-2 border border-input rounded-md bg-background"
              >
                <option value="UTC-5">UTC-5 (Eastern)</option>
                <option value="UTC-6">UTC-6 (Central)</option>
                <option value="UTC-7">UTC-7 (Mountain)</option>
                <option value="UTC-8">UTC-8 (Pacific)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Security Settings
            </CardTitle>
            <CardDescription>
              Configure security policies and authentication
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
              </div>
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={() => handleToggle('twoFactorAuth')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passwordPolicy">Password Policy</Label>
              <select
                id="passwordPolicy"
                value={settings.passwordPolicy}
                onChange={(e) => handleInputChange('passwordPolicy', e.target.value)}
                className="w-full p-2 border border-input rounded-md bg-background"
              >
                <option value="basic">Basic (6+ characters)</option>
                <option value="strong">Strong (8+ chars, mixed case, numbers)</option>
                <option value="enterprise">Enterprise (12+ chars, symbols required)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Configure system notifications and alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Send system emails to admins</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={() => handleToggle('emailNotifications')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>System Alerts</Label>
                <p className="text-sm text-muted-foreground">Real-time system notifications</p>
              </div>
              <Switch
                checked={settings.systemAlerts}
                onCheckedChange={() => handleToggle('systemAlerts')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">Automated weekly analytics reports</p>
              </div>
              <Switch
                checked={settings.weeklyReports}
                onCheckedChange={() => handleToggle('weeklyReports')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Feature Settings */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Feature Settings
            </CardTitle>
            <CardDescription>
              Enable or disable platform features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Gamification System</Label>
                <p className="text-sm text-muted-foreground">Points, badges, and leaderboards</p>
              </div>
              <Switch
                checked={settings.gamificationEnabled}
                onCheckedChange={() => handleToggle('gamificationEnabled')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>QR Code Scanning</Label>
                <p className="text-sm text-muted-foreground">Allow QR-based attendance</p>
              </div>
              <Switch
                checked={settings.qrScanningEnabled}
                onCheckedChange={() => handleToggle('qrScanningEnabled')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Parent Portal</Label>
                <p className="text-sm text-muted-foreground">Enable parent/guardian access</p>
              </div>
              <Switch
                checked={settings.parentPortalEnabled}
                onCheckedChange={() => handleToggle('parentPortalEnabled')}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Management */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Data Management
          </CardTitle>
          <CardDescription>
            Configure data retention, analytics, and export options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dataRetention">Data Retention (days)</Label>
                <Input
                  id="dataRetention"
                  type="number"
                  value={settings.dataRetention}
                  onChange={(e) => handleInputChange('dataRetention', parseInt(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">
                  How long to keep user data and analytics
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Analytics Tracking</Label>
                  <p className="text-sm text-muted-foreground">Collect usage analytics</p>
                </div>
                <Switch
                  checked={settings.analyticsEnabled}
                  onCheckedChange={() => handleToggle('analyticsEnabled')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Data Export</Label>
                  <p className="text-sm text-muted-foreground">Allow data exports</p>
                </div>
                <Switch
                  checked={settings.exportEnabled}
                  onCheckedChange={() => handleToggle('exportEnabled')}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">Database Actions</Label>
                <div className="flex flex-col gap-2 mt-2">
                  <Button variant="outline" className="justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Export All Data
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Upload className="mr-2 h-4 w-4" />
                    Import Data
                  </Button>
                  <Button variant="outline" className="justify-start text-destructive hover:bg-destructive hover:text-destructive-foreground">
                    <Database className="mr-2 h-4 w-4" />
                    Backup Database
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>
            Current system health and performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <Badge className="gradient-success text-white mb-2">Healthy</Badge>
              <p className="text-sm font-medium">Database</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <Badge className="gradient-success text-white mb-2">Online</Badge>
              <p className="text-sm font-medium">API Services</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <Badge className="gradient-success text-white mb-2">Active</Badge>
              <p className="text-sm font-medium">Background Jobs</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <Badge variant="secondary" className="mb-2">12.5GB</Badge>
              <p className="text-sm font-medium">Storage Used</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};