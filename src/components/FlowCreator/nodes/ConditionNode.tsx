
import React from 'react';
import { Handle, Position } from '@xyflow/react';

const ConditionNode: React.FC<any> = ({ data }) => {
  return (
    <div className="flow-node-box condition">
      <Handle type="target" position={Position.Top} />
      <div className="p-2">
        <div className="font-medium text-amber-700">Condition</div>
        <div className="text-sm mt-3">
          <div className="mb-2">If response equal to:</div>
          <input type="text" className="w-full px-3 py-2 rounded border text-sm" />
        </div>
        <div className="text-sm mt-3">
          <div className="mb-2">If response not equal to:</div>
          <input type="text" className="w-full px-3 py-2 rounded border text-sm" />
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Right} id="b" />
    </div>
  );
};

export default ConditionNode;
