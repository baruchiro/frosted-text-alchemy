
type DiffResult = {
  type: 'added' | 'removed' | 'unchanged';
  value: string;
};

/**
 * Simple line-by-line diff algorithm
 */
export const compareTexts = (texts: string[]): DiffResult[][] => {
  if (texts.length < 2) {
    return [];
  }

  // Split all texts into lines
  const textLines = texts.map(text => text.split('\n'));
  
  // Compare first text with each other text
  const results: DiffResult[][] = [];
  
  const baseLines = textLines[0];
  
  for (let i = 1; i < textLines.length; i++) {
    // Skip empty text comparisons - only compare when both texts have content
    if (!texts[0].trim() || !texts[i].trim()) {
      continue;
    }
    
    const compareLines = textLines[i];
    const diff: DiffResult[] = [];
    
    // Get max length to iterate through
    const maxLength = Math.max(baseLines.length, compareLines.length);
    
    for (let j = 0; j < maxLength; j++) {
      const baseLine = j < baseLines.length ? baseLines[j] : '';
      const compareLine = j < compareLines.length ? compareLines[j] : '';
      
      if (baseLine === compareLine) {
        diff.push({ type: 'unchanged', value: baseLine });
      } else {
        if (baseLine) {
          diff.push({ type: 'removed', value: baseLine });
        }
        if (compareLine) {
          diff.push({ type: 'added', value: compareLine });
        }
      }
    }
    
    results.push(diff);
  }
  
  return results;
};
