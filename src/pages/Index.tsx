
import React, { useState } from 'react';
import CustomVoiceWidget from '@/components/CustomVoiceWidget';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [showDemoWidget, setShowDemoWidget] = useState(false);
  const [widgetTheme, setWidgetTheme] = useState<'light' | 'dark'>('light');
  const [agentName, setAgentName] = useState('AI Assistant');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const embedCode = `
<!-- Custom Voice Widget -->
<div id="custom-voice-widget" data-theme="${widgetTheme}" data-agent-name="${agentName}"></div>
<script>
  (function() {
    // Create script element to load the widget
    const script = document.createElement('script');
    script.src = 'https://your-domain.com/widget.js';
    script.async = true;
    document.body.appendChild(script);
  })();
</script>
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Widget embed code copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl mb-4">
              Custom Voice Widget Generator
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Generate and embed conversational AI widgets in your website
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
            <CardHeader>
              <CardTitle>Generate Widget Embed Code</CardTitle>
              <CardDescription>
                Customize your widget and generate the embed code
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="agent-name">Agent Name</Label>
                <Input
                  id="agent-name"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  placeholder="Enter name for your AI assistant"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="theme">Widget Theme</Label>
                <div className="flex items-center space-x-2">
                  <select
                    id="theme"
                    value={widgetTheme}
                    onChange={(e) => setWidgetTheme(e.target.value as 'light' | 'dark')}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <Label htmlFor="embed-code">Widget Embed Code</Label>
                <div className="mt-1 relative">
                  <div className="bg-gray-100 dark:bg-gray-900 rounded-md p-4 font-mono text-sm overflow-auto max-h-60">
                    {embedCode}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={handleCopy}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="mt-4">
                <Button onClick={() => setShowDemoWidget(!showDemoWidget)}>
                  {showDemoWidget ? 'Hide Preview' : 'Show Preview'}
                </Button>
              </div>
            </CardContent>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="bg-primary/10 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                  <span className="text-primary font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-medium">Customize Widget</h3>
                  <p className="text-gray-600 dark:text-gray-400">Set your agent name and choose a theme that matches your site</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="bg-primary/10 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                  <span className="text-primary font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-medium">Generate Code</h3>
                  <p className="text-gray-600 dark:text-gray-400">Get your custom embed code with your preferred settings</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="bg-primary/10 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                  <span className="text-primary font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-medium">Add to Your Site</h3>
                  <p className="text-gray-600 dark:text-gray-400">Copy the code and paste it into your website's HTML</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-primary/10 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                  <span className="text-primary font-semibold">4</span>
                </div>
                <div>
                  <h3 className="font-medium">Preview Live</h3>
                  <p className="text-gray-600 dark:text-gray-400">Test your widget configuration directly on this page</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="py-6 text-center text-gray-500">
        <p>Custom Voice Widget © {new Date().getFullYear()}</p>
      </footer>
      
      {/* Demo Widget */}
      {showDemoWidget && <CustomVoiceWidget theme={widgetTheme} agentName={agentName} />}
    </div>
  );
};

export default Index;
