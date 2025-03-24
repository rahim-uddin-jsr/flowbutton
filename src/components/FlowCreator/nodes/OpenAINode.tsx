
import React from 'react';
import { Handle, Position } from '@xyflow/react';

const OpenAINode: React.FC<any> = ({ data }) => {
  return (
    <div className="flow-node-box ai">
      <Handle type="target" position={Position.Top} />
      <div className="p-2">
        <div className="font-medium text-emerald-700">OpenAI</div>
        <div className="mt-3">
          <div className="mb-2 text-sm">Setup opening message</div>
          <div className="mb-2">
            <div className="text-xs mb-1">Select language</div>
            <select className="w-full p-2 border rounded text-sm">
              <option>English (US)</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
          <div className="mb-2">
            <div className="text-xs mb-1">Select voice model</div>
            <select className="w-full p-2 border rounded text-sm">
              <option>Salli</option>
              <option>Matthew</option>
              <option>Joanna</option>
            </select>
          </div>
          <div>
            <div className="text-xs mb-1">Opening message</div>
            <input 
              type="text" 
              className="w-full px-3 py-2 rounded border text-sm"
              defaultValue="Hello my name is AI. How can I help you?"
            />
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default OpenAINode;
