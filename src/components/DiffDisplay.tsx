
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DiffDisplayProps {
  diffs: Array<{ type: 'added' | 'removed' | 'unchanged'; value: string }[]>;
  textBoxIds: number[];
}

const DiffDisplay: React.FC<DiffDisplayProps> = ({ diffs, textBoxIds }) => {
  const [activeComparisonIndex, setActiveComparisonIndex] = useState(0);

  // Only show comparison when we have valid diffs and at least 2 text boxes with content
  if (!diffs.length) {
    return (
      <div className="glass-card p-4 text-center text-white/70">
        Enter text in multiple boxes to see the comparison
      </div>
    );
  }

  // Navigation functions
  const goToPrevComparison = () => {
    setActiveComparisonIndex(prev => (prev > 0 ? prev - 1 : diffs.length - 1));
  };

  const goToNextComparison = () => {
    setActiveComparisonIndex(prev => (prev < diffs.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="glass-card animate-fade-in">
      <div className="border-b border-white/10 p-4">
        <h3 className="font-semibold text-lg text-white">Comparison Results</h3>
      </div>
      
      {diffs.length > 1 && (
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <Button 
            variant="outline" 
            className="glass hover:bg-white/20" 
            onClick={goToPrevComparison}
          >
            <ChevronLeftIcon className="w-4 h-4 mr-1" /> Previous
          </Button>
          
          <span className="text-white/80 text-sm">
            Comparing Text #1 with Text #{textBoxIds[activeComparisonIndex + 1] + 1}
            <span className="mx-2 text-white/50">·</span>
            {activeComparisonIndex + 1} of {diffs.length}
          </span>
          
          <Button 
            variant="outline" 
            className="glass hover:bg-white/20" 
            onClick={goToNextComparison}
          >
            Next <ChevronRightIcon className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
      
      <div className="p-4">
        <div className="glass-card p-4">
          <div className="space-y-1 bg-white/5 p-3 rounded-md">
            {diffs[activeComparisonIndex].map((line, lineIndex) => (
              <div 
                key={lineIndex}
                className={cn(
                  "px-2 py-1 rounded text-sm font-mono whitespace-pre-wrap",
                  line.type === 'added' ? "bg-green-500/20 text-green-200 border-l-2 border-green-400" : 
                  line.type === 'removed' ? "bg-red-500/20 text-red-200 border-l-2 border-red-400" :
                  "text-white/80"
                )}
              >
                {line.type === 'added' && <span className="mr-2 text-green-400">+</span>}
                {line.type === 'removed' && <span className="mr-2 text-red-400">-</span>}
                {line.value || ' '}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiffDisplay;
