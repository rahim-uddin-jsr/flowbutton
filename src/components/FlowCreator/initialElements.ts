
import { Node, Edge } from '@xyflow/react';

export const initialNodes: Node[] = [
  {
    id: 'onCall-1',
    type: 'onCall',
    position: { x: 100, y: 100 },
    data: { label: 'On Call' }
  },
  {
    id: 'gather-1',
    type: 'gather',
    position: { x: 350, y: 100 },
    data: { label: 'Gather' }
  }
];

export const initialEdges: Edge[] = [
  {
    id: 'e-onCall-1-gather-1',
    source: 'onCall-1',
    target: 'gather-1',
    animated: true,
    style: { stroke: '#10b981', strokeWidth: 2 }
  }
];
