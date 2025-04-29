
import React, { useState, useEffect } from "react";
import TextCompareBox from "./TextCompareBox";
import DiffDisplay from "./DiffDisplay";
import { compareTexts } from "@/utils/textCompare";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const TextCompare: React.FC = () => {
  const [textBoxes, setTextBoxes] = useState([
    { id: 0, content: "" },
    { id: 1, content: "" },
  ]);
  
  const [diffs, setDiffs] = useState<Array<{ type: 'added' | 'removed' | 'unchanged'; value: string }[]>>([]);

  useEffect(() => {
    // Calculate diffs when we have at least 2 text boxes
    if (textBoxes.length >= 2) {
      const allTexts = textBoxes.map(box => box.content);
      const results = compareTexts(allTexts);
      setDiffs(results);
    } else {
      setDiffs([]);
    }
  }, [textBoxes]);

  const handleTextChange = (id: number, newContent: string) => {
    setTextBoxes((prev) =>
      prev.map((box) => (box.id === id ? { ...box, content: newContent } : box))
    );
  };

  const addNewTextBox = () => {
    const newId = Math.max(...textBoxes.map((box) => box.id), 0) + 1;
    setTextBoxes([...textBoxes, { id: newId, content: "" }]);
  };

  const removeTextBox = (id: number) => {
    setTextBoxes((prev) => prev.filter((box) => box.id !== id));
  };

  // Get non-empty text box IDs for comparison display
  const nonEmptyTextBoxIds = textBoxes
    .filter(box => box.content.trim() !== "")
    .map(box => box.id);

  // Check if we have at least one valid comparison
  const hasValidComparison = diffs.length > 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 text-white drop-shadow-md">
          Text Compare
        </h1>
        <p className="text-white/70">
          Compare multiple texts side by side. Add more text boxes as needed.
        </p>
      </div>

      {/* Text input boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {textBoxes.map((box) => (
          <TextCompareBox
            key={box.id}
            id={box.id}
            value={box.content}
            onChange={handleTextChange}
            onRemove={removeTextBox}
            canRemove={textBoxes.length > 2}
          />
        ))}
      </div>

      <div className="mb-8 flex justify-center">
        <Button
          onClick={addNewTextBox}
          className="glass hover:bg-white/30 text-white/90 font-medium"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Text Box
        </Button>
      </div>
      
      {/* Only show diff display if we have at least one comparison with content */}
      {hasValidComparison && (
        <div className="mb-8">
          <DiffDisplay 
            diffs={diffs} 
            textBoxIds={textBoxes.map(box => box.id)} 
          />
        </div>
      )}
    </div>
  );
};

export default TextCompare;
