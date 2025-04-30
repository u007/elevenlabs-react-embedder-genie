
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Mic, MicOff, Check, X } from "lucide-react";

interface ElevenLabsGeneratorProps {
  defaultAgentId?: string;
}

const ElevenLabsGenerator: React.FC<ElevenLabsGeneratorProps> = ({ 
  defaultAgentId = "" 
}) => {
  const [agentId, setAgentId] = useState(defaultAgentId);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [generated, setGenerated] = useState(false);
  const [code, setCode] = useState('');
  const { toast } = useToast();

  const generateWidget = () => {
    if (!agentId.trim()) {
      toast({
        title: "Agent ID Required",
        description: "Please enter an ElevenLabs agent ID",
        variant: "destructive",
      });
      return;
    }

    const widgetCode = `<elevenlabs-convai agent-id="${agentId}" theme="${theme}"></elevenlabs-convai>\n<script src="https://elevenlabs.io/convai-widget/index.js" async type="text/javascript"></script>`;
    
    setCode(widgetCode);
    setGenerated(true);
    
    toast({
      title: "Widget Code Generated",
      description: "You can now copy the code and use it in your application",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied",
      description: "Widget code has been copied to clipboard",
      icon: <Check className="h-4 w-4" />,
    });
  };

  const previewWidget = () => {
    if (!agentId.trim()) {
      toast({
        title: "Agent ID Required",
        description: "Please enter an agent ID to preview",
        variant: "destructive",
      });
      return;
    }

    // Remove any existing widgets first
    const existingWidgets = document.querySelectorAll('elevenlabs-convai');
    existingWidgets.forEach(widget => widget.remove());
    
    const existingScripts = document.querySelectorAll('script[src="https://elevenlabs.io/convai-widget/index.js"]');
    existingScripts.forEach(script => script.remove());

    // Create the new widget
    const widget = document.createElement('elevenlabs-convai');
    widget.setAttribute('agent-id', agentId);
    widget.setAttribute('theme', theme);
    
    const script = document.createElement('script');
    script.src = 'https://elevenlabs.io/convai-widget/index.js';
    script.async = true;
    
    document.body.appendChild(widget);
    document.body.appendChild(script);
    
    toast({
      title: "Widget Preview",
      description: "ElevenLabs widget has been added to the page",
      icon: <Mic className="h-4 w-4" />,
    });
  };

  const removePreview = () => {
    const widgets = document.querySelectorAll('elevenlabs-convai');
    const scripts = document.querySelectorAll('script[src="https://elevenlabs.io/convai-widget/index.js"]');
    
    widgets.forEach(widget => widget.remove());
    scripts.forEach(script => script.remove());
    
    toast({
      title: "Widget Removed",
      description: "ElevenLabs widget has been removed from the page",
      icon: <MicOff className="h-4 w-4" />,
    });
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>ElevenLabs Widget Generator</CardTitle>
        <CardDescription>
          Generate embed code for ElevenLabs conversational voice AI
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="agent-id">Agent ID</Label>
          <Input
            id="agent-id"
            placeholder="Enter your ElevenLabs agent ID"
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            You can find your agent ID in the ElevenLabs dashboard
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="theme">Theme</Label>
          <Select value={theme} onValueChange={(value) => setTheme(value as 'light' | 'dark')}>
            <SelectTrigger id="theme">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={generateWidget}>Generate Widget Code</Button>
          <Button variant="outline" onClick={previewWidget}>Preview Widget</Button>
          <Button variant="outline" onClick={removePreview}>Remove Preview</Button>
        </div>

        {generated && (
          <div className="mt-4 space-y-3">
            <Label htmlFor="code">Generated Embed Code</Label>
            <div className="relative">
              <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded-md text-sm overflow-x-auto">
                {code}
              </pre>
              <Button 
                size="sm"
                variant="secondary"
                className="absolute top-2 right-2"
                onClick={copyToClipboard}
              >
                Copy
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <p>Powered by ElevenLabs Conversational AI</p>
      </CardFooter>
    </Card>
  );
};

export default ElevenLabsGenerator;
