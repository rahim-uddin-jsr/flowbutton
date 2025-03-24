
import React from 'react';

interface NodeTypeItem {
  type: string;
  label: string;
  className: string;
}

const nodeTypes: NodeTypeItem[] = [
  { type: 'onCall', label: 'On Call', className: 'call-start' },
  { type: 'gather', label: 'Gather', className: 'gather' },
  { type: 'say', label: 'Say', className: 'say' },
  { type: 'condition', label: 'Condition', className: 'condition' },
  { type: 'apiRequest', label: 'Make API Request', className: 'api' },
  { type: 'hangupCall', label: 'Hangup Call', className: 'call' },
  { type: 'captureData', label: 'Capture Data', className: 'capture' },
  { type: 'sendSMS', label: 'Send SMS', className: 'sms' },
  { type: 'openAI', label: 'OpenAI', className: 'ai' }
];

const NodePanel: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string, label: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/nodeLabel', label);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-72 h-full bg-white overflow-auto p-4">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Flow Nodes</h3>
        <p className="text-sm text-gray-500">Drag and drop nodes to create your flow</p>
      </div>
      
      <div className="space-y-2">
        {nodeTypes.map((item) => (
          <div
            key={item.type}
            className={`node-panel-item ${item.className}`}
            onDragStart={(event) => onDragStart(event, item.type, item.label)}
            draggable
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-${item.className === 'call-start' ? 'slate' : item.className}-100`}>
              <div className={`w-4 h-4 bg-${item.className === 'call-start' ? 'slate' : item.className}-500 rounded-sm`}></div>
            </div>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-4 border-t">
        <p className="text-xs text-gray-400">
          Drag nodes onto the canvas to build your flow. Connect nodes by dragging from one handle to another.
          Double-click on an edge to delete it.
        </p>
      </div>
    </div>
  );
};

export default NodePanel;
