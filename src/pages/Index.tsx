
import React, { useState } from 'react';
import ElevenLabsGenerator from '@/components/ElevenLabsGenerator';
import CustomVoiceWidget from '@/components/CustomVoiceWidget';

const Index = () => {
  const [showDemoWidget, setShowDemoWidget] = useState(false);
  const [widgetTheme, setWidgetTheme] = useState<'light' | 'dark'>('light');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl mb-4">
              AI Voice Widget Generator
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Generate and embed conversational AI widgets in your website
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
            <ElevenLabsGenerator defaultAgentId="lRF6ZNW7TFOdj7Hu7ZPa" />
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Try Our Custom Widget</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Experience our custom voice chat widget with simulated responses. No connection to ElevenLabs needed.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-4">
              <button 
                onClick={() => setShowDemoWidget(!showDemoWidget)}
                className={`px-4 py-2 rounded-md ${showDemoWidget 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-primary hover:bg-primary/90 text-white'}`}
              >
                {showDemoWidget ? 'Hide Demo Widget' : 'Show Demo Widget'}
              </button>
              
              <div className="flex items-center gap-2">
                <span className="text-sm">Theme:</span>
                <select 
                  value={widgetTheme} 
                  onChange={(e) => setWidgetTheme(e.target.value as 'light' | 'dark')}
                  className="rounded-md border px-2 py-1 text-sm"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              The demo widget appears in the bottom right corner of the screen.
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="bg-primary/10 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                  <span className="text-primary font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-medium">Enter Your Agent ID</h3>
                  <p className="text-gray-600 dark:text-gray-400">Enter your ElevenLabs agent ID in the field above</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="bg-primary/10 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                  <span className="text-primary font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-medium">Choose Options</h3>
                  <p className="text-gray-600 dark:text-gray-400">Select theme and other configuration options</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="bg-primary/10 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                  <span className="text-primary font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-medium">Generate and Embed</h3>
                  <p className="text-gray-600 dark:text-gray-400">Generate the widget code and embed it in your website</p>
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
      {showDemoWidget && <CustomVoiceWidget theme={widgetTheme} agentName="Demo Assistant" />}
    </div>
  );
};

export default Index;
