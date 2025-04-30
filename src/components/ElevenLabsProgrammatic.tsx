
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ElevenLabsProgrammaticProps {
  agentId: string;
  theme?: 'light' | 'dark';
}

const ElevenLabsProgrammatic: React.FC<ElevenLabsProgrammaticProps> = ({
  agentId,
  theme = 'light'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    if (!agentId || !containerRef.current) return;
    
    // Create and append the widget
    const widget = document.createElement('elevenlabs-convai');
    widget.setAttribute('agent-id', agentId);
    widget.setAttribute('theme', theme);
    containerRef.current.appendChild(widget);
    
    // Create and append the script
    const script = document.createElement('script');
    script.src = 'https://elevenlabs.io/convai-widget/index.js';
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);
    
    return () => {
      // Clean up on unmount
      if (containerRef.current) {
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
      }
      
      const scripts = document.querySelectorAll('script[src="https://elevenlabs.io/convai-widget/index.js"]');
      scripts.forEach(s => s.remove());
    };
  }, [agentId, theme]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>ElevenLabs Voice Agent</CardTitle>
        <CardDescription>
          Voice-enabled AI assistant powered by ElevenLabs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="elevenlabs-container"></div>
        {!isLoaded && <p className="text-center text-sm text-muted-foreground">Loading voice agent...</p>}
      </CardContent>
    </Card>
  );
};

export default ElevenLabsProgrammatic;
