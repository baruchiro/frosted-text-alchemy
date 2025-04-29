
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon, RotateCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DiffDisplayProps {
  diffs: Array<{ type: 'added' | 'removed' | 'unchanged'; value: string }[]>;
  textBoxIds: number[];
}

const DiffDisplay: React.FC<DiffDisplayProps> = ({ diffs, textBoxIds }) => {
  // State for tracking which comparison is active
  const [activeComparisonIndex, setActiveComparisonIndex] = useState(0);
  
  // State for tracking custom comparison selection
  const [isCustomComparison, setIsCustomComparison] = useState(false);
  const [firstTextId, setFirstTextId] = useState<string>("0");
  const [secondTextId, setSecondTextId] = useState<string>("1");
  
  // Reset custom selection when diffs or textBoxIds change
  useEffect(() => {
    setIsCustomComparison(false);
    setActiveComparisonIndex(0);
  }, [textBoxIds.length]);

  // Only show comparison when we have valid diffs and at least 2 text boxes with content
  if (!diffs.length) {
    return (
      <div className="glass-card p-4 text-center text-white/70">
        Enter text in multiple boxes to see the comparison
      </div>
    );
  }

  // Navigation functions for sequential comparisons
  const goToPrevComparison = () => {
    if (activeComparisonIndex > 0) {
      setActiveComparisonIndex(prev => prev - 1);
    } else {
      setActiveComparisonIndex(diffs.length - 1);
    }
    setIsCustomComparison(false);
  };

  const goToNextComparison = () => {
    if (activeComparisonIndex < diffs.length - 1) {
      setActiveComparisonIndex(prev => prev + 1);
    } else {
      setActiveComparisonIndex(0);
    }
    setIsCustomComparison(false);
  };

  // Calculate display text for comparisons
  const getComparisonText = () => {
    if (isCustomComparison) {
      const firstId = parseInt(firstTextId);
      const secondId = parseInt(secondTextId);
      return `Comparing Text #${firstId + 1} with Text #${secondId + 1}`;
    } else {
      // For sequential comparisons
      const firstIndex = activeComparisonIndex;
      const secondIndex = firstIndex + 1;
      return `Comparing Text #${firstIndex + 1} with Text #${secondIndex + 1}`;
    }
  };

  // Handle custom comparison selection
  const handleCompare = () => {
    // Check if we have a valid selection
    const first = parseInt(firstTextId);
    const second = parseInt(secondTextId);
    
    // If first and second are different and valid indices, find the appropriate diff
    if (first !== second && textBoxIds.includes(first) && textBoxIds.includes(second)) {
      setIsCustomComparison(true);
    }
  };

  // Reset to sequential comparison
  const resetToSequential = () => {
    setIsCustomComparison(false);
    setActiveComparisonIndex(0);
  };

  // Get the current diff to display
  const getCurrentDiff = () => {
    if (isCustomComparison) {
      // For custom comparison, we need to find the appropriate diff
      // In this implementation, we look at the base indices from the textBoxIds array
      const baseIndex = 0; // First text is always the base
      const compareIndex = textBoxIds.indexOf(parseInt(secondTextId));
      
      if (compareIndex > 0 && compareIndex - 1 < diffs.length) {
        return diffs[compareIndex - 1];
      }
      return diffs[0]; // Fallback
    }
    
    // For sequential comparison, use the activeComparisonIndex
    return diffs[activeComparisonIndex];
  };

  return (
    <div className="glass-card animate-fade-in">
      <div className="sticky top-0 z-10 bg-white/5 backdrop-blur-lg border-b border-white/10 rounded-t-xl">
        <div className="border-b border-white/10 p-4">
          <h3 className="font-semibold text-lg text-white">Comparison Results</h3>
        </div>
        
        <div className="flex flex-wrap justify-between items-center p-4 border-b border-white/10 gap-3">
          {/* Navigation buttons */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="glass hover:bg-white/20" 
              onClick={goToPrevComparison}
              disabled={isCustomComparison}
            >
              <ChevronLeftIcon className="w-4 h-4 mr-1" /> Previous
            </Button>
            
            <Button 
              variant="outline" 
              className="glass hover:bg-white/20" 
              onClick={goToNextComparison}
              disabled={isCustomComparison}
            >
              Next <ChevronRightIcon className="w-4 h-4 ml-1" />
            </Button>

            {isCustomComparison && (
              <Button 
                variant="outline" 
                className="glass hover:bg-white/20" 
                onClick={resetToSequential}
              >
                <RotateCcwIcon className="w-4 h-4 mr-1" /> Reset
              </Button>
            )}
          </div>
          
          {/* Status text for sequential comparison */}
          {!isCustomComparison && diffs.length > 1 && (
            <span className="text-white/80 text-sm">
              {getComparisonText()}
              <span className="mx-2 text-white/50">·</span>
              {activeComparisonIndex + 1} of {diffs.length}
            </span>
          )}
          
          {/* Custom comparison dropdown selectors */}
          <div className="flex flex-wrap items-center gap-2">
            <Select
              value={firstTextId}
              onValueChange={setFirstTextId}
            >
              <SelectTrigger className="glass w-[100px] text-white/90">
                <SelectValue placeholder="Text #1" />
              </SelectTrigger>
              <SelectContent>
                {textBoxIds.map((id) => (
                  <SelectItem key={`first-${id}`} value={id.toString()}>
                    Text #{id + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <span className="text-white/80">with</span>
            
            <Select
              value={secondTextId}
              onValueChange={setSecondTextId}
            >
              <SelectTrigger className="glass w-[100px] text-white/90">
                <SelectValue placeholder="Text #2" />
              </SelectTrigger>
              <SelectContent>
                {textBoxIds.map((id) => (
                  <SelectItem key={`second-${id}`} value={id.toString()}>
                    Text #{id + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline"
              className="glass hover:bg-white/20"
              onClick={handleCompare}
              disabled={firstTextId === secondTextId}
            >
              Compare
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <ScrollArea className="h-[500px] glass-card p-4">
          <div className="space-y-1 bg-white/5 p-3 rounded-md">
            {getCurrentDiff().map((line, lineIndex) => (
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
        </ScrollArea>
      </div>
    </div>
  );
};

export default DiffDisplay;
