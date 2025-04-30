
import React from 'react';
import ElevenLabsEmbed from '@/components/ElevenLabsEmbed';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
              ElevenLabs AI Voice Agent Embedder
            </h1>
            <p className="text-xl text-gray-600">
              Easily embed ElevenLabs conversational AI agents into your website
            </p>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Embed Your Agent</h2>
            <ElevenLabsEmbed defaultAgentId="lRF6ZNW7TFOdj7Hu7ZPa" />
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="bg-primary/10 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                  <span className="text-primary font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-medium">Enter Your Agent ID</h3>
                  <p className="text-gray-600">Paste your ElevenLabs agent ID in the field above</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="bg-primary/10 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                  <span className="text-primary font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-medium">Click "Embed Agent"</h3>
                  <p className="text-gray-600">Embed the voice agent with a single click</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="bg-primary/10 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                  <span className="text-primary font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-medium">Start Talking</h3>
                  <p className="text-gray-600">Interact with your AI voice agent anywhere on the page</p>
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
