
import React from 'react';
import { Handle, Position } from '@xyflow/react';

const HangupCallNode: React.FC<any> = ({ data }) => {
  return (
    <div className="flow-node-box call">
      <Handle type="target" position={Position.Top} />
      <div className="p-2">
        <div className="font-medium text-rose-700">Hangup Call</div>
      </div>
    </div>
  );
};

export default HangupCallNode;
