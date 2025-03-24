
import React from 'react';
import { Handle, Position } from '@xyflow/react';

const APIRequestNode: React.FC<any> = ({ data }) => {
  return (
    <div className="flow-node-box api">
      <Handle type="target" position={Position.Top} />
      <div className="p-2">
        <div className="font-medium text-green-700">Make API Request</div>
        <div className="mt-2">
          <div className="grid grid-cols-4 gap-2 mt-2">
            <div className="col-span-1 bg-green-100 text-green-700 rounded p-1 text-center text-xs">GET</div>
            <div className="col-span-1 bg-white rounded p-1 text-center text-xs">POST</div>
            <div className="col-span-1 bg-white rounded p-1 text-center text-xs">PUT</div>
            <div className="col-span-1 bg-white rounded p-1 text-center text-xs">DELETE</div>
          </div>
          <div className="mt-3">
            <input type="text" placeholder="https://api.some.com" className="w-full px-3 py-2 rounded border text-sm" />
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default APIRequestNode;
