
import React from 'react';
import { Handle, Position } from '@xyflow/react';

const CaptureDataNode = ({ data }) => {
  return (
    <div className="flow-node-box capture">
      <Handle type="target" position={Position.Top} />
      <div className="p-2">
        <div className="font-medium text-cyan-700">Capture Data</div>
        <div className="mt-3">
          <div className="mb-2 text-sm">Capture text</div>
          <textarea className="w-full px-3 py-2 rounded border text-sm" rows={4}></textarea>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CaptureDataNode;
