
import React from 'react';
import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription, CardHeader } from "@/components/ui/card";
import { X } from "lucide-react";

interface WidgetHeaderProps {
  agentName: string;
  theme?: 'light' | 'dark';
  onClose: () => void;
}

const WidgetHeader: React.FC<WidgetHeaderProps> = ({ agentName, theme = 'light', onClose }) => {
  return (
    <CardHeader className="p-4 border-b">
      <div className="flex justify-between items-center">
        <CardTitle className="text-lg">{agentName}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <CardDescription className={theme === 'dark' ? 'text-gray-300' : ''}>
        Voice and text assistant
      </CardDescription>
    </CardHeader>
  );
};

export default WidgetHeader;
