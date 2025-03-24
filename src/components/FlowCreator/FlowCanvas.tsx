
import React, { useState, useCallback, useRef } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  ReactFlowInstance,
  ReactFlowProvider
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import NodePanel from './NodePanel';
import { initialNodes, initialEdges } from './initialElements';
import APIRequestNode from './nodes/APIRequestNode';
import ConditionNode from './nodes/ConditionNode';
import GatherNode from './nodes/GatherNode';
import SayNode from './nodes/SayNode';
import CaptureDataNode from './nodes/CaptureDataNode';
import SendSMSNode from './nodes/SendSMSNode';
import HangupCallNode from './nodes/HangupCallNode';
import OpenAINode from './nodes/OpenAINode';

const nodeTypes = {
  apiRequest: APIRequestNode,
  condition: ConditionNode,
  gather: GatherNode,
  say: SayNode,
  captureData: CaptureDataNode,
  sendSMS: SendSMSNode,
  hangupCall: HangupCallNode,
  openAI: OpenAINode
};

const FlowCanvas: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!reactFlowInstance || !reactFlowWrapper.current) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const label = event.dataTransfer.getData('application/nodeLabel');

      if (typeof type === 'undefined' || !type) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: `${type}-${nodes.length + 1}`,
        type,
        position,
        data: { label },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, nodes, setNodes]
  );

  return (
    <div className="flex h-full w-full overflow-hidden">
      <NodePanel />
      <div ref={reactFlowWrapper} className="flex-1 h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-right"
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#f8fafc" gap={16} />
          <Controls className="m-4" />
          <MiniMap className="rounded-lg bg-white border shadow-sm" />
        </ReactFlow>
      </div>
    </div>
  );
};

const FlowCanvasWithProvider: React.FC = () => (
  <ReactFlowProvider>
    <FlowCanvas />
  </ReactFlowProvider>
);

export default FlowCanvasWithProvider;
