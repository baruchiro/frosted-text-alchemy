
import React, { useState } from "react";
import TextCompareBox from "./TextCompareBox";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const TextCompare: React.FC = () => {
  const [textBoxes, setTextBoxes] = useState([
    { id: 0, content: "" },
    { id: 1, content: "" },
  ]);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      <div className="mt-6 flex justify-center">
        <Button
          onClick={addNewTextBox}
          className="glass hover:bg-white/30 text-white/90 font-medium"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Text Box
        </Button>
      </div>
    </div>
  );
};

export default TextCompare;
