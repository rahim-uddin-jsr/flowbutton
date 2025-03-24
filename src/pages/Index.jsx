
import React from 'react';
import FlowCreator from '@/components/FlowCreator';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl w-full text-center mb-16 animate-fade-in">
        <div className="inline-block mb-2 bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">Flow Designer</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          Create Interactive Voice Flows
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Design voice and SMS workflows with our intuitive drag-and-drop interface. 
          Connect AI, messaging, and API integrations seamlessly.
        </p>
        
        <div className="flex justify-center items-center">
          <FlowCreator />
        </div>
      </div>
      
      <div className="w-full max-w-4xl rounded-xl bg-white shadow-xl overflow-hidden animate-slide-in">
        <div className="p-8 text-left">
          <h2 className="text-2xl font-bold mb-4">Create Advanced Flows</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-4 border border-green-100">
              <h3 className="font-medium mb-2">AI Voice Integration</h3>
              <p className="text-sm text-gray-600">Connect OpenAI models to your voice flows for natural conversations.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
              <h3 className="font-medium mb-2">API Connections</h3>
              <p className="text-sm text-gray-600">Integrate with external systems via REST APIs and webhooks.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
              <h3 className="font-medium mb-2">SMS & Voice Channels</h3>
              <p className="text-sm text-gray-600">Build omnichannel experiences across SMS and voice calls.</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Our intuitive flow designer makes it easy to create complex conversation flows without coding. Click the button above to start designing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
