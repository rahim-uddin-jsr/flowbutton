
import React from 'react';
import { useReactFlow } from '@xyflow/react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SaveFlow = () => {
  const { getNodes, getEdges } = useReactFlow();
  const { toast } = useToast();

  const saveFlow = async () => {
    const nodes = getNodes();
    const edges = getEdges();
    
    const flowData = {
      nodes,
      edges,
      name: 'Untitled Flow',
      createdAt: new Date().toISOString(),
    };
    
    try {
      // Make API call to save the flow
      const response = await fetch('/api/flows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flowData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save flow');
      }
      
      const data = await response.json();
      
      toast({
        title: "Flow saved successfully",
        description: `Flow ID: ${data.id}`,
      });
      
    } catch (error) {
      console.error('Error saving flow:', error);
      
      toast({
        variant: "destructive",
        title: "Failed to save flow",
        description: "There was an error saving your flow. Please try again.",
      });
    }
  };
  
  return (
    <Button 
      onClick={saveFlow}
      variant="outline"
      className="flex items-center gap-2 bg-white"
      size="sm"
    >
      <Save className="h-4 w-4" />
      <span>Save Flow</span>
    </Button>
  );
};

export default SaveFlow;
