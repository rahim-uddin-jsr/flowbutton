
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FlowCanvas from './FlowCanvas';
import { cn } from '@/lib/utils';

const FlowCreator = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 min-w-[200px]"
      >
        <span className="text-lg font-medium">Create Flow</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={cn(
          "max-w-[95vw] w-[95vw] max-h-[90vh] h-[90vh] p-0 overflow-hidden",
          "rounded-xl border border-gray-100 shadow-2xl",
          "animate-scale-in"
        )}>
          <DialogHeader className="px-6 py-4 border-b flex flex-row items-center justify-between">
            <DialogTitle className="text-xl font-medium">Create Flow</DialogTitle>
            <div className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-500">
              Untitled
            </div>
          </DialogHeader>
          <div className="flex flex-1 h-full overflow-hidden">
            <FlowCanvas />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FlowCreator;
