
import React from 'react';
import { Handle, Position } from '@xyflow/react';

const SendSMSNode = ({ data }) => {
  return (
    <div className="flow-node-box sms">
      <Handle type="target" position={Position.Top} />
      <div className="p-2">
        <div className="font-medium text-violet-700">Send SMS</div>
        <div className="mt-3">
          <div className="mb-2 text-sm">Select device</div>
          <select className="w-full p-2 border rounded text-sm">
            <option>Device 1</option>
            <option>Device 2</option>
          </select>
        </div>
        <div className="mt-3">
          <div className="mb-2 text-sm">SMS text</div>
          <textarea className="w-full px-3 py-2 rounded border text-sm" rows={3}></textarea>
          <div className="text-xs text-gray-500 mt-1">Recommended characters are 320</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default SendSMSNode;
