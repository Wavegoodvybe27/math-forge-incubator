
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const [autoSave, setAutoSave] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [decimalPlaces, setDecimalPlaces] = useState("4");
  const { toast } = useToast();

  const handleSaveSettings = () => {
    // In a real app, this would save to user preferences
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully",
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Configure your Math Forge preferences"
        action={
          <Button onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        }
      />
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Application Settings</CardTitle>
            <CardDescription>Customize how Math Forge works for you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoSave">Auto-Save</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically save your work periodically
                  </p>
                </div>
                <Switch
                  id="autoSave"
                  checked={autoSave}
                  onCheckedChange={setAutoSave}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Use dark theme for the interface
                  </p>
                </div>
                <Switch
                  id="darkMode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Calculation Settings</h3>
              
              <div className="space-y-2">
                <Label htmlFor="decimalPlaces">Decimal Places</Label>
                <Input
                  id="decimalPlaces"
                  type="number"
                  value={decimalPlaces}
                  onChange={(e) => setDecimalPlaces(e.target.value)}
                  min="0"
                  max="10"
                  className="w-20"
                />
                <p className="text-sm text-muted-foreground">
                  Number of decimal places to display in calculation results
                </p>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Data Management</h3>
              
              <div className="flex flex-col space-y-2">
                <Button variant="outline">Export All Data</Button>
                <Button variant="outline">Import Data</Button>
                <Button variant="destructive">
                  Clear All Data
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Export or import all your mathematical framework data.
                Clearing data will remove all saved equations, plots, and notes.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>About Math Forge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>Version:</strong> 1.0.0
            </p>
            <p>
              <strong>Created with:</strong> React, Tailwind CSS, KaTeX, Math.js
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Math Forge is a tool for developing, exploring, and documenting mathematical frameworks.
              It combines equation editing, function plotting, notes, and calculation capabilities.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
