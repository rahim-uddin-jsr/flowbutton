import React, { useState, useCallback, useRef, useEffect } from 'react';
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
  ReactFlowProvider,
  BackgroundVariant
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Loader2 } from 'lucide-react';
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      // Create a new edge with the required properties
      const newEdge = {
        ...params,
        id: `e-${params.source}-${params.target}-${new Date().getTime()}`,
        // Add animated property as default
        animated: true,
        // Add style property as default
        style: { stroke: '#10b981', strokeWidth: 2 }
      };
      
      setEdges((eds) => addEdge(newEdge as Edge, eds));
    },
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

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-50">
        <Loader2 className="h-12 w-12 animate-spin text-emerald-500" />
        <span className="ml-2 text-lg font-medium text-gray-600">Loading Flow Editor...</span>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full overflow-hidden">
      <Collapsible
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
        className="relative"
      >
        <CollapsibleContent className="h-full min-w-[240px] border-r bg-white shadow-sm transition-all">
          <div className="p-4 font-medium text-gray-700 border-b">Node Palette</div>
          <NodePanel />
        </CollapsibleContent>
        <CollapsibleTrigger className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 rounded-full border bg-white p-1.5 shadow-md">
          {isSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </CollapsibleTrigger>
      </Collapsible>
      
      <div ref={reactFlowWrapper} className="flex-1 h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={(instance) => {
            setReactFlowInstance(instance);
            instance.fitView();
          }}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          deleteKeyCode={['Backspace', 'Delete']}
          fitView
          attributionPosition="bottom-right"
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#10b981" gap={16} variant={BackgroundVariant.Dots} />
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
