
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Phone } from 'lucide-react';

const OnCallNode: React.FC<any> = ({ data }) => {
  return (
    <div className="flow-node-box call-start">
      <div className="p-3">
        <div className="font-medium text-slate-700 flex items-center mb-2">
          <Phone className="h-4 w-4 mr-2 text-slate-600" />
          <span>On call</span>
        </div>
        
        <div className="mt-3 space-y-2">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 p-1 rounded-full">
              <div className="text-blue-500 text-xs">i</div>
            </div>
            <input 
              type="text" 
              className="ml-2 w-full px-3 py-1.5 rounded border text-sm" 
              defaultValue="{{recipient_number}}"
              placeholder="Recipient Number"
            />
            <div className="flex-shrink-0 ml-2 text-green-500 border border-green-200 rounded p-0.5">
              <div className="w-3 h-3"></div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 p-1 rounded-full">
              <div className="text-blue-500 text-xs">i</div>
            </div>
            <input 
              type="text" 
              className="ml-2 w-full px-3 py-1.5 rounded border text-sm" 
              defaultValue="{{my_number}}"
              placeholder="Your Number"
            />
            <div className="flex-shrink-0 ml-2 text-green-500 border border-green-200 rounded p-0.5">
              <div className="w-3 h-3"></div>
            </div>
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default OnCallNode;
