
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
  BackgroundVariant,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Loader2, X, Link as LinkIcon } from 'lucide-react';
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
import OnCallNode from './nodes/OnCallNode';
import SaveFlow from './SaveFlow';
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
  openAI: OpenAINode,
  onCall: OnCallNode
};

const FlowCanvas: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      // Create a new edge with the required properties
      const newEdge = {
        ...params,
        id: `e-${params.source}-${params.target}-${new Date().getTime()}`,
        animated: true,
        style: { stroke: '#10b981', strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#10b981'
        }
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

  const onEdgeDoubleClick = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    },
    [setEdges]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

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
          onNodeClick={onNodeClick}
          onEdgeDoubleClick={onEdgeDoubleClick}
          onPaneClick={onPaneClick}
          snapToGrid={true}
          snapGrid={[15, 15]}
          fitView
          attributionPosition="bottom-right"
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#10b981" gap={16} variant={BackgroundVariant.Dots} />
          <Controls className="m-4" />
          <MiniMap className="rounded-lg bg-white border shadow-sm" />
          
          {/* Add SaveFlow button */}
          <div className="absolute top-2 left-2 z-10">
            <SaveFlow />
          </div>
          
          {selectedNode && (
            <div className="absolute top-2 right-2 bg-white p-2 rounded-lg shadow-md z-10 border">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-sm">{selectedNode.type} Properties</span>
                <button 
                  onClick={() => setSelectedNode(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="text-xs text-gray-500">
                ID: {selectedNode.id}
              </div>
              <div className="mt-2 text-xs text-blue-600 flex items-center cursor-pointer">
                <LinkIcon className="h-3 w-3 mr-1" />
                <span>Connect to another flow</span>
              </div>
            </div>
          )}
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
