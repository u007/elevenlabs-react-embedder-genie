
import React from 'react';
import ElevenLabsGenerator from '@/components/ElevenLabsGenerator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl mb-4">
              ElevenLabs AI Voice Widget Generator
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Generate and embed ElevenLabs conversational AI widgets in your website
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
            <ElevenLabsGenerator defaultAgentId="lRF6ZNW7TFOdj7Hu7ZPa" />
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
        <p>Powered by ElevenLabs Conversational AI</p>
      </footer>
    </div>
  );
};

export default Index;
