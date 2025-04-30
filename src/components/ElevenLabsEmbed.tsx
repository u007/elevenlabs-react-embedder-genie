
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface ElevenLabsEmbedProps {
  defaultAgentId?: string;
  theme?: 'light' | 'dark';
}

const ElevenLabsEmbed: React.FC<ElevenLabsEmbedProps> = ({ 
  defaultAgentId = "", 
  theme = 'light' 
}) => {
  const [agentId, setAgentId] = useState(defaultAgentId);
  const [isEmbedded, setIsEmbedded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Clean up function to remove script when component unmounts
    return () => {
      const script = document.querySelector('script[src="https://elevenlabs.io/convai-widget/index.js"]');
      if (script) {
        script.remove();
      }
      
      const widget = document.querySelector('elevenlabs-convai');
      if (widget) {
        widget.remove();
      }
    };
  }, []);

  const embedAgent = () => {
    if (!agentId.trim()) {
      toast({
        title: "Agent ID Required",
        description: "Please enter an ElevenLabs agent ID to embed",
        variant: "destructive",
      });
      return;
    }

    // Remove previous instances if they exist
    const existingScript = document.querySelector('script[src="https://elevenlabs.io/convai-widget/index.js"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    const existingWidget = document.querySelector('elevenlabs-convai');
    if (existingWidget) {
      existingWidget.remove();
    }

    // Create new widget element
    const widget = document.createElement('elevenlabs-convai');
    widget.setAttribute('agent-id', agentId);
    widget.setAttribute('theme', theme);
    
    // Create script element
    const script = document.createElement('script');
    script.src = 'https://elevenlabs.io/convai-widget/index.js';
    script.async = true;
    script.type = 'text/javascript';
    
    // Append elements to document
    document.body.appendChild(widget);
    document.body.appendChild(script);
    
    setIsEmbedded(true);
    
    toast({
      title: "ElevenLabs Agent Embedded",
      description: "The voice agent has been successfully embedded on the page.",
    });
  };

  const removeAgent = () => {
    const script = document.querySelector('script[src="https://elevenlabs.io/convai-widget/index.js"]');
    if (script) {
      script.remove();
    }
    
    const widget = document.querySelector('elevenlabs-convai');
    if (widget) {
      widget.remove();
    }
    
    setIsEmbedded(false);
    
    toast({
      title: "ElevenLabs Agent Removed",
      description: "The voice agent has been removed from the page.",
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="agent-id">ElevenLabs Agent ID</Label>
            <Input
              id="agent-id"
              placeholder="Enter your ElevenLabs agent ID"
              value={agentId}
              onChange={(e) => setAgentId(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              onClick={embedAgent} 
              className="flex-1"
              disabled={isEmbedded}
            >
              Embed Agent
            </Button>
            <Button 
              onClick={removeAgent} 
              variant="outline" 
              className="flex-1"
              disabled={!isEmbedded}
            >
              Remove Agent
            </Button>
          </div>
          
          {!isEmbedded && (
            <div className="text-sm text-muted-foreground mt-2">
              Enter your ElevenLabs agent ID and click "Embed Agent" to add a voice agent to this page.
            </div>
          )}
          
          {isEmbedded && (
            <div className="text-sm text-green-600 mt-2">
              ElevenLabs agent successfully embedded! Look for the widget on the page.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ElevenLabsEmbed;
