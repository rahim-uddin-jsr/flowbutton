
import React from 'react';
import { Handle, Position } from '@xyflow/react';

const SayNode: React.FC<any> = ({ data }) => {
  return (
    <div className="flow-node-box say">
      <Handle type="target" position={Position.Top} />
      <div className="p-2">
        <div className="font-medium text-purple-700">Say</div>
        <div className="mt-3">
          <div className="mb-2 text-sm">Select language</div>
          <select className="w-full p-2 border rounded text-sm">
            <option>English (US)</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
        <div className="mt-3">
          <div className="mb-2 text-sm">Say</div>
          <textarea 
            className="w-full px-3 py-2 rounded border text-sm" 
            rows={3}
            defaultValue="Welcome to the call press 1 for the menu..."
          ></textarea>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default SayNode;
