
import React from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface TextCompareBoxProps {
  id: number;
  value: string;
  onChange: (id: number, value: string) => void;
  onRemove: (id: number) => void;
  canRemove: boolean;
}

const TextCompareBox: React.FC<TextCompareBoxProps> = ({
  id,
  value,
  onChange,
  onRemove,
  canRemove,
}) => {
  return (
    <div className="glass-card p-4 flex flex-col gap-2 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-sm text-white/80">Text #{id + 1}</h3>
        {canRemove && (
          <button
            onClick={() => onRemove(id)}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Remove text box"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/80"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        placeholder="Enter text to compare..."
        className={cn(
          "glass-input h-[200px] resize-y min-h-[100px] text-sm",
          "placeholder:text-white/50 text-white/90"
        )}
      />
    </div>
  );
};

export default TextCompareBox;
