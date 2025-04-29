
import React from "react";
import { cn } from "@/lib/utils";

interface DiffDisplayProps {
  diffs: Array<{ type: 'added' | 'removed' | 'unchanged'; value: string }[]>;
  textBoxIds: number[];
}

const DiffDisplay: React.FC<DiffDisplayProps> = ({ diffs, textBoxIds }) => {
  if (!diffs.length) {
    return (
      <div className="glass-card p-4 text-center text-white/70">
        Enter text in multiple boxes to see the comparison
      </div>
    );
  }

  return (
    <div className="glass-card animate-fade-in">
      <div className="border-b border-white/10 p-4">
        <h3 className="font-semibold text-lg text-white">Comparison Results</h3>
      </div>
      
      <div className="p-4 space-y-6">
        {diffs.map((diff, diffIndex) => (
          <div key={diffIndex} className="glass-card p-4">
            <h4 className="font-medium text-sm text-white/80 mb-3">
              Comparing Text #1 with Text #{textBoxIds[diffIndex + 1] + 1}
            </h4>
            
            <div className="space-y-1 bg-white/5 p-3 rounded-md">
              {diff.map((line, lineIndex) => (
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
        ))}
      </div>
    </div>
  );
};

export default DiffDisplay;
