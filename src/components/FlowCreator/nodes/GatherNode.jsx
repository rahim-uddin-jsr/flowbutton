
import React from 'react';
import { Handle, Position } from '@xyflow/react';

const GatherNode = ({ data }) => {
  return (
    <div className="flow-node-box gather">
      <Handle type="target" position={Position.Top} />
      <div className="p-2">
        <div className="font-medium text-blue-700">Gather</div>
        <div className="mt-3">
          <div className="mb-2 text-sm">Select language</div>
          <select className="w-full p-2 border rounded text-sm">
            <option>English (US)</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
        <div className="mt-3">
          <div className="mb-2 text-sm">Enter number key</div>
          <input type="text" className="w-full px-3 py-2 rounded border text-sm" />
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default GatherNode;
